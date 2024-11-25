//들어가야 할 내용: 1.ai모델 만든 배경 2.모델 학습 3. 학습모델 연동 4, 예측 모델 체험
//밑으로 스크롤 할때마다 단락별로 1,2,3 과정 보여주기
//맨 마지막에 사용자한테 예측모델 체험해보기 -> 입력 값 받아서 예측값 보여주기
import ScrollAnimateDiv from "components/scrollAnimate";
import testIMG from "images/test.jpg";

const AImodePage=()=>{
    return(
        <div className="bg-whiteBG flex-shrink-0 w-full max-h-screen overflow-y-auto relative text-black font-sejong">
            <ScrollAnimateDiv>
                <div className="w-full min-h-2/3 max-h-2/3">
                    <span>ai모델 만든 배경</span>
                    <img alt="test" src={testIMG}/>
                </div>
            </ScrollAnimateDiv>
            <ScrollAnimateDiv>
                <div className="w-full min-h-2/3 max-h-2/3">
                    <span>사용한 데이터</span>
                    <img alt="test" src={testIMG}/>
                </div>
            </ScrollAnimateDiv>
            <ScrollAnimateDiv>
                <div className="w-full min-h-2/3 max-h-2/3">
                    <span>모델을 학습시킨 알고리즘 선택 배경</span>
                    <img alt="test" src={testIMG}/>
                </div>
            </ScrollAnimateDiv>
            <ScrollAnimateDiv>
                <div className="w-full min-h-2/3 max-h-2/3">
                    <span>모델 정확도를 높이기 위한 데이터 전처리 과정</span>
                    <img alt="test" src={testIMG}/>
                </div>
            </ScrollAnimateDiv>
            <ScrollAnimateDiv>
                <div className="w-full min-h-2/3 max-h-2/3">
                    <span>만들어진 학습모델 소개</span>
                    <img alt="test" src={testIMG}/>
                </div>
            </ScrollAnimateDiv>
            <ScrollAnimateDiv>
                <div className="w-full min-h-2/3 max-h-2/3">
                    <span>예측모델 체험해보기</span>
                    <img alt="test" src={testIMG}/>
                </div>
            </ScrollAnimateDiv>
        </div>
    );
}

export default AImodePage;