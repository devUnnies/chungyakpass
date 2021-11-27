import {
    USER_RANK_GET,
    USER_RANK_GET_SUCCESS,
    USER_RANK_GET_ERROR,
} from '../actions/rankAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    getRank: reducerUtils.initial(),
};

export default function rank(state = initialState, action) {
    switch (action.type) {
        case USER_RANK_GET:
        case USER_RANK_GET_SUCCESS:
        case USER_RANK_GET_ERROR:
            return handleAsyncActions(USER_RANK_GET, 'getRank')(state, action);
        default:
            return state;
    }
}
