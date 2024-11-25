const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');  // mysql2 모듈 import
const fs = require('fs'); // 파일 시스템 모듈
const { spawn } = require('child_process');
const app = express();
const port = 5000;
const path = require('path');
const jwt = require('jsonwebtoken');  // token 용
//const bcrypt =require('bcrypt');//비밀번호 해시
//require('dotenv').config();//환경변수 로드 

// CORS 허용
app.use(cors());

// JSON 바디 파싱
app.use(express.json());
// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  connectionLimit:10, //pool 설정
  host: 'localhost',     // MySQL 서버 주소
  user: 'root',          // MySQL 사용자
  password: '1234',          // MySQL 사용자 비밀번호
  database: 'electricity',    // 연결할 데이터베이스 이름 (생성이 되어 있다면 주석해제)
  charset: 'utf8mb4',  // 인코딩 설정
  acquireTimeout:30000, // 연결 가져오기 최대 시간(ms)
  connectTimeout:10000, //연결 시도 시간 (ms)
  timeout:60000, //요청 시간 초과(ms)
});

// MySQL 연결
db.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

  
//jws Token
const JWT_SECRET = 'your_secret_key';

// 로그인 API : 고은 -> 가입 할 때 비밀번호 해시해서 저장했으면 로그인할때도 검증로직 달라져야 함..
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: '이메일과 비밀번호를 입력하세요.' });
    }
  
    // 데이터베이스에서 사용자 정보 가져오기
    db.query('SELECT * FROM user WHERE email = ? AND password = ?',[email,password], async (err, results) =>{
        if (err) {
          console.error('데이터베이스 사용자 조회 중 오류 발생:', err);
          return res.status(500).json({ message: '데이터 베이스 조회 오류가 발생했습니다.' });
        }
  
        if (results.length === 0) {
          // 사용자 또는 비밀번호가 잘못된 경우
          return res.status(401).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.'});
        }
  
        // 사용자 인증 성공
        const user = results[0];
        
        //비밀번호 검증
        //const isPasswordValid = await bcrypt.compare(password,user.password);
        //if(!isPasswordValid){
        //  return res.status(401).send("비밀번호 검증 실패");
        //}

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
          expiresIn: '1h', // 토큰 유효 시간 (1시간)
        });
  
        res.status(200).json({
          message: '로그인 성공',
          token, // 토큰 반환
        });
      }
    );
  });

  //회원가입
  /*
  계속 회원가입 실패했던 이유
    code: 'ER_DATA_TOO_LONG',
  errno: 1406,
  sqlState: '22001',
  sqlMessage: "Data too long for column 'password' at row 1",
  sql: "INSERT INTO user (username, birth, email, password, phone) VALUES('김고은','19990203','test2@naver.com','$2b$10$tO08X4HuFNZ7HVhdXh8yN.yLtzKyWx4xjIyeAv3pKLs49aYipEmt.','01090870084')"
}
  비밀번호 해시 하면서 해시한 비밀번호가 너무 길어졌는데 ㅋㅋ 비밀번호 컬럼이 varchar(20) 이였음 ㅋㅋ; 
  */
  app.post('/api/signup',(req,res)=>{

    const {username,birth,email,password,phone}=req.body;

    try{
    //비밀번호 해싱
    const hashedPassword = bcrypt.hashSync(password,10);
    //birth값 변환
    const formattedBirth = `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`;

    //데이터 삽입
    const query='INSERT INTO user (username, birth, email, password, phone) VALUES(?,?,?,?,?)';
    //db.qurey() -> 쿼리 실행
    db.query(query,[username,formattedBirth,email,hashedPassword,phone],(err,result)=>{
      if(err){
        console.error("사용자 데이터 집어넣기 실패: ",err.code, err.message);
        return res.status(500).send("Failed to insert user");
      }
      //데이터 입력 성공
      res.status(200).json({
        message:"data onsert success",
        id: result.insertId,   // 새로 생성된 ID 반환
        username,
        birth:formattedBirth,
        email,
        phone
      });
    });
  }catch(err){
    console.error("g회원가입 처리 중 오류: ",err);
    res.status(500).send("internal server error");
  }
  });


  //파일 다운로드

  app.get('/api/downloadfile', (req, res) => {
    const ids = req.query.id ? req.query.id.split('&').map(id => id.split('=')[1]) : []; // id 쿼리 파라미터가 여러 개일 때 처리
  
    if (ids.length === 0) {
      return res.status(400).send('ID is required');
    }
  
    // SQL 쿼리에서 IN 조건을 사용하여 여러 id를 처리
    const query = `SELECT id, filename, file_path, mime_type FROM electricity.files WHERE id IN (${ids.map(id => `'${id}'`).join(', ')})`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching file data:', err);
        res.status(500).send('Database query failed');
        return;
      }
  
      if (results.length === 0) {
        return res.status(404).send('File not found');
      }
  
      // 데이터베이스 결과에서 필요한 값 추출
      const files = results.map(file => ({
        id: file.id,
        fn: file.filename, // filename
        fp: file.file_path, // filepath
        ft: file.mime_type  // mime_type
      }));
  
      // 클라이언트에 파일 데이터 반환
      res.json(files); // 여러 파일을 배열 형태로 반환
    });
  });

// 서버 실행
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // const result2 = runPython([2020 ,1  ,1  ,1 ,12.0 ,23.9 ,14.1 ,0.9]);
    // FirstOrder();
  });