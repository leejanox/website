import { useState,useEffect,useRef } from "react";

interface DropDownProps{
    option:string[];
    //selected:(selectedOption:string)=>void;
}

const DropDown=({option}:DropDownProps)=>{
    console.log(option);

    //드롭다운 화살표 누르면 열림 아니면 닫힘, 눌리기전까진 false
    const [isOpen,setIsOpen]=useState<boolean>(false);
    //옵션 선택, 선택 없음
    const [selectOption,setSelectOption]=useState<string|null>("");

    //드롭다운 닫기
    const handleDropDown=()=>setIsOpen(false);
    //옵션 선택
    const ClickOption=(option:string)=>{
        setSelectOption(option); //선택된 옵션 저장
        setIsOpen(false); //선택 했으면 드롭다운 닫기
       // selected(option);
    };

    //드롭다운 박스 바깥 클릭시 닫히게 -> ref 사용 
    const DropDownRef=useRef<HTMLDivElement|null>(null);

    useEffect(()=>{
        //마우스 이벤트가 현재 ref 바깥에서 일어났을시 + 드롭다운 열려있을떄
        const ClickOutSide=(e:MouseEvent)=>{
            if(DropDownRef.current&&!DropDownRef.current.contains(e.target as Node)){
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown",ClickOutSide);
        return()=>{
            document.removeEventListener("mousedown",ClickOutSide);
        }
    },[]);

    return(
        <div ref={DropDownRef} className="relative z-10">
            <button onClick={handleDropDown}>{selectOption?selectOption:"ALL"}</button>
            {isOpen&&(
                <ul className="absolute left-0 w-full text-center bg-white border border-none shadow-md">
                    {option.map((option,index)=>(
                        <li key={index} onClick={()=>ClickOption(option)} className="p-2 hover:underline">
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DropDown;