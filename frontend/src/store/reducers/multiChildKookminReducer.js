import {
    // 다자녀 국민 아파트 분양정보 post
    RES_MULTICHILD_KOOKMIN_APTNUM_POST,
    RES_MULTICHILD_KOOKMIN_APTNUM_POST_SUCCESS,
    RES_MULTICHILD_KOOKMIN_APTNUM_POST_ERROR,
    // 다자녀 국민 순위
    RES_MULTICHILD_KOOKMIN_RANK_PATCH,
    RES_MULTICHILD_KOOKMIN_RANK_PATCH_SUCCESS,
    RES_MULTICHILD_KOOKMIN_RANK_PATCH_ERROR,
    // 다자녀 국민 순위 조회
    RES_MULTICHILD_KOOKMIN_RANK_GET,
    RES_MULTICHILD_KOOKMIN_RANK_GET_SUCCESS,
    RES_MULTICHILD_KOOKMIN_RANK_GET_ERROR,
} from '../actions/multiChildKookminAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postMultiChildKookminAptNum: reducerUtils.initial(),
    patchMultiChildKookminRank: reducerUtils.initial(),
    getMultiChildKookminRank: reducerUtils.initial(),
};

export default function multiChildKookmin(state = initialState, action) {
    switch (action.type) {
        case RES_MULTICHILD_KOOKMIN_APTNUM_POST:
        case RES_MULTICHILD_KOOKMIN_APTNUM_POST_SUCCESS:
        case RES_MULTICHILD_KOOKMIN_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_KOOKMIN_APTNUM_POST,
                'postMultiChildKookminAptNum'
            )(state, action);
        case RES_MULTICHILD_KOOKMIN_RANK_PATCH:
        case RES_MULTICHILD_KOOKMIN_RANK_PATCH_SUCCESS:
        case RES_MULTICHILD_KOOKMIN_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_KOOKMIN_RANK_PATCH,
                'patchMultiChildKookminRank'
            )(state, action);
        case RES_MULTICHILD_KOOKMIN_RANK_GET:
        case RES_MULTICHILD_KOOKMIN_RANK_GET_SUCCESS:
        case RES_MULTICHILD_KOOKMIN_RANK_GET_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_KOOKMIN_RANK_GET,
                'getMultiChildKookminRank'
            )(state, action);
        default:
            return state;
    }
}
