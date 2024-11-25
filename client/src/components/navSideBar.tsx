import { SectionID } from "./types";
import {Link} from "react-router-dom";
import GitHubImage from "images/githubicon.png"
import logo from "images/average23logo.png"
import { useAuth } from "context/authContext";
import { Navigate } from "react-router-dom";

type NavSideBarProps ={
    activeSection:SectionID;
    //얜 함수가 맞음 그냥 스트링인 섹션을 매개변수로 받는 함수다 <= 라는거를 타입으로 명시해준 것 일뿐.
    //그냥 선택되어 있는 섹션만 확인하고 반환할게 없으니까 => void;
    setActiveSection:(section:SectionID)=> void;
};


const NavSideBar:React.FC<NavSideBarProps>=({activeSection,setActiveSection})=>{

    const {logout,token}=useAuth();

    const LogOut=()=>{
        logout();
        console.log(token);
        if(token === null){
            console.log("로그아웃 성공");
            alert("로그아웃 성공");
            <Navigate to="/"/>;
        }
    }

    const section:SectionID[]=["Description","Client","Server","AImodel","Cooperation","Download",];
    console.log("현재활성화된 section: ",activeSection);
    return(
        <div className="relative overflow-clip felx flex-shrink-0 bg-blackBG w-1/6 h-full text-white">
            <Link to="/" className="absolute top-16 left-2">
                <img alt="average23logo" src={logo} />
            </Link>
            <div className="absolute bottom-14 right-4 text-sm">
                <Link to="/login">
                    Login
                </Link>
                <span>&nbsp;|&nbsp;</span>
                <Link to="/signup">
                    SignUp
                </Link>
            </div>
            <ul className="absolute top-48 left-12 flex flex-col justify-start gap-6">
                {section.map((section)=>(
                    <li key={section} className="hover:text-slate-200 focus:text-slate-200">
                        <button className="text-2xl font-bold" onClick={()=>setActiveSection(section)}>{`${section}`}</button>
                    </li>
                ))}
            </ul>
            <div className="absolute bottom-14 flex-row-between gap-4 left-10">
                <a href="https://github.com/leejanox">
                    <img alt="github" src={GitHubImage} className="w-10"/>
                    <span className="text-xs text-gray-400">goeun</span>
                </a>
                <a href="https://github.com/minchani0918">
                    <img alt="github" src={GitHubImage} className="w-10"/>
                    <span className="text-xs text-gray-400">minchan</span>
                </a>
            </div>
            <div className="absolute bottom-6 left-10">
                <span className="font-mono text-xs text-gray-400">@ 2024 average23, lnc </span>
                <button onClick={LogOut} className="ml-16">
                    <span className="text-xs text-gray-400 underline">logout</span>
                </button>
            </div>
        </div>
    );
}

export default NavSideBar;