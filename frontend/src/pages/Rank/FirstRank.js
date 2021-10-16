import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';
import './Rank.css';
import MainButton from '../../components/Button/MainButton';
import NormalRequiredDocuments from '../SubmitDocuments/NormalRequiredDocuments';
import { useLocation } from 'react-router';

function FirstRank({ history }) {
    const goBack = () => {
        history.goBack();
    };
    const goHome = () => {
        history.push('/');
    };
    useEffect(() => {
        console.log(history);
    }, [history]);

    const GreetingMessage =
        '모든 자격 조건을 충족하셨습니다. \n1순위 축하드립니다!';
    const location = useLocation(); // 각 공급별 결과 props 불러오기
    const generalMinyeongRes = location?.state?.form?.generalMinyeongRes; // 일반공급 결과 props 가져오기

    return (
        <div className="FirstRankMain">
            <div className="greetingMessage">{GreetingMessage}</div>
            <Confetti />

            {/* 제출 서류확인 테이블 */}
            {/* 일반 공급 서류제출 */}
            {generalMinyeongRes === '1순위' ||
            generalMinyeongRes === '2순위' ? (
                <NormalRequiredDocuments />
            ) : null}

            <div className="goButton">
                <MainButton
                    onClick={goBack}
                    width="80"
                    height="30"
                    fontWeight="bold"
                >
                    뒤로가기
                </MainButton>
                <MainButton
                    onClick={goHome}
                    width="80"
                    height="30"
                    fontWeight="bold"
                >
                    홈으로
                </MainButton>
            </div>
        </div>
    );
}

export default FirstRank;
