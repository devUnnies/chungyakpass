import {
    // 노부모 민영 아파트 분양정보 보내기
    RES_FIRSTINLIFE_MINYOENG_APTNUM_POST,
    RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_SUCCESS,
    RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_ERROR,
    // 생애최초 민영 순위
    RES_FIRSTINLIFE_MINYEONG_RANK_PATCH,
    RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_SUCCESS,
    RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_ERROR,
    // 생애최초 민영 순위 조회
    RES_FIRSTINLIFE_MINYEONG_RANK_GET,
    RES_FIRSTINLIFE_MINYEONG_RANK_GET_SUCCESS,
    RES_FIRSTINLIFE_MINYEONG_RANK_GET_ERROR,
} from '../actions/firstInLifeMinyeongAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postFirstInLifeMinyeongAptNum: reducerUtils.initial(),
    patchFirstLifeMinyeongRank: reducerUtils.initial(),
    getFirstLifeMinyeongRank: reducerUtils.initial(),
};

export default function firstInLifeMinyeong(state = initialState, action) {
    switch (action.type) {
        case RES_FIRSTINLIFE_MINYOENG_APTNUM_POST:
        case RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_SUCCESS:
        case RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_FIRSTINLIFE_MINYOENG_APTNUM_POST,
                'postFirstInLifeMinyeongAptNum'
            )(state, action);
        case RES_FIRSTINLIFE_MINYEONG_RANK_PATCH:
        case RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_SUCCESS:
        case RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_FIRSTINLIFE_MINYEONG_RANK_PATCH,
                'patchFirstLifeMinyeongRank'
            )(state, action);
        case RES_FIRSTINLIFE_MINYEONG_RANK_GET:
        case RES_FIRSTINLIFE_MINYEONG_RANK_GET_SUCCESS:
        case RES_FIRSTINLIFE_MINYEONG_RANK_GET_ERROR:
            return handleAsyncActions(
                RES_FIRSTINLIFE_MINYEONG_RANK_GET,
                'getFirstLifeMinyeongRank'
            )(state, action);
        default:
            return state;
    }
}
