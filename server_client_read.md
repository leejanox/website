/*프로젝트 생성 (react로 프론트엔드 개발, node.js를 백엔드용 서버로 사용해 mySQL과 연동*/

[1]프로젝트 구조 설정
-> 프로젝트 디렉토리 만들고 그 안에서 작업 진행

[2]프로젝트 초기화 및 패키지 설치
    1.Node.js 프로젝트 초기화 : "yarn init -y"
    2.백엔드용 패키지 설치 : 
        "yarn add express mysql2 cors" // express: 서버 프레임워크, mysql2: MySQL과 연동을 위한 패키지, cors: CORS 설정을 위한 미들웨어
        "yarn add -D typescript @types/node @types/express @types/cors ts-node-dev" //typescript 사용을 위한 타입 정의 + 타입스크립트 실시간 컴파일 및 실행(ts-node-dev)
    3.react로 client 생성 : 
        "yarn create react-app client --template typescript"
        "npm install react-router"
        "npm install react-router-dom"
    4.프로젝트 파일 디렉토리에 server 디렉토리 생성 :
        "client와 마찬가지로 src폴더 생성 후 sever.tsx 생성"
    5.타입 스크립트 설정을 위해 tsconfig.json 생성 :
        (1)공용 설정을 위해 프로젝트 루트 디렉토리에 tsconfig.base.json 생성
        {
            "compilerOptions": {
                "target": "es6",
                "lib": ["esnext", "dom"],
                "skipLibCheck": true,
                "strict": true,
                "forceConsistentCasingInFileNames": true,
                "moduleResolution": "node",
                "resolveJsonModule": true
            }
        }

        (2)server 폴더에 백엔드용 tsconfig.json 생성
        {
            "extends": "../tsconfig.base.json",
            "compilerOptions": {
            "module": "commonjs",
            "target": "es6",             // 백엔드에서는 es6 이상의 target을 주로 사용
            "outDir": "../dist",         // 컴파일된 파일이 저장될 폴더
            "strict": true,              // 엄격한 타입 검사 활성화
            "rootDir": "src",            // 프로젝트의 루트 디렉토리 (src로 설정) ->컴파일된 파일들은 outdir (dist폴더)로 출력
            "typeRoots": ["./node_modules/@types"], // 모듈의 타입 정의 위치 설정
            "skipLibCheck": true,        // 라이브러리 체크 건너뜀으로써 컴파일 속도 개선
            "esModuleInterop": true,     // CommonJS와 ES 모듈 간의 호환성 설정
            "resolveJsonModule": true    // JSON 파일 import 가능
            },
            "include": ["src/**/*"],
            "exclude": ["node_modules", "**/*.test.ts"] // node_modules 및 테스트 파일 제외
        }
        
        클라이언트: 브라우저 호환성을 고려해 "es5"로 설정
        서버: Node.js의 최신 기능 사용을 위해 "es6" 이상으로 설정
        => 프론트엔드와 백엔드가 문제 없이 독립적으로 컴파일및 실행 된다

        (3)client 폴더에 프론트엔드용 tsconfig.json 생성
        {
            "compilerOptions": {
            "target": "es5",
            "lib": [
                "dom",
                "dom.iterable",
                "esnext"
            ],
            "allowJs": true,
            "skipLibCheck": true,
            "esModuleInterop": true,
            "allowSyntheticDefaultImports": true,
            "strict": true,
            "forceConsistentCasingInFileNames": true,
            "noFallthroughCasesInSwitch": true,
            "module": "esnext",
            "moduleResolution": "node",
            "resolveJsonModule": true,
            "isolatedModules": true,
            "noEmit": true,
            "jsx": "react-jsx",
        
            "baseUrl": "src",
            "paths":{
                "Components/*" : ["Components/*"],
                "Pages/*" : ["Pages/*"],
                "Images/*" : ["Images/*"]
            }
            },
            "include": [
            "src"
            ]
        }
  


    6.Express 서버 설정 (server.tsx) : 
        (1)Express 서버와 MySQL 연동 코드 작성
            import express, { Request, Response } from 'express';
            import mysql from 'mysql2';
            import cors from 'cors';

            const app = express();
            const PORT = 3001;

            // Middleware 설정
            app.use(cors());
            app.use(express.json());

            // MySQL 데이터베이스 연결 설정
            const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'KEPCO',
            });

            // MySQL 연결 확인
            db.connect((err) => {
            if (err) {
                console.error('MySQL 연결 실패:', err);
                return;
            }
            console.log('MySQL에 연결되었습니다.');
            });

            // API 라우트 설정 (예: 사용자 데이터 조회)
            app.get('/api/users', (req: Request, res: Response) => {
            const query = 'SELECT * FROM users';
            db.query(query, (err, results) => {
                if (err) {
                console.error('데이터 조회 실패:', err);
                res.status(500).send(err);
                } else {
                res.json(results);
                }
            });
            });

            // 서버 실행
            app.listen(PORT, () => {
            console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
            });

        (2)package.json에 서버 파일 실행을 위한 스크립트 추가
        
            "scripts": {
            "start": "node dist/server.js",
            "dev": "ts-node-dev src/server.ts"
            }

    7.client API 연동 설정 (React):
        import React, { useEffect, useState } from 'react';

        interface User {
        id: number;
        name: string;
        }

        function App() {
        const [users, setUsers] = useState<User[]>([]);

        useEffect(() => {
            fetch('http://localhost:3001/api/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('데이터 가져오기 실패:', error));
        }, []);

        return (
            <div>
            <h1>사용자 목록</h1>
            <ul>
                {users.map((user) => (
                <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            </div>
        );
        }

        export default App;


    8.서버및 클라이언트 실행 후 작동 확인
      루트 디렉토리에서 "yarn dev" //개발 모드로 서버 실행
      클라이언트 디렉토리에서 http://localhost:3000에서 실행 -> "yarn start"
      http://localhost:3001/api/users로 API를 테스트하여 MySQL 데이터가 정상적으로 반환되는지 확인


/*서버*/

"start": "node dist/server.js" : 서버를 배포 모드로 실행
->  배포 모드에서는 타입 스크립트 파일을 dist 폴더로 컴파일 하고 난 뒤에 실행 해야 하기 때문에, 배포 전에 "yarn tsc" 명령어로 컴파일 후 "yarn start" 해야함

"dev": "ts-node-dev src/server.ts : 서버를 개발 모드로 실행 
->"yarn dev"