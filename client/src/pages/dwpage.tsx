import axios from "axios";
import DropDown from "components/dropdown";
import { useState,useRef,useEffect } from "react";

type FileType={
    id:number; //index
    fn:string;//filename
    fp:string;//filepath
    ft:string;//C:Client, S:Server
}

const Options=[
    "ALL","Client","Server"
]

//목업
const filelist: FileType[] = [
    { id: 1, fn: "iamge1.jpg", fp: "client/public/images/Client/image1.jpg", ft: "Client" },
    { id: 1, fn: "iamge2.jpg", fp: "client/public/images/Client/image2.jpg", ft: "Client" },
    { id: 1, fn: "iamge3.jpg", fp: "client/public/images/Client/image3.jpg", ft: "Client" },
    { id: 1, fn: "iamge4.jpg", fp: "client/public/images/Client/image4.jpg", ft: "Client" },
    { id: 1, fn: "iamge5.jpg", fp: "client/public/images/Client/image5.jpg", ft: "Client" },
    { id: 2, fn: "iamge1.jpg", fp: "client/public/images/Server/image1.jpg", ft: "Server" },
    { id: 2, fn: "iamge2.jpg", fp: "client/public/images/Server/image2.jpg", ft: "Server" },
    { id: 2, fn: "iamge3.jpg", fp: "client/public/images/Server/image3.jpg", ft: "Server" },
    { id: 2, fn: "iamge4.jpg", fp: "client/public/images/Server/image4.jpg", ft: "Server" },
    { id: 2, fn: "iamge5.jpg", fp: "client/public/images/Server/image5.jpg", ft: "Server" }
  ];

const DWPage=()=>{

    const [files, setFiles] = useState<FileType[]>([]);

    useEffect(()=>{

        console.log(files)
        setFiles(filelist);

    },[files]);

    return(
        
        <div className="container bg-transparent p-4 max-w-full min-h-screen overflow-hidden">
            <div className="font-sejong font-bold mt-5 mb-3 text-center">회원 전용 다운로드 써비스 ㅋ</div>
            <table className="min-w-full table-fixed border border-collapse border-white text-black">
                <thead className="justify-between">
                    <tr className="bg-introBG">
                        <th className="w-2/12 text-white border border-gray-500 p-4 text-center"><DropDown option={Options}/></th>
                        <th className="w-8/12 text-white border border-gray-500 p-4 text-center">파일명</th>
                        <th className="w-1/12 text-white border border-gray-500 p-4 text-center">미리보기</th>
                        <th className="w-3/12 text-white border border-gray-500 p-4 text-center">다운로드</th>            
                    </tr>
                </thead>
                <tbody>
                    {files.map((file)=>(
                        <tr key={file.id}>
                            <td className="w-2/12 border border-none p-2 text-center">{file.ft}</td>
                            <td className="w-8/12 border border-none p-2 text-center">{file.fn}</td>
                            <td className="w-1/12 border border-none p-2 text-center">
                                <button className="border rounded-full w-2 h-2 bg-black"></button>
                            </td>
                            <td className="w-3/12 border border-none p-2 text-center">
                                <a href={`${file.fp}`} download={file.fp}>
                                    <button className="border rounded-full w-2 h-2 bg-red-700"></button>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DWPage;

/*tr (table row) : 행
td (table data) : 행의 내용
th (table heading) : 행, 열의 제목
caption : 표 제목
col / colgroup : 스타일 지정을 위한 열(그룹)
thead : 머리글
tfoot : 꼬리말
tbody : 본문 */


    /*const fetchFiles = async ({ id }: { id: number }) => {

        try {
          let response;
  
          // id가 0이면 id 1과 2를 모두 가져옴
          if (id === 0) {
            response = await axios.get<FileType[]>('/api/downloadfile?id=1&id=2');
          } else {
            // id가 1 또는 2이면 해당 id의 파일만 가져옴
            response = await axios.get<FileType>(`/api/downloadfile?id=${id}`);
          }
  
          // 파일 데이터를 상태에 저장
          //서버 응답이 배열인지 확인하고 저장
          setFiles(Array.isArray(response.data) ? response.data : [response.data]);
        } catch (error) {
          console.error('파일 경로 가져오기 실패:', error);
        }
      };
    */