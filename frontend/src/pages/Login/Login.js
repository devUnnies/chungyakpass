import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { logIn, logOut } from '../../store/actions/authAction';
import { signinWithToken } from '../../store/actions/tokenAction';
import storage from '../../services/store';
import './Login.css';
import Input from '../../components/Input/Input';
import useInputState from '../../components/Input/useInputState';
import useWindowWidth from '../../components/WindowSize/useWindowWidth';
import MainButton from '../../components/Button/MainButton';
import SubButton from '../../components/Button/SubButton';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/loading';
import { getHouse, getMem } from '../../store/actions/commonInfoAction';

function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const authStore = useSelector((state) => state.auth);

    const [email, setEmail, handleChangeEmail] = useInputState('');
    const [password, setPassword, handleChangePassword] = useInputState('');
    const [successUrl, setSuccessUrl] = useState();
    const commonInfoStore = useSelector((state) => state.commonInfo);
    // 창 가로 사이즈 가져옴
    const windowWidth = useWindowWidth();

    // 가입하기 버튼을 누르면 실행하는 함수
    const handleSubmit = useCallback(
        (event) => {
            // 이전의 값을 가지고 와서 기본값으로 세팅
            event.preventDefault();

            const userForm = { email: email, password: password };

            // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
            dispatch(logIn(userForm));
            console.log('로그인하기!!!!!');
        },
        [email, password]
    );

    const handleReset = useCallback(() => {
        setEmail();
        setPassword();
    }, []);

    // useEffect(() => {
    //     const login = authStore.login.data;
    //     const data = commonInfoStore.getHouse.data;
    //     if (login?.token) {
    //         if (data && data?.houseResponseDto) {
    //             if (data.houseResponseDto.id) {
    //                 setSuccessUrl('/');
    //                 dispatch(getMem(data.houseResponseDto.id));
    //             } else {
    //                 if (
    //                     window.confirm(
    //                         '기초정보(청약통장, 세대, 세대구성원, 청약이력, 자산)가 비어있습니다 !'
    //                     )
    //                 ) {
    //                     setSuccessUrl('/addBankBook');
    //                 } else return;
    //             }
    //         }

    //         if (successUrl) {
    //             // window.location.replace(successUrl);

    //             history.push(successUrl);
    //         }
    //     }
    // }, [commonInfoStore.getHouse]);

    useEffect(() => {
        // 로그인 성공시
        if (authStore.login.data) {
            const data = authStore.login.data;
            dispatch(signinWithToken(data.token));
            storage.set('user-token', data.token);

            if (storage.get('user-token')) {
                // dispatch(getHouse(storage.get('user-token')));
                window.location.replace('/');
            }
        }
        // 로그인 실패시
        else if (authStore.login.loading) {
            // console.log('@@@@@@' + storage.get('user-token'));
            // if (storage.get('user-token') === null) {
            //     dispatch(logOut());
            //     alert('회원가입 후 진행해주세요 !');
            //     history.push('/signup');
            // } else {
            //     dispatch(signinWithToken(storage.get('user-token')));
            //     history.push('/');
            // }
        }
    }, [authStore.login, storage]);

    return (
        <>
            {authStore.login.loading ? (
                <Loading />
            ) : (
                <div className="Login">
                    <div className="container">
                        <form onSubmit={handleSubmit} className="loginform">
                            <input
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={handleChangeEmail}
                                className="loginemail"
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={handleChangePassword}
                                className="loginpassword"
                            />
                            <br />

                            <SubButton
                                width="100"
                                height="30"
                                fontSize="16"
                                type="reset"
                                onClick={handleReset}
                            >
                                초기화
                            </SubButton>
                            <MainButton width="100" height="30" fontSize="16">
                                로그인
                            </MainButton>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
