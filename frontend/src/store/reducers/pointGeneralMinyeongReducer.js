import {
    // 일반 민영 post
    RES_GENERAL_MINYEONG_POINT_POST,
    RES_GENERAL_MINYEONG_POINT_POST_SUCCESS,
    RES_GENERAL_MINYEONG_POINT_POST_ERROR,
    // 일반 민영 가점 get
    RES_GENERAL_MINYEONG_POINT_GET,
    RES_GENERAL_MINYEONG_POINT_GET_SUCCESS,
    RES_GENERAL_MINYEONG_POINT_GET_ERROR,
} from '../actions/pointGeneralMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postGeneralMinyeongPoint: reducerUtils.initial(),
    getGeneralMinyeongPoint: reducerUtils.initial(),
};

export default function generalMinyeongPoint(state = initialState, action) {
    switch (action.type) {
        case RES_GENERAL_MINYEONG_POINT_POST:
        case RES_GENERAL_MINYEONG_POINT_POST_SUCCESS:
        case RES_GENERAL_MINYEONG_POINT_POST_ERROR:
            return handleAsyncActions(
                RES_GENERAL_MINYEONG_POINT_POST,
                'postGeneralMinyeongPoint'
            )(state, action);
        case RES_GENERAL_MINYEONG_POINT_GET:
        case RES_GENERAL_MINYEONG_POINT_GET_SUCCESS:
        case RES_GENERAL_MINYEONG_POINT_GET_ERROR:
            return handleAsyncActions(
                RES_GENERAL_MINYEONG_POINT_GET,
                'getGeneralMinyeongPoint'
            )(state, action);
        default:
            return state;
    }
}
