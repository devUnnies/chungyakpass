export const SIGNUP_WITH_TOKEN = 'SIGNUP_WITH_TOKEN';
export const SIGNIN_WITH_TOKEN = 'SIGNIN_WITH_TOKEN';
export const SIGNOUT_WITH_TOKEN = 'SIGNOUT_WITH_TOKEN';

export const signinWithToken = (token) => ({
    type: SIGNIN_WITH_TOKEN,
    token: token,
});

export const signupWithToken = (token) => ({
    type: SIGNUP_WITH_TOKEN,
    token: token,
});

export const signoutWithToken = () => ({
    type: SIGNOUT_WITH_TOKEN,
});
