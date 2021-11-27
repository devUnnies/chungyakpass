import { post } from './instance';

//로그인 및 회원가입 API
export const logIn = (info) =>
    post('account/authenticate', info).catch((error) => {
        console.log(error);
        alert('아이디나 비밀번호를 잘못 입력하셨습니다 !');
    });
export const signUp = (info) =>
    post('account/signup', info).catch((error) => {
        console.log(error);
    });
