import {
    // 신혼부부 민영 아파트 분양정보 post
    RES_NEWLYMARRIED_MINYEONG_APTNUM_POST,
    RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_SUCCESS,
    RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_ERROR,
    // 신혼부부 민영 순위
    RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH,
    RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_SUCCESS,
    RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_ERROR,
    // 신혼부부 민영 순위 조회
    RES_MEWLY_MARRIED_MINYEONG_RANK_GET,
    RES_MEWLY_MARRIED_MINYEONG_RANK_GET_SUCCESS,
    RES_MEWLY_MARRIED_MINYEONG_RANK_GET_ERROR,
} from '../actions/newlyMarriedMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postNewlyMarriedMinyeongAptNum: reducerUtils.initial(),
    patchNewlyMarriedMinyeongRank: reducerUtils.initial(),
    getNewlyMarriedMinyeongRank: reducerUtils.initial(),
};

export default function newlyMarriedMinyeong(state = initialState, action) {
    switch (action.type) {
        case RES_NEWLYMARRIED_MINYEONG_APTNUM_POST:
        case RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_SUCCESS:
        case RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_NEWLYMARRIED_MINYEONG_APTNUM_POST,
                'postNewlyMarriedMinyeongAptNum'
            )(state, action);
        case RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH:
        case RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_SUCCESS:
        case RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH,
                'patchNewlyMarriedMinyeongRank'
            )(state, action);
        case RES_MEWLY_MARRIED_MINYEONG_RANK_GET:
        case RES_MEWLY_MARRIED_MINYEONG_RANK_GET_SUCCESS:
        case RES_MEWLY_MARRIED_MINYEONG_RANK_GET_ERROR:
            return handleAsyncActions(
                RES_MEWLY_MARRIED_MINYEONG_RANK_GET,
                'getNewlyMarriedMinyeongRank'
            )(state, action);
        default:
            return state;
    }
}
