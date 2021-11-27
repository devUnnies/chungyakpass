import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { signUp } from '../../store/actions/authAction';
import { signinWithToken } from '../../store/actions/tokenAction';
import storage from '../../services/store';
import { NavLink, useHistory } from 'react-router-dom';
import './Signup.css';
import Input from '../../components/Input/Input';
import useInputState from '../../components/Input/useInputState';
import useWindowWidth from '../../components/WindowSize/useWindowWidth';
import MainButton from '../../components/Button/MainButton';
import SubButton from '../../components/Button/SubButton';

function Signup() {
    const history = useHistory();
    const dispatch = useDispatch();
    const authStore = useSelector((state) => state.auth);

    const [email, setEmail, handleChangeEmail] = useInputState('');
    const [prepassword, setPrepassword, handleChangePrepassword] =
        useInputState();
    const [password, setPassword, handleChangePassword] = useInputState();

    const [pwMsg, setPwMsg] = useState();

    // 창 가로 사이즈 가져옴
    const windowWidth = useWindowWidth();

    // const handleEmailCode = () => {
    //   alert("이메일 인증 버튼 눌렀음 !!!");
    // };

    const pwcheck = (pw) => {
        if (prepassword !== pw) {
            setPwMsg('이전에 쓴 비밀번호와 동일하지 않습니다.');
            return false;
        } else if (pw !== prepassword) {
            setPwMsg('이전에 쓴 비밀번호와 동일하지 않습니다.');
            return false;
        } else {
            setPwMsg();
            return true;
        }
    };

    useEffect(() => {
        pwcheck(password);
    }, [password]);

    // 가입하기 버튼을 누르면 실행하는 함수
    const handleSubmit = useCallback(
        (event) => {
            // 이전의 값을 가지고 와서 기본값으로 세팅
            event.preventDefault();
            let userForm;

            if (password && prepassword)
                userForm = { email: email, password: password };
            else alert('비밀번호를 모두 입력하지 않으셨습니다 !!!!');

            // console.log(userForm);
            // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
            if (userForm) dispatch(signUp(userForm));
        },
        [email, password]
    );

    const handleReset = useCallback(() => {
        setEmail('');
        setPrepassword('');
        setPassword('');
        setPwMsg('');
    }, []);

    useEffect(() => {
        // 회원가입 성공시
        if (authStore.signup.data) {
            const data = authStore.signup.data;
            if (data !== null) {
                if (data.status === 409) {
                    alert(data.message);
                } else {
                    alert(
                        '청약패스에 가입해주신 이용자님, 환영합니다 ! ^____^ *'
                    );
                    window.location.replace('/login');
                }
            }
        }
    }, [authStore.signup]);

    return (
        <>
            <div className="Signup">
                <div className="SignupContainer">
                    <form onSubmit={handleSubmit} className="SignupForm">
                        <input
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={handleChangeEmail}
                            className="signupEmail"
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={prepassword}
                            onChange={handleChangePrepassword}
                            className="signupPassword"
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="비밀번호확인"
                            value={password}
                            onChange={handleChangePassword}
                            className="signupPassword"
                        />

                        {pwMsg ? (
                            <span className="failMsg">{pwMsg}</span>
                        ) : (
                            <></>
                        )}

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
                            가입하기
                        </MainButton>
                    </form>
                    {/* <div>{windowWidth}</div> */}
                </div>
            </div>
        </>
    );
}

export default Signup;
