import { useEffect, useState,} from "react";
import {motion, wrap } from "framer-motion";
import { SectionID } from "./types";


//Description"|"Client"|"Server"|"AImodel"|"mySQL"|"Download"|"Favorite"
/*서버에 이미지 api 요청해서 받아오기 전에 만든 목업데이터*/

import img_1 from "images/carouselimage/image1.jpg";
import img_2 from "images/carouselimage/image2.jpg";
import img_3 from "images/carouselimage/image3.jpg";
import img_4 from "images/carouselimage/image4.jpg";
import img_5 from "images/carouselimage/image5.jpg";

const images:Record<SectionID,string[]>={
    Description:[img_1,img_2,img_3,img_4,img_5],
    Client:[img_2,img_2,img_3,img_4,img_5],
    Server:[img_3,img_1,img_3,img_4,img_5],
    AImodel:[],
    Cooperation:[img_4,img_2,img_3,img_4,img_5],
    Download:[],
};/**/


const Carousel:React.FC<{section:SectionID}>=({section})=>{

    const [curr,setCurr]=useState<number>(0);

    //images -> 서버로 요청 보내서 받아온 sectionID:string[] 한마디로 주소를 배열로 ... =  리스트로 받아와서 저장할거니까 이렇게 타입 선언
    //근데 배열인가? 리스트인가? 물어보니까  images객체에서 각 섹션의 값은 문자열 타입의 배열이 맞대
    /*"리스트"라는 용어는 주로 배열(array)이나 데이터의 순차적 컬렉션을 지칭하는데 사용됩니다. 다만, 프로그래밍 언어에 따라 용어가 다를 수 있습니다. 여기서는 TypeScript와 JavaScript에서 "리스트"를 배열(array)로 이해하는 것이 일반적입니다. */
    //라고 하니까 같은 말이라는 소리
    //const [images,setImages]=useState<string[]>([]);

    //담을 공간 선언해놨으니 이제 요청해서 받아와야함
    //section에 맞는 이미지 api로 가져오기
    /*
    useEffect(()=>{
        //함수 정의
        const fetchImages =async()=>{
            try{//요청 시도
                const res=await fetch(`/api/images/${section}`);//엔드 포인트 section
                if(res.ok){//요청 성공시
                    //응답으로 돌아온 res.json을 strig[]타입의 imageUrls에 넣어두고
                    const imageUrls:string[] =await res.json();
                    //useState 사용해서 images 업데이트
                    setImages(imageUrls);
                } else {//요청 실패시
                    console.error("이미지 주소 받아오기 실패");
                }
            } catch(error) {
                console.error("이미지를 불러오지 못했습니다.",error);
            }
        };

        if(section){
            fetchImages();//함수 실행
        }
        //의존성 배열에 section 추가
    },[section])*/

    //이전 = ((현재-1)+섹션ID 이미지 길이 )/섹션ID 이미지 길이
    //curr= 2, prev= ((2-1)+5)/5 = 6/5 -> 1 
    const Prev=()=>{
        //목업 데이터 썼을대는 images[section] 으로 가서 section 배열의 길이를 구해야 하니까 이렇게 썻음
        setCurr((prev)=>(((curr-1)+images[section].length)%images[section].length))
        //이제 데이터 받아다 쓰는데 그거는 이제 이미 어떤 section인지 판단해서 그 section의 imageUrls:string[]을 보내주는거니까 imageUrls.lenth 써야함
        //setCurr((prev)=>(((curr-1)+images.length)%images.length));
    }

    //curr=2 , next= (2+1)/5 -> 3
    const Next=()=>{
        //prev 바꾼것과 동일
        setCurr((next)=>((curr+1)%images[section].length))
        //setCurr((next)=>((curr+1)%images.length))
    }
    
    return(
        <div className=" w-full h-1/2 flex">
            <div className="overflow-clip relative">
                <motion.div key={curr} id="Slider" className="px-36"
                    initial={{opacity:0,x:50}} 
                    whileInView={{opacity:1,x:0}} 
                    viewport={{once:false}} 
                    transition={{
                        ease:"easeInOut",
                        duration:2,
                        x:{duration:1}
                }}
                >
                    <img alt={`${section}_img_${curr+1}`} src={images[section][curr]}/>
                </motion.div>
                <button onClick={Prev} className="text-gray-400 text-6xl absolute bottom-2 left-4">{`<`}</button>
                <button onClick={Next} className="text-gray-400 text-6xl absolute bottom-2 right-4">{`>`}</button>
            </div>
        </div>
    );
}

export default Carousel;

/*
                <motion.div key={((curr-1)+images[section].length)%images[section].length} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}>
                    <img alt={`${section}_img${((curr-1)+images[section].length)}`} src={images[section][((curr-1)+images[section].length)]}/>
                </motion.div>

                <motion.div key={(curr+1)%images[section].length}initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}>
                    <img alt={`${section}_img${curr+2}`} src={images[section][(curr+1)%images[section].length]}/>
                </motion.div>

*/