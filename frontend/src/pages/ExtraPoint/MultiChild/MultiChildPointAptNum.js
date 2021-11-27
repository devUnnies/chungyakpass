import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { CalculatorOutlined, CheckOutlined } from '@ant-design/icons';
import { postMultiChildPointAptNum } from '../../../store/actions/pointSpecialMultiChildAction';
import { useHistory } from 'react-router-dom';
import '../../ExtraPoint/ExtraPoint.css';

function MultiChildPointAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const multiChildAptNumStore = useSelector((state) => state.multiChildPoint);

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

    const [
        multiChildHouseholdType,
        setMultiChildHouseholdType,
        handleChangeMultiChildHouseholdType,
    ] = useInputState('');

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            postMultiChildPointAptNum({
                notificationNumber: notificationNumber,
                multiChildHouseholdType: multiChildHouseholdType,
            })
        );
    };

    const onClick = async () => {
        if (notificationNumber === '' || multiChildHouseholdType == '') {
            alert(
                '아파트 분양정보 혹은 다자녀 공급 유형 입력칸이 비어있습니다.'
            );
        } else {
            dispatch(
                postMultiChildPointAptNum({
                    notificationNumber: notificationNumber,
                    multiChildHouseholdType: multiChildHouseholdType,
                })
            ); // api 연결 요청.

            const data = multiChildAptNumStore?.postMultiChildPointAptNum?.data;
            console.log(JSON.stringify(data));
            history.push({
                pathname: '/point/multiChild',
                state: {
                    notificationNumber,
                    multiChildHouseholdType,
                },
            });
        }
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 다자녀 민영 자격확인 페이지로 이동.
        if (multiChildAptNumStore?.postMultiChildPointAptNum) {
            const data = multiChildAptNumStore.postMultiChildPointAptNum.data;
        }
    }, [multiChildAptNumStore?.postMultiChildPointAptNum]);

    return (
        <>
            <div className="numbersInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <CalculatorOutlined />
                    </span>
                    <strong className="apt_mainTitle">특별공급 </strong>
                    <span className="apt_subTitle"> | 다자녀 유형 </span>
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
                        <br />
                        <select
                            className="pointAptNumInput"
                            name="multiChildPointType"
                            value={multiChildHouseholdType}
                            onChange={handleChangeMultiChildHouseholdType}
                        >
                            <option selected>---선택---</option>
                            <option value="삼세대이상">3세대 이상</option>
                            <option value="한부모가족">한부모가족</option>
                        </select>

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

export default MultiChildPointAptNum;
