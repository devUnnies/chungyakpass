import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { CalculatorOutlined, CheckOutlined } from '@ant-design/icons';
import { postOneParentPointAptNum } from '../../../store/actions/pointSpecialOneParentAction';
import { useHistory } from 'react-router-dom';
import '../../ExtraPoint/ExtraPoint.css';

function OneParentPointAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const oneParentPointAptNumStore = useSelector(
        (state) => state.oneParentPoint
    );

    // enter 키 누를 경우 onClick 함수 실행.
    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            onClick();
        }
    };

    const [
        notificationNumber,
        setNotificationNumber,
        handleChangeNotificationNumber,
    ] = useInputState('');

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            postOneParentPointAptNum({
                notificationNumber: notificationNumber,
            })
        );
    };

    const onClick = async () => {
        dispatch(
            postOneParentPointAptNum({
                notificationNumber: notificationNumber,
            })
        ); // api 연결 요청.

        const data = oneParentPointAptNumStore?.postOneParentPointAptNum?.data;
        console.log(JSON.stringify(data));
        history.push({
            pathname: '/point/oneParent',
            state: {
                notificationNumber,
            },
        });

        if (
            oneParentPointAptNumStore?.postOneParentPointAptNum?.data?.error ===
            'NOT_FOUND'
        ) {
            alert('가/배점을 확인할 수 없습니다.' + '\n' + data?.message);
            history.push('/');
        }
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 한부모 가배점 확인 페이지로 이동.
        if (oneParentPointAptNumStore?.postOneParentPointAptNum) {
            const data =
                oneParentPointAptNumStore.postOneParentPointAptNum.data;
        }
    }, [oneParentPointAptNumStore?.postOneParentPointAptNum]);

    return (
        <>
            <div className="numbersInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <CalculatorOutlined />
                    </span>
                    <strong className="apt_mainTitle">특별공급 </strong>
                    <span className="apt_subTitle"> | 한부모 유형</span>
                </span>
            </div>

            <div className="pointAptNumForm">
                <div className="pointAptNumContainer">
                    <form
                        onSubmit={handleSubmit}
                        onKeyPress={onKeyPress}
                        className="pointAptNumForm"
                    >
                        <div className="apt_subPlusTitle">
                            <span className="checkRedIcon">
                                <CheckOutlined />
                            </span>
                            아파트 분양 정보 입력
                        </div>

                        <input
                            className="pointAptNumInput"
                            type="number"
                            placeholder="아파트 공고번호"
                            value={notificationNumber}
                            onChange={handleChangeNotificationNumber}
                        />

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
                    </form>
                </div>
            </div>
        </>
    );
}

export default OneParentPointAptNum;
