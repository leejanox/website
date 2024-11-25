interface ButtonPropstype{
    text:string;
    onClick:React.MouseEventHandler;
    disabled?:boolean;
}

const SubmitButton:React.FC<ButtonPropstype>=({text,onClick,disabled})=>{

    return(
        <button 
            onClick={onClick} 
            disabled={disabled} 
            className={`border w-full py-2 rounded-2xl border-none bg-gradient-to-br ${disabled?"from-gray-300 to-gray-800 cursor-not-allowed": "from-gray-50 to-black"}`}
        >
            <span className="text-white font-nomal font-md">{text}</span>
        </button>
    );
}

export default SubmitButton;