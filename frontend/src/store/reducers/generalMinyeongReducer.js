import {
    // 민영 아파트 분양정보 불러오기
    RES_GENERAL_MINYEONG_APTNUM_POST,
    RES_GENERAL_MINYEONG_APTNUM_POST_SUCCESS,
    RES_GENERAL_MINYEONG_APTNUM_POST_ERROR,
    // 일반 민영 순위
    RES_GENERAL_MINYEONG_RANK_PATCH,
    RES_GENERAL_MINYEONG_RANK_PATCH_SUCCESS,
    RES_GENERAL_MINYEONG_RANK_PATCH_ERROR,
    // 일반 민영 순위 조회
    RES_GENERAL_MINYEONG_RANK_GET,
    RES_GENERAL_MINYEONG_RANK_GET_SUCCESS,
    RES_GENERAL_MINYEONG_RANK_GET_ERROR,
} from '../actions/generalMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postGeneralMinyeongAptNum: reducerUtils.initial(),
    patchGeneralMinyeongRank: reducerUtils.initial(),
    getGeneralMinyeongRank: reducerUtils.initial(),
};

export default function generalMinyeong(state = initialState, action) {
    switch (action.type) {
        case RES_GENERAL_MINYEONG_APTNUM_POST:
        case RES_GENERAL_MINYEONG_APTNUM_POST_SUCCESS:
        case RES_GENERAL_MINYEONG_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_GENERAL_MINYEONG_APTNUM_POST,
                'postGeneralMinyeongAptNum'
            )(state, action);
        case RES_GENERAL_MINYEONG_RANK_PATCH:
        case RES_GENERAL_MINYEONG_RANK_PATCH_SUCCESS:
        case RES_GENERAL_MINYEONG_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_GENERAL_MINYEONG_RANK_PATCH,
                'patchGeneralMinyeongRank'
            )(state, action);
        case RES_GENERAL_MINYEONG_RANK_GET:
        case RES_GENERAL_MINYEONG_RANK_GET_SUCCESS:
        case RES_GENERAL_MINYEONG_RANK_GET_ERROR:
            return handleAsyncActions(
                RES_GENERAL_MINYEONG_RANK_GET,
                'getGeneralMinyeongRank'
            )(state, action);
        default:
            return state;
    }
}
