
interface InputPropstype{
    onChange:React.ChangeEventHandler<HTMLInputElement>;
    id?:string;
    type:string;
    name:string;
    value:string|number|undefined;
    placeholder:string;
}


const Input:React.FC<InputPropstype>=({id,type,name,value,placeholder,onChange})=>{
    return(
        <div className="text-white text-sm">
            <input 
                id={id} 
                type={type} 
                name={name} 
                value={value} 
                placeholder={placeholder} 
                onChange={onChange} 
                required
                autoComplete="off"
                className="bg-transparent border-b px-8 py-1.5 focus:border-sky-600 focus:scale-105"
            />
        </div>
    );
}

export default Input;