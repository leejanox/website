import SubmitButton from "components/form/submitButton";
import Input from "components/form/input";
import { useEffect,useState } from "react";
import Modal from "components/form/modal";
import axios from "axios";
import Footer from "components/footer";

const SignUpPage = () => {
  const [form, setForm] = useState({
    username: "",
    birth: "",
    email: "",
    password: "",
    passwordconfirm: "",
    phone: "",
  });

  const [error, setError] = useState({
    username: "",
    birth: "",
    email: "",
    password: "",
    passwordconfirm: "",
    phone: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [isActive, setIsActive] = useState<boolean>(false);
  const [Agree,setAgree] = useState<boolean>(false);

  const onClick=()=> setAgree((prev)=> !prev);

  useEffect(() => {

    const isValid =
      Object.values(error).every((err) => err === "") &&
      Object.values(form).every((field) => field !== "");
    
    if(!Agree){setIsActive(isValid);}

  }, [form, error,Agree]);

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    //입력받은 form에서 서버로 보낼거는 pwconfirm은 빼고
    const sendToForm={
      username:form.username,
      birth:form.birth,
      email:form.email,
      password:form.password,
      phone:form.phone,
    };

    const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const birthRegex = /^\d{8}$/;
    const newError = { ...error };

    newError.username = form.username ? "" : "필수 입력칸입니다.";
    newError.birth = birthRegex.test(form.birth)
      ? ""
      : "생년월일은 8자리 숫자로 입력해주세요.";
    newError.email = validRegex.test(form.email) ? "" : "이메일 형식이 올바르지 않습니다.";
    newError.phone = form.phone ? "" : "필수 입력칸입니다.";
    newError.password =
      form.password.length >= 5 && form.password.length <= 10
        ? ""
        : "비밀번호는 5~10자리 사이로 입력해주세요.";
    newError.passwordconfirm =
      form.password === form.passwordconfirm
        ? ""
        : "비밀번호를 다시 확인 후 입력해주세요.";

    setError(newError);

    const isValid = Object.values(newError).every((err) => err === "");
    if (!isValid) return;

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, sendToForm,{
        headers:{
          "Content-Type":"application/json",
        },
      });
      if (res.status === 200) {
        console.log("서버 응답: ",res.data);
        alert("회원가입 성공");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("회원가입 오류: ", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const Openmodal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  console.log("form data: ",form);
  console.log("동의 상태: ",Agree);

  return (
    <div className="flex w-full h-screen items-center justify-center bg-introBG">
      <Modal isOpen={isOpenModal} onClose={closeModal} />
      <div className="relative w-1/3 h-1/3 shadow-md border rounded-2xl font-sejong">
        <span className="absolute -top-6 left-64 text-white font-nomal text-3xl">
          Sign Up
        </span>
        <div className="absolute top-10 left-12 bg-transparent grid grid-cols-2 gap-x-20 gap-y-3 justify-center items-center text-white">
          <div className="flex flex-col gap-y-1">
            <label className="font-bold text-md">이름</label>
            <Input
              type="text"
              name="username"
              value={form.username}
              placeholder="Enter your name"
              onChange={onChange}
            />
            <span className="text-red-400">{error.username}</span>
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-md">생년월일 (8자리)</label>
            <Input
              type="text"
              name="birth"
              value={form.birth}
              placeholder="YYYYMMDD"
              onChange={onChange}
            />
            <span className="text-red-400">{error.birth}</span>
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-md">이메일</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter your email"
              onChange={onChange}
            />
            <span className="text-red-400">{error.email}</span>
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-md">핸드폰 번호</label>
            <Input
              type="text"
              name="phone"
              value={form.phone}
              placeholder="Enter your phone"
              onChange={onChange}
            />
            <span className="text-red-400">{error.phone}</span>
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-md">비밀번호</label>
            <Input
              type="password"
              name="password"
              value={form.password}
              placeholder="Enter your password"
              onChange={onChange}
            />
            <span className="text-red-400">{error.password}</span>
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-md">비밀번호 확인</label>
            <Input
              type="password"
              name="passwordconfirm"
              value={form.passwordconfirm}
              placeholder="Confirm your password"
              onChange={onChange}
            />
            <span className="text-red-400">{error.passwordconfirm}</span>
          </div>
        </div>
        <div className="flex-row-center absolute -bottom-14 left-[42%]">
          <button onClick={onClick} className="border w-2 h-2 rounded-full mt-1 mr-3 focus:bg-green-400 fo"></button>
          <button onClick={Openmodal}>
            <span className="text-2xs text-white hover:underline">개인정보 이용 동의</span>
          </button>
        </div>
        <div className="absolute -bottom-5 left-24 w-2/3">
          <SubmitButton onClick={onSubmit} disabled={!isActive} text="sign up" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
