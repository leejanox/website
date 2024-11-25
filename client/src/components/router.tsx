import {Routes,Route,} from "react-router-dom";
//import { SectionID } from "components/types";
import IntroPage from "pages/IntroPage";
import OnePage from "pages/onePage";
import SignUpPage from "pages/signupPage";
import LoginPage from "pages/loginPage";
import DownloadPage from "pages/downloadPage";
import DWPage from "pages/dwpage";


const Router=()=>{
    return(
        <Routes>
            <Route path="/" element={<IntroPage/>}/>
            <Route path="/one" element={<OnePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/down" element={<DWPage/>}/>
        </Routes>
    );
}

export default Router;


/*
const sections: SectionID[]=["Home","Login","SignUp","Description","Client","Server","AImodel","mySQL","Download","Favorite"];

const Router:React.FC=()=>{
    return(
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            {sections.map((section)=>(
                <Route key={section} path={`/${section.toLowerCase()}`} element={<MainPage/>}/>
            ))}
        </Routes>
    );
}

export default Router;
 */
