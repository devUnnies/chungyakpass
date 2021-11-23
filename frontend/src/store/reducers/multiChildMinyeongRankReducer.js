import {
    // 다자녀 민영 순위
    RES_MULTICHILD_MINYEONG_RANK_PATCH,
    RES_MULTICHILD_MINYEONG_RANK_PATCH_SUCCESS,
    RES_MULTICHILD_MINYEONG_RANK_PATCH_ERROR,
    // 다자녀 민영 순위 조회
    RES_MULTICHILD_MINYEONG_RANK_GET,
    RES_MULTICHILD_MINYEONG_RANK_GET_SUCCESS,
    RES_MULTICHILD_MINYEONG_RANK_GET_ERROR,
} from '../actions/multiChildMinyeongRankAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    patchMultiChildMinyeongRank: reducerUtils.initial(),
    getMultiChildMinyeongRank: reducerUtils.initial(),
};

export default function multiChildMinyeongRank(state = initialState, action) {
    switch (action.type) {
        case RES_MULTICHILD_MINYEONG_RANK_PATCH:
        case RES_MULTICHILD_MINYEONG_RANK_PATCH_SUCCESS:
        case RES_MULTICHILD_MINYEONG_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_MINYEONG_RANK_PATCH,
                'patchMultiChildMinyeongRank'
            )(state, action);
        case RES_MULTICHILD_MINYEONG_RANK_GET:
        case RES_MULTICHILD_MINYEONG_RANK_GET_SUCCESS:
        case RES_MULTICHILD_MINYEONG_RANK_GET_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_MINYEONG_RANK_GET,
                'getMultiChildMinyeongRank'
            )(state, action);
        default:
            return state;
    }
}
