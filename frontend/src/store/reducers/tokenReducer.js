import {
    SIGNIN_WITH_TOKEN,
    SIGNUP_WITH_TOKEN,
    SIGNOUT_WITH_TOKEN,
} from '../actions/tokenAction';

const initialState = {
    loading: true,
    token: null,
};

export default function token(state = initialState, action) {
    console.log(action.type + '!!!');
    switch (action.type) {
        case SIGNIN_WITH_TOKEN:
            return {
                ...state,
                token: action.token,
                loading: false,
            };
        case SIGNUP_WITH_TOKEN:
            return {
                ...state,
                token: action.token,
                loading: false,
            };
        case SIGNOUT_WITH_TOKEN:
            return {
                ...state,
                token: null,
                loading: false,
            };
        default:
            return state;
    }
}
