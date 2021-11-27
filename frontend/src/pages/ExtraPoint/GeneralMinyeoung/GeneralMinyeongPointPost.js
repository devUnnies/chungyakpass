import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CalculatorOutlined } from '@ant-design/icons';
import { postGeneralMinyeongPoint } from '../../../store/actions/pointGeneralMinyeongAction';
import { useHistory } from 'react-router-dom';
import ExtraPointTable from '../ExtraPointTable';
import '../../ExtraPoint/ExtraPoint.css';

function GeneralMinyeongPointPost(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const generalMinyeongPointStore = useSelector(
        (state) => state.generalMinyeongPoint
    );

    // enter 키 누를 경우 onClick 함수 실행.
    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            onClick();
        }
    };

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        dispatch(postGeneralMinyeongPoint({}));
    };

    const onClick = async () => {
        dispatch(postGeneralMinyeongPoint({})); // api 연결 요청.

        const data = generalMinyeongPointStore?.postGeneralMinyeongPoint?.data;
        console.log(JSON.stringify(data));
        history.push({
            pathname: '/point/generalMinyeoung',
            state: {},
        });
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 일반공급 민영 가배점 페이지로 이동.
        if (generalMinyeongPointStore?.postGeneralMinyeongPoint) {
            const data =
                generalMinyeongPointStore.postGeneralMinyeongPoint.data;
        }
    }, [generalMinyeongPointStore?.postGeneralMinyeongPoint]);

    return (
        <>
            <div className="numberInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <CalculatorOutlined />
                    </span>
                    <strong className="apt_mainTitle">일반공급 </strong>
                    <span className="apt_subTitle"> | 민영주택</span>
                </span>
            </div>

            <ExtraPointTable />

            <div className="pointAptNumForm">
                <div className="buttonContainer">
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
                            onClick={onClick}
                        >
                            다음
                        </button>
                    </span>
                </div>
            </div>
        </>
    );
}

export default GeneralMinyeongPointPost;
