import { useState, useEffect, useRef, forwardRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ isOpen, onClose }, ref) => {
  //구역설정
  const modalRef = useRef<HTMLDivElement | null>(null);
  //모달 안에 넣어줄 텍스트 설정
  const [textFile, setTextFile] = useState<string>("");
  //바깥구역 클릭 이벤트 정의
  const outsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  //모달창 열렸을때 
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", outsideClick);
      fetch("/agreetext.txt")
        .then((res) => {
          if (!res.ok) {
            throw new Error("파일 불러오기 실패");
          }
          return res.text();
        })
        .then((text: string) => {
          setTextFile(text);
        })
        .catch((error: Error) => {
          console.log("파일 생성 실패:", error);
          setTextFile("개인정보 처리 및 방침을 불러오는데 실패했습니다.");
        });
    } else {
      document.removeEventListener("mousedown", outsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
    //React Hook useEffect has a missing dependency: 'outsideClick'. Either include it or remove the dependency array. ->오류
    //isOpen이 모달이 열리고 닫힐때 이벤트리스너를 생성 제거해서 useEffect를 실행할지 말지 결정하는데 outsideClick도 의존성배열에 추가하라고 뜸
    //그치만 추가할 필요 x, 이유: outsideclick을 의존성배열에 추가하지 않아도 useEffect 함수 내부에서 정의 되어있기 때문에 
    //isOpen 상태가 변경될때마다 알아서 새롭게 정의되고 사용됨
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-10" ref={ref}>
      <div
        ref={modalRef}
        className="border min-w-[500px] max-w-[500px] min-h-[300px] max-h-[300px] bg-white bg-opacity-90 rounded-2xl p-6 w-96 relative flex-col-center"
      >
        <div className="absolute right-4 top-2">
          <button onClick={onClose}>닫기</button>
        </div>
        <div className="absolute top-2">
          <span className="font-base font-bold text-sm">개인정보 이용 및 처리 방침</span>
        </div>
        <div className="flex-grow border-none py-4 px-2 whitespace-normal break-words overflow-y-auto max-h-[250px] max-w-[450px]">
          {textFile ? (
            <pre className="text-base text-2xs">{textFile}</pre>
          ) : (
            <span>loading</span>
          )}
        </div>
      </div>
    </div>
  );
});

export default Modal;
