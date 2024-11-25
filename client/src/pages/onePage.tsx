import HeroSection from "components/heroSection";
import NavSideBar from "components/navSideBar";
import { SectionID } from "components/types";
import {useState} from "react"


//export type SectionID = "Description"|"Client"|"Server"|"AImodel"|"mySQL"|"Download"
    
//이 onepage의 용도는 one페이지 안에 navbar를 항상 고정시키고 오늘쪽 hero구역에 content를 section 값에 맞는 content를 불러오기 위해서임
    //그러려면 현재 활성화 되어 있는 sectionID -> 서로 공유를 해야 하니까 type.d.ts로 빼서 위에 정의해둔 SectionID를 공용으로 가져다 쓸거임
    //그걸 navbar에서 눌린 변화를 감지해서 이 원페이지에서 업데이트 해준다음에
    //heroSection 컴포넌트에 보내줘서 content를 불러올거임
const OnePage=()=>{

    const [activeSection,setActiveSection] =useState<SectionID>("Description");

    //그럼 여기서는 변화를 감지하는 그게 있어야하잖아
    //sectionID 값 변화를 관리하는 함수를 만들어 -> 여기에 section: SectionID 에 있는 애들만 넣어줄거고
    //활성화된 section 값을 업데이트 해줄거임
    //이게 콜백 개념이라는데 함수 자체를 넘겨서 navbar에서 그 함수안에 sectionId를 받아서 가져온다음 여기서 activeSection값을 업데이트를 해준다음
    //herosction에 넘겨줘야 제대로 작동함
    //여기서 업데이트를 안해주면 제대로 작동 안함
    const handleActiveChange=(section:SectionID)=>{
        setActiveSection(section);
        //제대로 업데이트 됐는지 확인하려고 콘솔로그 찍었음
        //이거는 위에 activesection을 SectionID 타입이라고 적어놧으니까
        //어떤 섹션인지 section이름이 떠야함
        console.log("section활성화 상태:",activeSection);
    }

    //처음 onepage 들어가서 herosection 마운트 되면 default로 정해둔 Description content 제공 
    //setActiveSection 변할 때마다 NavSideBar랑 HeroSection에 전달해서 컴포넌트 바뀌게
    return(
        <div className="flex flex-row w-full h-screen relative">
            <NavSideBar activeSection={activeSection} setActiveSection={setActiveSection}/>           
            <div className="absolute right-0 w-5/6 max-h-screen bg-WhiteBG">
                <HeroSection activeSection={activeSection} />
            </div>
        </div>
    );
}

export default OnePage;

