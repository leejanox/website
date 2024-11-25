import IntroLeft from "components/introSection/introLeft";
//import IntroRight from "components/introSection/introRight";

const IntroPage:React.FC = ()=>{

    return(
        <div className="flex flex-row w-full h-screen">
            <IntroLeft/>
        </div>
    );
}

export default IntroPage;

/*flex*/

//flex : 1; == flex-grow: 1; flex-shrink: 1; flex-basis: 0%;
//flex : 1 1 auto; == flex-grow: 1; flex-shrink: 1; flex-basis: auto;
//flex : 1 500px == flex-grow: 1; flex-shrink: 1; flex-basis: 500px;

/*
            <div className="flex-1">
                <IntroRight/>
            </div>
            
*/
