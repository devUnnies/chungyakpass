import {
    // 신혼부부 국민 아파트 분양정보 post
    RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST,
    RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_SUCCESS,
    RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_ERROR,
    // 신혼부부 공특법 미적용 국민 순위
    RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH,
    RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_SUCCESS,
    RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_ERROR,
    // 신혼부부 국민 순위
    RES_MEWLY_MARRIED_KOOKMIN_RANK_GET,
    RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_SUCCESS,
    RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_ERROR,
} from '../actions/newlyMarriedKookminAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postNewlyMarriedKookminAptNum: reducerUtils.initial(),
    patchNewlyMarriedKookminRank: reducerUtils.initial(),
    getNewlyMarriedKookminRank: reducerUtils.initial(),
};

export default function newlyMarriedKookmin(state = initialState, action) {
    switch (action.type) {
        case RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST:
        case RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_SUCCESS:
        case RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST,
                'postNewlyMarriedKookminAptNum'
            )(state, action);
        case RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH:
        case RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_SUCCESS:
        case RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH,
                'patchNewlyMarriedKookminRank'
            )(state, action);
        case RES_MEWLY_MARRIED_KOOKMIN_RANK_GET:
        case RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_SUCCESS:
        case RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_ERROR:
            return handleAsyncActions(
                RES_MEWLY_MARRIED_KOOKMIN_RANK_GET,
                'getNewlyMarriedKookminRank'
            )(state, action);
        default:
            return state;
    }
}
