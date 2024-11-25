import Footer from "components/footer";
import logo from "images/average23logo.png";
import { Link } from "react-router-dom";

const IntroLeft  =()=>{
    return(
        <div className="relative overflow-clip felx flex-shrink-0 bg-introBG w-full h-full text-slate-200">
            <div className="absolute -rotate-[29deg] top-14 -left-24">
                <span className="font-extrabold text-7xl text-nowrap">
                    average23 average23
                </span>
            </div>
            <div className="absolute -rotate-[29deg] bottom-20 -right-20">
                <span className="font-extrabold text-7xl text-nowrap">
                    average23 average23
                </span>
            </div>
            <Link to="/one">
                <button className="absolute top-1/3 right-32 border bg-inherit rounded-3xl px-8 py-1.5">
                    <span className="text-5xl font-sejong font-bold">Get Start</span>
                </button>
            </Link>
            <img alt="average23logo" src={logo} className="absolute right-28 top-44"/>
            <div className="absolute right-40 top-64 w-12 h-1 bg-slate-200 rounded-2xl"></div>
            <div className="absolute -rotate-90 bottom-52 -left-12">
                <p className="font-bold text-white text-wrap text-md">
                    "This is our <span className="text-rose-200">final project website, <br/></span>
                    created by team members <br/>
                    <span className="text-sky-200">
                        Kim Goeun <span className="text-white">&</span> Kim Minchan. <br/>
                    </span>
                    The content reflects the process <br/>
                    we followed to develop our term project."<br/>
                </p>
            </div>
            <Footer/>
        </div>
    );
}

export default IntroLeft;

/*            <div className="absolute -rotate-90 bottom-72 -left-24">
                <span className="font-extrabold text-4xl text-white">
                    Frontend & Backend<br/>
                </span>
                <span className="font-bold text-2xl text-white">
                    AI model
                </span>
            </div> */