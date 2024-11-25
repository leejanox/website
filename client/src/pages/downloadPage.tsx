import { useState, useEffect } from "react";
import axios from "axios";
import {useAuth} from "context/authContext";

type FileTypes = {
  id: number; // 파일 id
  folder: string; // 폴더명 
  filename: string; // 파일명
  path: string; // 파일 경로
};

const DownloadPage: React.FC = () => {
  const [files, setFiles] = useState<FileTypes[]>([]);

  const { isloggined } = useAuth();

  // 데이터 불러오기
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        //진짜 이렇게 적어야함?
        //const res=await axios.get<FileTypes[]>(${process.env.REACT_APP_API_URL}/api/public)
        const response = await axios.get<FileTypes[]>("/api/public"); // 서버에서 파일 목록 가져오기
        setFiles(response.data);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchFiles();
  }, []);

  // 다운로드 링크 생성
  const handleDownload = async (id: number, filename: string) => {
    try {
      const response = await axios.get(`/api/searchfilename?id=${id}&filename=${filename}`);
      const { filePath } = response.data;

      // 파일 경로를 사용하여 다운로드 링크 생성
      const link = document.createElement("a");
      link.href = filePath; // 서버에서 반환된 파일 경로 사용
      link.setAttribute("download", filename); // 다운로드할 파일 이름 설정
      document.body.appendChild(link);
      link.click(); // 다운로드 실행
      link.remove(); // 링크 제거
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
    }
  };

  return (
    <div className="bg-whiteBG p-4 rounded-2xl shadow-md">
      <h1 className="text-xl font-serif font-bold mb-4">다운로드</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">클라/서버 폴더명</th>
            <th className="border border-gray-300 px-4 py-2 text-left">코드 제목</th>
            <th className="border border-gray-300 px-4 py-2 text-left">다운로드 버튼</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td className="border border-gray-300 px-4 py-2">{file.folder}</td>
              <td className="border border-gray-300 px-4 py-2">{file.filename}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDownload(file.id, file.filename)}
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DownloadPage;




/*
type FileTypes = {
  id: number; //파일 id
  folder: string; //folder명 
  codename: string;//파일명
  path: string;//파일 경로
};

const DownloadPage: React.FC = () => {
  const [file, setFile] = useState<FileTypes[]>([]);

  const isloggiend=useAuth();
  console.log("downloadpage isloggined 상태: ",isloggiend)

  // 데이터 불러오기
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get<FileTypes[]>("/api/public"); // 정적파일 가져올거니 public으로 근데 폴더명 가져와야 하잖아?
        console.log("가져온 파일 리스트 : ",response);
        setFile(response.data); // 상태 업데이트
      } catch (error) {
        console.error("데이터불러오기 실패 :", error);
      }
    };

    fetchFiles(); // 컴포넌트가 마운트될 때 실행
  }, []);

  return (
    <div className="bg-whiteBG p-4 rounded-2xl shadow-md">
      <h1 className="text-xl font-serif font-bold mb-4">다운로드</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">클라/서버 폴더명</th>
            <th className="border border-gray-300 px-4 py-2 text-left">코드 제목</th>
            <th className="border border-gray-300 px-4 py-2 text-left">다운로드 버튼</th>
          </tr>
        </thead>
        <tbody>
          {file.map((file) => (
            <tr key={file.id}>
              <td className="border border-gray-300 px-4 py-2">{file.folder}</td>
              <td className="border border-gray-300 px-4 py-2">{file.codename}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={file.path}
                  download
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DownloadPage;

*/