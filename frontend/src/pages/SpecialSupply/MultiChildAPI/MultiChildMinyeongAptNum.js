import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { HomeOutlined, CheckOutlined } from '@ant-design/icons';
import { postMultiChildMinyeongAptNum } from '../../../store/actions/multiChildMinyeongAction';
import { useHistory } from 'react-router-dom';

function MultiChildMinyeongAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const multiChildMinyeongAptNumStore = useSelector(
        (state) => state.multiChildMinyeong
    );

    const [
        notificationNumber,
        setNotificationNumber,
        handleChangeNotificationNumber,
    ] = useInputState('');
    const [housingType, setHousingType, handleChangeHousingType] =
        useInputState('');

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            postMultiChildMinyeongAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
            })
        );
    };

    const onClick = async () => {
        dispatch(
            postMultiChildMinyeongAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
            })
        ); // api 연결 요청.

        const data =
            multiChildMinyeongAptNumStore.postMultiChildMinyeongAptNum.data;
        console.log(JSON.stringify(data));
        history.push({
            pathname: '/specialMultiChildMinyeong',
            props: {
                notificationNumber,
                housingType,
            },
        });
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 다자녀 민영 자격확인 페이지로 이동.
        if (multiChildMinyeongAptNumStore.postMultiChildMinyeongAptNum) {
            const data =
                multiChildMinyeongAptNumStore.postMultiChildMinyeongAptNum.data;
        }
    }, [multiChildMinyeongAptNumStore.postMultiChildMinyeongAptNum]);

    return (
        <>
            <div className="historiesInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <HomeOutlined />
                    </span>
                    <strong className="apt_mainTitle">특별공급 </strong>
                    <span className="apt_subTitle">| 다자녀 민영주택</span>
                </span>
            </div>

            <div className="specialAptNumForm">
                <div className="specialAptNumContainer">
                    <form onSubmit={handleSubmit} className="specialAptNumform">
                        <div className="apt_subPlusTitle">
                            <span className="checkRedIcon">
                                <CheckOutlined />
                            </span>
                            아파트 분양 정보 입력
                        </div>

                        <input
                            type="number"
                            placeholder="아파트 공고번호"
                            value={notificationNumber}
                            onChange={handleChangeNotificationNumber}
                            className="specialAptNumInput"
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="주택형"
                            value={housingType}
                            onChange={handleChangeHousingType}
                            className="specialAptNumInput"
                            required
                        />
                        <br />

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

export default MultiChildMinyeongAptNum;
