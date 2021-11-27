import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { HomeOutlined, CheckOutlined } from '@ant-design/icons';
import { postNewlyMarriedKookminSpecialAptNum } from '../../../store/actions/newlyMarriedKookminSpecialAction';
import { useHistory } from 'react-router-dom';
import '../SpecialSupply.css';

function NewlyMarriedKookminSpecialAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const newlyMarriedKookminSpecialAptNumStore = useSelector(
        (state) => state.newlyMarriedKookminSpecial
    );

    const [
        notificationNumber,
        setNotificationNumber,
        handleChangeNotificationNumber,
    ] = useInputState('');
    const [housingType, setHousingType, handleChangeHousingType] =
        useInputState('');
    const [
        preNewlyMarriedYn,
        setPreNewlyMarriedYn,
        handleChangePreNewlyMarriedYn,
    ] = useInputState('');

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            postNewlyMarriedKookminSpecialAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
                preNewlyMarriedYn: preNewlyMarriedYn,
            })
        );
    };

    const onClick = async () => {
        if (notificationNumber === '' || housingType === '') {
            alert('아파트 공고번호 혹은 주택형 입력칸이 비어있습니다.');
        } else if (preNewlyMarriedYn === '') {
            alert(
                '필수 입력칸이 비어 있습니다.' +
                    '\n' +
                    '예비신혼부부 여부 확인 후 항목 체크 부탁드립니다.'
            );
        } else {
            dispatch(
                postNewlyMarriedKookminSpecialAptNum({
                    notificationNumber: notificationNumber,
                    housingType: housingType,
                    preNewlyMarriedYn: preNewlyMarriedYn,
                })
            ); // api 연결 요청.

            const data =
                newlyMarriedKookminSpecialAptNumStore
                    ?.postNewlyMarriedKookminSpecialAptNum?.data;
            console.log(JSON.stringify(data));
            history.push({
                pathname: '/specialNewlyMarriedKookminSpecial',
                state: {
                    notificationNumber,
                    housingType,
                    preNewlyMarriedYn,
                },
            });
        }
    };

    // enter 키 누를 경우 onClick 함수 실행.
    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            onClick();
        }
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 신혼부부 국민 공특법 적용 자격확인 페이지로 이동.
        if (
            newlyMarriedKookminSpecialAptNumStore?.postNewlyMarriedKookminSpecialAptNum
        ) {
            const data =
                newlyMarriedKookminSpecialAptNumStore
                    .postNewlyMarriedKookminSpecialAptNum.data;
        }
    }, [
        newlyMarriedKookminSpecialAptNumStore?.postNewlyMarriedKookminSpecialAptNum,
    ]);

    return (
        <>
            <div className="numbersInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <HomeOutlined />
                    </span>
                    <strong className="apt_mainTitle">특별공급 </strong>
                    <span className="apt_subTitle">| 신혼부부 국민주택</span>
                </span>
            </div>

            <div className="specialAptNumForm">
                <div className="specialAptNumContainer">
                    <form
                        onSubmit={handleSubmit}
                        onKeyPress={onKeyPress}
                        className="specialAptNumform"
                    >
                        <div className="apt_subPlusTitle">
                            <span className="checkRedIcon">
                                <CheckOutlined />
                            </span>
                            공공주택 특별법 적용
                        </div>
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
                        <div className="qualificationSelect">
                            <span className="qualificationBoxTitle">
                                <strong>예비 신혼부부 여부</strong>
                            </span>
                            <input
                                className="qualificationSelectInput"
                                type="radio"
                                name="preNewlyMarriedYn"
                                onChange={handleChangePreNewlyMarriedYn}
                                value="y"
                                checked={
                                    preNewlyMarriedYn === 'y' ? true : false
                                }
                            />
                            <span className="selectInputText">해당</span>
                            <input
                                className="qualificationSelectInput"
                                type="radio"
                                name="preNewlyMarriedYn"
                                onChange={handleChangePreNewlyMarriedYn}
                                value="n"
                                checked={
                                    preNewlyMarriedYn === 'n' ? true : false
                                }
                            />
                            <span className="selectInputText">
                                해당하지 않음
                            </span>
                        </div>

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

export default NewlyMarriedKookminSpecialAptNum;
