import {
    // 다자녀 민영 아파트 분양정보 보내기
    RES_MULTICHILD_MINYEONG_APTNUM_POST,
    RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS,
    RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR,
    // 다자녀 민영 순위
    RES_MULTICHILD_MINYEONG_RANK_PATCH,
    RES_MULTICHILD_MINYEONG_RANK_PATCH_SUCCESS,
    RES_MULTICHILD_MINYEONG_RANK_PATCH_ERROR,
    // 다자녀 민영 순위 조회
    RES_MULTICHILD_MINYEONG_RANK_GET,
    RES_MULTICHILD_MINYEONG_RANK_GET_SUCCESS,
    RES_MULTICHILD_MINYEONG_RANK_GET_ERROR,
} from '../actions/multiChildMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postMultiChildMinyeongAptNum: reducerUtils.initial(),
    patchMultiChildMinyeongRank: reducerUtils.initial(),
    getMultiChildMinyeongRank: reducerUtils.initial(),
};

export default function multiChildMinyeong(state = initialState, action) {
    switch (action.type) {
        case RES_MULTICHILD_MINYEONG_APTNUM_POST:
        case RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS:
        case RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_MINYEONG_APTNUM_POST,
                'postMultiChildMinyeongAptNum'
            )(state, action);
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
