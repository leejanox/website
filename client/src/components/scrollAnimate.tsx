import {motion} from "framer-motion";
import { ReactNode } from "react";

interface ScrollDivProps{
    children:ReactNode
}

const ScrollAnimateDiv:React.FC<ScrollDivProps>=({children})=>{
    return(
        <motion.div 
            className="w-full max-h-screen p-4 flex flex-col flex-1 space-y-10"
            //컴포넌트 마운트 될때 초기 설정 불투명도 0 , y축 기준으로 50px 아래
            initial={{opacity:0,y:50}}
            //view 안에 들어왔을 때 불투명도 1
            whileInView={{opacity:1,y:0}}
            //이 컴포넌트가 화면에서 사라졋다 나타날때마다 애니메이션 실행되게 true 하면 맨처음 마운트 될때만 한 번 실행 됨.
            viewport={{once:false}}
            transition={{
                //애니메이션 속도가 시작과 마지막에 서서히 변화
                ease:"easeInOut",
                //전체 애니메이션 지속시간 2초
                duration:2,
                //y축 이동 애니메이션 지속시간 1초
                y:{duration:1},
            }}
        >
            
            {children}
        </motion.div>
    );
}

export default ScrollAnimateDiv;