import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input/Input';
import useInputState from '../../../components/Input/useInputState';
import { postNewlyMarriedKookminAptNum } from '../../../store/actions/newlyMarriedKookminAction';
import MainButton from '../../../components/Button/MainButton';
import { useHistory } from 'react-router-dom';

function NewlyMarriedKookminAptNum(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const newlyMarriedKookminAptNumStore = useSelector(
        (state) => state.newlyMarriedKookmin
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
            postNewlyMarriedKookminAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
            })
        );
    };

    const onClick = async () => {
        dispatch(
            postNewlyMarriedKookminAptNum({
                notificationNumber: notificationNumber,
                housingType: housingType,
            })
        ); // api 연결 요청.

        const data =
            newlyMarriedKookminAptNumStore?.postNewlyMarriedKookminAptNum?.data;
        console.log(JSON.stringify(data));
        history.push({
            pathname: '/specialNewlyMarriedKookmin',
            state: {
                notificationNumber,
                housingType,
            },
        });
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 다자녀 민영 자격확인 페이지로 이동.
        if (newlyMarriedKookminAptNumStore?.postNewlyMarriedKookminAptNum) {
            const data =
                newlyMarriedKookminAptNumStore.postNewlyMarriedKookminAptNum
                    .data;
        }
    }, [newlyMarriedKookminAptNumStore?.postNewlyMarriedKookminAptNum]);

    return (
        <>
            <div className="historiesInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">
                    신혼부부 국민주택(공특법 미적용)
                </span>
            </div>
            <div className="AptNumForm">
                <div className="aptNumContainer">
                    <form onSubmit={handleSubmit} className="aptNumform">
                        <input
                            type="number"
                            placeholder="아파트 공고번호"
                            value={notificationNumber}
                            onChange={handleChangeNotificationNumber}
                            className="aptNumInput"
                            required
                        />
                        <br />

                        <span className="aptNumButton">
                            <MainButton
                                type="button"
                                onClick={onClick}
                                width="100"
                                height="35"
                                fontSize="15"
                            >
                                다음
                            </MainButton>
                        </span>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewlyMarriedKookminAptNum;
