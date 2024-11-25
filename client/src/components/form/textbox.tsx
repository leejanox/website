const TextBox=(Props:{children:string,divclassname?:string,spanclassname?:string})=>{
    return(
        <div id="text-box" className={`absolute top-12 left-10 ${Props.divclassname}`}>
            <span className={`font-serif text-3xl font-extrabold ${Props.spanclassname}`}>{Props.children}</span>
        </div>
    );
}

export default TextBox;