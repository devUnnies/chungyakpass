import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInputState from '../../../components/Input/useInputState';
import { HomeOutlined, CheckOutlined } from '@ant-design/icons';
import { postMultiChildKookminAptNum } from '../../../store/actions/multiChildKookminAction';
import { useHistory } from 'react-router-dom';
import '../SpecialSupply.css';

function MultiChildKookminAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const multiChildKookminAptNumStore = useSelector(
        (state) => state.multiChildKookmin
    );

    const [
        notificationNumber,
        setNotificationNumber,
        handleChangeNotificationNumber,
    ] = useInputState('');
    const [housingType, setHousingType, handleChangeHousingType] =
        useInputState('');
    const [
        multiChildKookminType,
        setMultiChildKookminType,
        handleChangeMultiChildKookminType,
    ] = useInputState('');

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            postMultiChildKookminAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
                multiChildKookminType: multiChildKookminType,
            })
        );
    };

    const onClick = async () => {
        if (
            notificationNumber === '' ||
            housingType === '' ||
            multiChildKookminType === ''
        ) {
            alert('아파트 공고번호 혹은 주택형 입력칸이 비어있습니다.');
        } else {
            dispatch(
                postMultiChildKookminAptNum({
                    notificationNumber: notificationNumber,
                    housingType: housingType,
                    multiChildKookminType: multiChildKookminType,
                })
            ); // api 연결 요청.

            const data =
                multiChildKookminAptNumStore?.postMultiChildKookminAptNum?.data;
            console.log(JSON.stringify(data));
            history.push({
                pathname: '/specialMultiChildKookmin',
                state: {
                    notificationNumber,
                    housingType,
                    multiChildKookminType,
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
        // 아파트 공고번호, 주택형 post 성공시 다자녀 민영 자격확인 페이지로 이동.
        if (multiChildKookminAptNumStore?.postMultiChildKookminAptNum) {
            const data =
                multiChildKookminAptNumStore.postMultiChildKookminAptNum.data;
        }
    }, [multiChildKookminAptNumStore?.postMultiChildKookminAptNum]);

    return (
        <>
            <div className="numbersInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <HomeOutlined />
                    </span>
                    <strong className="apt_mainTitle">특별공급 </strong>
                    <span className="apt_subTitle">| 다자녀 국민주택</span>
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
                            아파트 분양 정보 입력
                        </div>

                        <input
                            className="specialAptNumInput"
                            type="number"
                            placeholder="아파트 공고번호"
                            value={notificationNumber}
                            onChange={handleChangeNotificationNumber}
                            required
                        />
                        <br />
                        <input
                            className="specialAptNumInput"
                            type="text"
                            placeholder="주택형"
                            value={housingType}
                            onChange={handleChangeHousingType}
                            required
                        />
                        <br />
                        <select
                            className="specialAptNumInput"
                            name="multiChildKookminType"
                            value={multiChildKookminType}
                            onChange={handleChangeMultiChildKookminType}
                        >
                            <option value="">---선택---</option>
                            <option value="공공주택특별법적용">
                                공공주택 특별법 적용
                            </option>
                            <option value="공공주택특별법미적용">
                                공공주택 특별법 미적용
                            </option>
                            <option value="그외국민주택">그 외 국민주택</option>
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

export default MultiChildKookminAptNum;
