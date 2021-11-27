import {
    // 신혼부부 아파트 분양정보 post
    RES_NEWLYMARRIAGE_POINT_APTNUM_POST,
    RES_NEWLYMARRIAGE_POINT_APTNUM_POST_SUCCESS,
    RES_NEWLYMARRIAGE_POINT_APTNUM_POST_ERROR,
    // 신혼부부 가점 get
    RES_NEWLYMARRIAGE_POINT_GET,
    RES_NEWLYMARRIAGE_POINT_GET_SUCCESS,
    RES_NEWLYMARRIAGE_POINT_GET_ERROR,
} from '../actions/pointSpecialNewlyMarriageAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postNewlyMarriagePointAptNum: reducerUtils.initial(),
    getNewlyMarriagePoint: reducerUtils.initial(),
};

export default function newlyMarriagePoint(state = initialState, action) {
    switch (action.type) {
        case RES_NEWLYMARRIAGE_POINT_APTNUM_POST:
        case RES_NEWLYMARRIAGE_POINT_APTNUM_POST_SUCCESS:
        case RES_NEWLYMARRIAGE_POINT_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_NEWLYMARRIAGE_POINT_APTNUM_POST,
                'postNewlyMarriagePointAptNum'
            )(state, action);
        case RES_NEWLYMARRIAGE_POINT_GET:
        case RES_NEWLYMARRIAGE_POINT_GET_SUCCESS:
        case RES_NEWLYMARRIAGE_POINT_GET_ERROR:
            return handleAsyncActions(
                RES_NEWLYMARRIAGE_POINT_GET,
                'getNewlyMarriagePoint'
            )(state, action);
        default:
            return state;
    }
}
