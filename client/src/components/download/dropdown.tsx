import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


// Props Type 정의
interface DropDownProps {
  options: string[]; // 드롭다운 선택창에 들어갈 옵션 배열
  SelectOption:(isSelectedOption:string)=>void; 
}

const DropDown = ({ options ,SelectOption}: DropDownProps) => {
  console.log("옵션으로 뭐 들어왔을까? : ", options);

  const [isOpen, setIsOpen] = useState<boolean>(false); // 드롭다운 메뉴가 열렸는지 아닌지
  const [isSelectedOption, setIsSelectedOption] = useState<string>("ALL"); // 선택된 옵션 글자 비교할 거니까 string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDropDown=()=>setIsOpen((prev=>!prev));

  const handleSelectOption = (option: string) => {
    setIsSelectedOption(option);
    SelectOption(option);
    console.log("사용자가 누른 옵션: ", option);
    console.log("드롭다운 내부 상태 업데이트 전 선택된 옵션: ",isSelectedOption);
    setIsOpen(false); // 옵션 선택 시 드롭다운 닫기
  };

  const DropDownRef = useRef<HTMLDivElement | null>(null); // 드롭다운 창 | 그 외로 영역 구분

  // 외부 클릭 이벤트 감지
  useEffect(() => {
    const ClickOutSide = (e: MouseEvent) => {
      if (DropDownRef.current && !DropDownRef.current.contains(e.target as Node)) {
        // 드롭다운 창이 있고, 마우스 이벤트가 드롭다운 창 안에서 일어나지 않았다면 닫기
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", ClickOutSide); // 이벤트 리스너로 클릭 이벤트 감지
    return () => {
      document.removeEventListener("mousedown", ClickOutSide); // 한 번 실행되면 이벤트 리스너 초기화
    };
  }, []);

  return (
    // 드롭다운 ref 안에 첫 번째는 기본으로 "ALL"을 보여주고 클릭하면 isOpen 상태 판단해서 옵션 리스트 보여주기
    <div ref={DropDownRef} className="relative inline-block text-left">
      {/* 드롭다운 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent text-white pl-4 py-2"
      >
        <span>ALL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95, y: -5 }} // 초기 상태
            animate={{ opacity: 1, scale: 1, y: 0 }} // 애니메이션 실행 상태
            exit={{ opacity: 0, scale: 0.95, y: -5 }} // 닫힐 때 상태
            transition={{ duration: 0.2 }} // 애니메이션 시간
            className="absolute -left-1.5 z-10 mt-2 w-24 bg-white border rounded-md shadow-lg"
          >
            <li className="px-4 py-2 border-b-2 hover:underline text-black" onClick={()=>handleSelectOption("ALL")}>ALL</li>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectOption(option)
                } // 옵션 클릭 시 선택
                className="px-4 py-2 border-b-2 hover:underline text-black"
              >
                {option.toUpperCase()}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDown;
