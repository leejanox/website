//회원 로그인 상태 판단
// 전역 상태 관리 ContextAPI | redux | zustand 같은 상태관리 도구, 라이브러리 등을 사용해서 로그인 상태를 관리해야 함
//여러 페이지에서 로그인 상태를 공유 할 수 있음

import { createContext,useContext,useState } from "react";
import { useEffect } from "react";

interface AuthContextType{
    isloggined:boolean; //로그인 상태 판단 유무는 boolean -> 타입 정의
    login:(token:string)=>void; //login은 token:string을 parameter로 받는 함수 -> 타입 정의
    logout:()=>void; //logout은 parameter 받을 필요 없는 함수 -> 타입 정의 
    token:string|null; //token:string -> 타입 정의
}

//Context 생성하고 다른데서 쓸 수 있게 제공할 Provider 필요

//전역으로 만들건데 타입은 위에 인터페이스타입 가져다 쓸거임
const AuthContext= createContext<AuthContextType|undefined>(undefined);

//이게 왜 있어야 하는가 했더니
//useContext의 존재 이유가 페이지마다 로그인 상태를 판별할때 <APP/>에 감싸놨으니까
//그럴때마다 확인하려면 createContext 때문에 계속 Context를 새로 작성해서 써야하는데 이걸 만들어두면 한 번 만든걸 계속 가져다쓸 수 있어서 좋다고 함
//이름 useAuth로 바꾸는게 나을듯 그리고 얘도 재사용 = 가져다 써야하니까 export 해야함 Provider도 다른데서 쓸거니까 export 
export const useAuth = ()=>{
    //useContext는 createContext로 만들어낸거 가져다 쓰라고 눌러보면 써잇음->위에서 만든거 넣어줌
    const context=useContext(AuthContext);
    if(!context){
        //만들어둔 context 없으면 에러 던지기
        throw new Error("가져다 쓸 생성된 Context가 없다는디유?");
    }else return context;
};

//AuthProvider는 reactNode 타입의 children 을 parameter로 가져다 쓰는 함수
//한마디로 위에서 생성한 AuthContext=children를 다른페이지에 감싸서 제공할 Provider 만드는데 저게 reactNode 형태라는거
//왜 children을 중괄호로 묶어줘야 하는가?
const AuthProvider:React.FC<{children:React.ReactNode}>=({children})=>{

    //로그인 하면 토큰 생성 -> 회원 마다 다름
    const [token,setToken]=useState<string|null>(null);
    
    //토큰을 만들었으면 토큰을 어딘가에 저장해야 함
    //아니 근데 위에서 interface로 string 토큰 parameter 받는다고 했는데 타입 안써주면 또 오류남 도대체 이유가 뭐임?
    //생성된 token을 localStorage에 저장
    const login=(token:string)=>{
        console.log("login 함수 호출", token)
        setToken(token)
        //setItem ->parameter로 첫 번째 인자는 key값이고 두 번째 인자는 value 받는다고 함 -> ctrl+lb 해서 읽어보셈 그렇게 써져 있음
        localStorage.setItem("userAuthToken",token);
    };

    //logout 했으면 token을 null로 update
    const logout=()=>{
        console.log("logout 함수 호출")
        setToken(null);
        //localstroage. 까지만 치면 removeItem 나오는데 읽어보니 parameter에 key값만 인자로 받고 삭제 시켜주는듯 deleteItem 일줄 ㅋㅋ
        localStorage.removeItem("userAuthToken");
    }

    //로그인 했는지 아닌지를 참|거짓으로 판단하려면 token이 비어있는지 채워져있는지 존재하는지 아닌지를 판단해야 하는데
    // 나 진짜 이렇게 써야 하는 이유가 이해가 안되는데 thruty 한거를 true로 판단하고 falsy한거는 알아서 false로 바꿔주는 문법이라는데
    // as boolean 해도 안되고 -> 이거는 그냥 내가 이걸로 강제로 선언할테니까 경고 띄우지 말라고 하는거라 안된다고 함
    //token 상태가 참이면 true,false 햇더니 그건 아무런 효과도 없는 단순 표현식이래 대체 왜?????????/
    //이렇게 쓰면 false,null,undefined,0,nan,"" 을 다 false로 바꿔주고 그 외는 다 true로 해준대...
    const isloggined = !!token;
    console.log("로그인 상태: ",isloggined);

    useEffect(() => {

        //저장된 token localStorage에 setItem 해놧으니까 가져오는건 getItem ㅋㅋ 단순하누
        //아무튼 가져와서
        const storedToken = localStorage.getItem("userAuthToken");
        console.log("저장된 토큰 불러옴:",storedToken)
        //페이지가 아무리 새로고침 된다해도 저장된 토큰은 그대로 둘거다 이말 ㅋㅋ 
        //로그아웃 버튼 누르기 전까진 어림도 없음 ㅋㅋ ㅠㅠ... 
        //사실 다른 경우는 뭐가 있는지 아직 잘 모르겟음..
        if (storedToken) {
          setToken(storedToken);
          console.log("storedToken 상태 업데이트, storedToken: ",storedToken);
        }
      }, []);
      

    return(
        //아니 근데 value 안에 들어간 children 왜 중괄호로 안묶어주면 오류나냐고
        <AuthContext.Provider value={{isloggined,login,logout,token}}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;

/*
JWT 보안 강화: 토큰은 로컬 스토리지보다는 쿠키에 저장하는 것이 더 안전. 
근데 아직 잘 모르겟음; 다음에 해보는 걸로..
특히 httpOnly 쿠키를 사용하면 XSS 공격을 방어할 수 있다고 함

백엔드 검증: 클라이언트에서 로그인 상태를 판단하더라도 중요한 데이터는 백엔드에서 토큰 검증을 통해 보호해야 한다고 함
*/