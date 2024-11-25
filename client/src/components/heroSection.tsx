import { SectionID } from "components/types";
import { useEffect } from "react";
//import DownLoadPage from "pages/downloadPage";
import Carousel from "./carousel";
import { useAuth } from "context/authContext";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import AImodePage from "pages/aimodelPage";
import {motion} from "framer-motion";
import DWPage from "pages/dwpage";

//herosectionProps의 activesection 은 type.d.ts에서 가져온 SectionID 타입임
type HeroSectionProps = {
    activeSection: SectionID;
};

//HereSection은 react.fc 에서 정의한 herosectionprops의 activesection을 parameter로 가져다 쓴다는 소리
const HeroSection: React.FC<HeroSectionProps> = ({ activeSection }) => {
    //isloggined 를 authContext에서 useAuth를 가져와 사용해 이미 발급된 token을 재사용해 로그인 상태 판단
    const { isloggined } = useAuth();
    //여기서 참이 찍혀 그러니까 download 페이지가 나옴 
    console.log("HreoSection isloggiend 상태: ",isloggined);
    const navigate = useNavigate(); // navigate 훅 사용


    //얘는 다운로드 페이지 로그인 안한 사람이 눌럿을때 navigate 해줄 용도
    useEffect(() => {

        if (activeSection === "Download" && !isloggined) {
            navigate("/login"); // 로그인되지 않으면 로그인 페이지로 이동
        }
        
    }, [isloggined, activeSection, navigate]);

    //activeSection이 aimodel 이면 carousel 말고 aimodel 페이지 따로 불러와 보여주기
    if(activeSection === "AImodel"){
        return(
            //얘 패딩주지마셈 왜냐고? 나도 알고 싶지 않았음 높이 어긋남;
            <div className="">
                <AImodePage/>
            </div>
        )
    }
    
    if (activeSection === "Download") {
        return (
            //얘도 패딩 넣지마셈
            <div className="">
                {isloggined ? (
                    <DWPage/>
                ) : (
                    <div>로그인 필요</div> // 로그인되지 않으면 메시지 출력 -> 근데 useEffect 해놔서.. 어떻게 더 줄일 방법이 있나..?
                )}
            </div>
        );
    }

    // 기본적으로 다른 섹션은 Carousel을 표시
    //이거 onePage에     const [activeSection,setActiveSection] =useState<SectionID>("Description"); 이렇게 해놔서 기본 description상태임
    //description,client,server 는 carousel 나와야 함
    return (
        <motion.div className="p-4"
            initial={{opacity:0,y:50}}
            whileInView={{opacity:1 ,y:0}}
            viewport={{once:false}}
            transition={{
                ease:"easeIn",
                duration:1,
                y:{duration:0.5}
            }}
        >
            <Carousel section={activeSection} />
        </motion.div>
    );
};

export default HeroSection;
