import { useEffect, useState } from "react";
import axios from "axios";
//import ScrollAnimateDiv from "components/scrollAnimate";
import DropDown from "components/download/dropdown";

interface FileListType{
    id:number;
    sectiontype:string;
    filename:string;
    download_url:string;
    info:string;
}

interface OptionType{
    sectiontype:string;
}


const DownloadPage2=()=>{

    //불러올 fileList
    const [files,setFiles]=useState<FileListType[]>([]);
    //불러올 폴더명 = 옵션으로 쓸 거
    const [options,setOptions]=useState<string[]>([]);
    const [selectOption,setSelectOption]=useState<string>("ALL");
    //fileList요청
    useEffect(()=>{
        const fetchFiles = async()=>{
            try{
                const res= await axios.get<FileListType[]>(`http://localhost:5000/api/fetchfilelist`);
                setFiles(res.data);
                console.log("res.data : ",res.data);
                console.log("const files : ",files);
            }catch(error){
                console.log("fileArray 실패",error);
            }
        };

        //폴더명 요청
        const fetchOptions=async()=>{
            try {
                const res= await axios.get<OptionType[]>(`http://localhost:5000/api/fetchOptions`);
                const stringArrayOption=res.data.map((option)=>option.sectiontype);
                setOptions(stringArrayOption);
                console.log("res.data: ",res.data);
                console.log("const options: ",options);
            } catch (error) {
                console.log("fetchOptions 실패",error);
            }
        }
        fetchFiles();
        fetchOptions();
    },[]);// eslint-disable-line react-hooks/exhaustive-deps

    const handleSelectOption=(selectOption:string)=>{
        setSelectOption(selectOption);
        console.log("선택된 옵션: ",selectOption);
    }

/*    useEffect(() => {
        console.log("현재 선택된 옵션: ", selectOption);
      }, [selectOption]);
*/    

    //선택된 옵션에 따라 파일 정렬
    const filteredFiles = selectOption === "ALL"? files: files.filter((files)=>files.sectiontype === selectOption);

    return (
        <div className="min-h-screen max-h-screen bg-whiteBG overflow-y-scroll text-black p-6">
            <h1 className="text-3xl mb-4 text-center font-extrabold ">DownLoad</h1>
            <div className="table-container">
            <table className="table-auto w-full bg-gray-800 text-center rounded-lg">
                <thead className="bg-introBG text-white">
                    <tr>
                        <th className="w-1/12 px-3 py-2 border-r-2 overflow-visible">
                            <DropDown options={options} SelectOption={setSelectOption}></DropDown>
                        </th>
                        <th className="w-2/12 px-4 py-2 border-r-2">File_name</th>
                        <th className="w-5/12 px-4 py-2 border-r-2">File_Info</th>
                        <th className="w-1/12 px-4 py-2 border-r-2">Preview</th>
                        <th className="w-3/12 px-4 py-2">DownLoad</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFiles.map((files) => (
                        <tr key={files.id} className="border-t bg-white text-md font-bold">
                            <td className="px-4 py-2 border-r-2">🗂️&nbsp;&nbsp;&nbsp;{files.sectiontype.toUpperCase()}</td>
                            <td className="px-4 py-2 border-r-2">💾&nbsp;&nbsp;&nbsp;{files.filename}</td>
                            <td className="px-4 py-2 border-r-2">{files.info}</td>
                            <td className="px-4 py-2 border-r-2">🔎</td>
                            <td className="px-4 py-2 border-r-2">
                                <a
                                    href={files.download_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download={files.download_url}
                                    className="text-blue-400 underline hover:text-violet-400 focus:text-purple-600"
                                >
                                    {files.download_url}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}
export default DownloadPage2;