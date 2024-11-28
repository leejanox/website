import { ReactElement, ReactHTMLElement, useState } from "react";

type SearchBoxProps={
    setSearchText:(text:string)=>void;
}

const SearchBox:React.FC<SearchBoxProps>=({setSearchText})=>{

    const [inputText,setInputText]=useState<string>("");

    const Input=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.target.name === "search"?setSearchText(e.target.value):setSearchText("");
    }

    return(
        <form id="search relative w-40 h-6">
            <input className="w-28 h-fit" name="search" value={inputText}>
                search
            </input>
        </form>
    );

}

export default SearchBox;