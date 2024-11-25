import axios from "axios";
import Footer from "components/footer";
import Input from "components/form/input";
import SubmitButton from "components/form/submitButton";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

const LoginPage = () => {
  //로그인 하면 로그인된 상태 관리하기 위해 미리 만들어둔 authContext에서 useAuth 가져옴
  const { login } = useAuth();

  const [isEmail, setIsEmail] = useState<string>("");
  const [isPassword, setIsPassword] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const input = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.name === "email" //이벤트가 일어난 타겟의 이름이 이메일?
      ? setIsEmail(e.target.value) //맞으면 isemail 업데이트
      : setIsPassword(e.target.value);//아니면 pw 업데이트

  useEffect(() => {
    //emailvalid 만들어둔 함수에 업데이트된 이메일 넣어줌
    //그럼 isemailvalid에서 테스트해서 통과되고 그게 이메일 형식이면 emailvalid 상태 true로 업데이트
    const emailValid = isEmailValid(isEmail);
    console.log("email vaild 상태:",emailValid);
    console.log("email: ",isEmail);

    //pw은 길이 검사할건데 길이가 6보다 크거나 같기만 하면 댐
    const passwordValid = isPassword.trim().length >= 6;
    console.log("password valid 상태:",passwordValid);
    console.log("password",isPassword);
    //그리고 나서 두 validation 모두 통과하면 isactive를 true로 업데이트 해줌
    //이거는 제출버튼 활성화에 쓸거임
    (emailValid && passwordValid)?setIsActive(true):setIsActive(false);
    console.log("이건 뭔데?",isActive);
  },
  //email하고 pw에 변화가 일어났을때만 실행 
  [isEmail, isPassword]);

  //제출 함수 -> 버튼이 마우스클릭 되었을때 서버로 데이터 보내기
  const onSubmit = async (e: React.MouseEvent) => {
    //이전 이벤트 지우기
    e.preventDefault();

    const sendForm={
      email:isEmail,
      password:isPassword
    }
    
    console.log(sendForm);

    try {
      //요청을 보내 -> 이거 지금은 포트 5000임
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        //내가 서버에다 보내줄 데이터 구조는 email하고 password 인데 얘넨 string type임
        email: isEmail, 
        password: isPassword,
      });
      console.log(res); // 응답 확인
      if (res.status === 200) {//요청이 성공해
        //그러면 유저토큰은 요청해서 받은 token을 넣어줄거임
        const userToken = res.data.token;
        console.log("userToken 서버에서 받아온",userToken);
        //그리고 나서 AuthContext에서 login(토큰) 함수를 가져와서 넣어주면 토큰이 유지되는동안은 로그인 상태로 판별하는거임
        login(userToken);
        //그리고 나서 로그인 성공한 다음에는 email하고 pw 초기화 해줌
        setIsEmail("");
        setIsPassword("");
        console.log("email상태 초기화: ",isEmail);
        console.log("email상태 초기화: ",isPassword);
        //제출이 성공적으로 끝나면 onepage로 보내줌
        window.location.href = "/one";
      }
    } catch (error) {//요청 실패하면
      if (axios.isAxiosError(error)) {
        console.error("Error response: ", error.response?.data || "알려지지 않은 에러");
        setErrorMessage(error.response?.data?.message || "로그인에 실패했습니다.");
      } else {
        console.error("예상치 못한 오류 발생: ", error);
        setErrorMessage("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex w-full h-screen bg-introBG items-center justify-center">
      <div className="w-1/4 h-2/6 shadow-lg border rounded-2xl relative font-sejong text-white">
        <span className="absolute -top-6 left-48 font-normal text-3xl">Login</span>
        <div className="absolute top-16 left-1/4 flex flex-col gap-8">
          <label htmlFor="email" className="-mb-6 font-bold text-md">
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            value={isEmail}
            placeholder="Enter your email"
            onChange={input}
          />
          <label htmlFor="password" className="-mb-6 font-bold text-md">
            Password
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            value={isPassword}
            placeholder="Enter your password"
            onChange={input}
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2 text-center">{errorMessage}</div>
        )}
        <div className="absolute -bottom-5 left-20 w-2/3">
          <SubmitButton onClick={onSubmit} disabled={!isActive} text="Login" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
