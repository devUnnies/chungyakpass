import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';
import './Rank.css';
import NormalRequiredDocuments from '../SubmitDocuments/NormalRequiredDocuments';
import { useLocation } from 'react-router';
import Loading from '../../components/Loading/loading';

function Rank({ history }) {
    const goBack = () => {
        history.goBack();
    };
    const goHome = () => {
        history.push('/');
    };
    useEffect(() => {
        console.log(history);
    }, [history]);

    const [loading, setLoading] = useState(true); // loading
    // 로딩 상태 적용
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, []);

    const GreetingMessage1st =
        '모든 자격 조건을 충족하셨습니다. 1순위 축하드립니다!'; // 1순위일 경우 출력 결과
    const GreetingMessage2nd = '2순위입니다'; // 2순위일 경우 출력 결과

    const location = useLocation(); // 각 공급별 결과 props 불러오기

    // 자격확인에서 props 값으로 순위 가져오기
    const generalMinyeongRes = location?.state?.form?.generalMinyeongRes; // 일반공급 민영 결과 props 가져오기
    const generalKookminRes = location?.state?.form?.generalKookminRes; // 일반공급 국민 결과 props 가져오기
    const multiChildMinyeongRes = location?.state?.form?.multiChildMinyeongRes; // 특별공급 다자녀 민영 결과 props 가져오기
    const multiChildKookminRes = location?.state?.form?.multiChildKookminRes; // 특별공급 다자녀 국민 결과 props 가져오기
    const oldParentMinyeongRes = location?.state?.form?.oldParentMinyeongRes; // 특별공급 노부모 민영 결과 props 가져오기
    const oldParentKookminRes = location?.state?.form?.oldParentKookminRes; // 특별공급 노부모 국민 결과 props 가져오기
    const newlyMarriedMinyeongRes =
        location?.state?.form?.newlyMarriedMinyeongRes; // 특별공급 신혼부부 민영 결과 props 가져오기
    const newlyMarriedKookminSpecialRes =
        location?.state?.form?.newlyMarriedKookminSpecialRes; // 특별공급 신혼부부 국민 공특법 적용 결과 props 가져오기
    const newlyMarriedKookminRes =
        location?.state?.form?.newlyMarriedKookminRes; // 특별공급 신혼부부 국민 공특법 미적용 결과 props 가져오기
    const firstLifeMinyeongRes = location?.state?.form?.firstLifeMinyeongRes; // 특별공급 생애최초 민영 결과 props 가져오기
    const firstLifeKookminRes = location?.state?.form?.firstLifeKookminRes; // 특별공급 생애최초 국민 결과 props 가져오기

    return (
        <>
            {loading ? ( // 로딩 상태 2s
                <>
                    <Loading />
                    <p className="loading_msg1">Please wait ...</p>
                    <p className="loading_msg2">
                        순위 확인 로딩 중입니다.
                        <br />
                        잠시만 기다려주세요.
                    </p>
                </>
            ) : (
                <>
                    <div className="RankMain">
                        {/* 1순위 */}
                        {generalMinyeongRes === '일순위' ||
                        generalKookminRes === '일순위' ||
                        multiChildMinyeongRes === '일순위' ||
                        multiChildKookminRes === '일순위' ||
                        oldParentMinyeongRes === '일순위' ||
                        oldParentKookminRes === '일순위' ||
                        newlyMarriedMinyeongRes === '일순위' ||
                        newlyMarriedKookminSpecialRes === '일순위' ||
                        newlyMarriedKookminRes === '일순위' ||
                        firstLifeMinyeongRes === '일순위' ||
                        firstLifeKookminRes === '일순위' ? (
                            <>
                                <div className="greetingMessage">
                                    {GreetingMessage1st}
                                    <Confetti />
                                </div>
                            </>
                        ) : null}

                        {/* 2순위 */}
                        {generalMinyeongRes === '이순위' ||
                        generalKookminRes === '이순위' ||
                        multiChildMinyeongRes === '이순위' ||
                        multiChildKookminRes === '이순위' ||
                        newlyMarriedMinyeongRes === '이순위' ||
                        newlyMarriedKookminSpecialRes === '이순위' ||
                        newlyMarriedKookminRes === '이순위' ? (
                            <>
                                <div className="greetingMessage">
                                    {GreetingMessage2nd}
                                </div>
                            </>
                        ) : null}

                        {/* 제출 서류확인 테이블 */}
                        {/* 일반 공급 서류제출 */}
                        {generalMinyeongRes === '일순위' ||
                        generalMinyeongRes === '이순위' ||
                        generalKookminRes === '일순위' ||
                        generalKookminRes === '이순위' ? (
                            <NormalRequiredDocuments />
                        ) : null}

                        <div className="rankButtonContainer">
                            <span className="buttonPosition">
                                <button
                                    className="aptBackButton"
                                    type="back"
                                    onClick={() => {
                                        history.goBack(-1);
                                    }}
                                >
                                    이전
                                </button>
                            </span>
                            <span className="buttonPosition">
                                <button
                                    className="aptNextButton"
                                    type="button"
                                    onClick={goHome}
                                >
                                    홈으로
                                </button>
                            </span>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Rank;
