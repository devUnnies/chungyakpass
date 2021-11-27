import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInputState from '../../../components/Input/useInputState';
import { HomeOutlined, CheckOutlined } from '@ant-design/icons';
import { postFirstInLifeKookminAptNum } from '../../../store/actions/firstInLifeKookminAction';
import { useHistory } from 'react-router-dom';
import '../SpecialSupply.css';

function FirstLifeKookminAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const firstLifeKookminAptNumStore = useSelector(
        (state) => state.firstInLifeKookmin
    );

    const [form, setForm] = useState({
        name: '',
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const [
        notificationNumber,
        setNotificationNumber,
        handleChangeNotificationNumber,
    ] = useInputState('');
    const [housingType, setHousingType, handleChangeHousingType] =
        useInputState('');
    const [
        firstLifeKookminType,
        setFirstLifeKookminType,
        handleChangeFirstLifeKookminType,
    ] = useInputState('');
    const [
        firstRankHistoryYn,
        setFirstRankHistoryYn,
        handleChangeFirstRankHistoryYn,
    ] = useInputState('');

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            postFirstInLifeKookminAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
                firstLifeKookminType: firstLifeKookminType,
                firstRankHistoryYn: firstRankHistoryYn,
            })
        );
    };

    const onClick = async () => {
        if (notificationNumber === '' || housingType === '') {
            alert('아파트 공고번호 혹은 주택형 입력칸이 비어있습니다.');
        } else if (firstLifeKookminType === '' || firstRankHistoryYn === 'n') {
            alert(
                '일반공급 1순위 당첨 이력이 존재하는 경우에만 생애최초 자격확인이 가능합니다.'
            );
        } else {
            dispatch(
                postFirstInLifeKookminAptNum({
                    notificationNumber: notificationNumber,
                    housingType: housingType,
                    firstLifeKookminType: firstLifeKookminType,
                    firstRankHistoryYn: firstRankHistoryYn,
                })
            ); // api 연결 요청.

            const data =
                firstLifeKookminAptNumStore?.postFirstInLifeKookminAptNum?.data;
            console.log(JSON.stringify(data));
            history.push({
                pathname: '/specialFirstLifeKookmin',
                state: {
                    notificationNumber,
                    housingType,
                    firstLifeKookminType,
                    firstRankHistoryYn,
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
        // 아파트 공고번호, 주택형 post 성공시 생애최초 국민 자격확인 페이지로 이동.
        if (firstLifeKookminAptNumStore?.postFirstInLifeKookminAptNum) {
            const data =
                firstLifeKookminAptNumStore.postFirstInLifeKookminAptNum.data;
        }
    }, [firstLifeKookminAptNumStore?.postFirstInLifeKookminAptNum]);

    return (
        <>
            <div className="numbersInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <HomeOutlined />
                    </span>
                    <strong className="apt_mainTitle">특별공급 </strong>
                    <span className="apt_subTitle">| 생애최초 국민주택</span>
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
                            type="number"
                            placeholder="아파트 공고번호"
                            value={notificationNumber}
                            onChange={handleChangeNotificationNumber}
                            className="specialAptNumInput"
                            required="required"
                        />
                        <br />

                        <input
                            type="text"
                            placeholder="주택형"
                            value={housingType}
                            onChange={handleChangeHousingType}
                            className="specialAptNumInput"
                            required="required"
                        />
                        <br />
                        <select
                            className="specialAptNumInput"
                            name="firstLifeKookminType"
                            value={firstLifeKookminType}
                            onChange={handleChangeFirstLifeKookminType}
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

                        <div className="qualificationSelect">
                            <span className="qualificationBoxTitle">
                                <strong>일반공급 1순위 당첨 이력</strong>
                            </span>
                            <input
                                className="qualificationSelectInput"
                                type="radio"
                                name="firstRankHistoryYn"
                                onChange={handleChangeFirstRankHistoryYn}
                                value="y"
                                checked={
                                    firstRankHistoryYn === 'y' ? true : false
                                }
                            />
                            <span className="selectInputText">존재</span>
                            <input
                                className="qualificationSelectInput"
                                type="radio"
                                name="firstRankHistoryYn"
                                onChange={handleChangeFirstRankHistoryYn}
                                value="n"
                                checked={
                                    firstRankHistoryYn === 'n' ? true : false
                                }
                            />
                            <span className="selectInputText">미존재</span>
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

export default FirstLifeKookminAptNum;
