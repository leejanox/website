import GitHubImage from "images/githubicon.png"

const Footer=()=>{
    return(
        <div>
            <div className="absolute bottom-8 left-8">
                <span className="text-xs text-gray-400"> @ 2024 average23, lnc </span>
            </div>
            <a href="https://github.com/leejanox" className="absolute bottom-4 right-8 flex-row-center">
                <img alt="github" src={GitHubImage} className="w-10"/>
                <span className="text-xs text-gray-400">Link to github</span>
            </a>
        </div>
    );
}

export default Footer;