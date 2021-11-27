import {
    // 신혼부부 국민 공특법 적용 아파트 분양정보 post
    RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST,
    RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_SUCCESS,
    RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_ERROR,
    // 신혼부부 공특법 적용 국민 순위
    RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH,
    RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_SUCCESS,
    RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_ERROR,
} from '../actions/newlyMarriedKookminSpecialAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postNewlyMarriedKookminSpecialAptNum: reducerUtils.initial(),
    patchNewlyMarriedKookminSpecialRank: reducerUtils.initial(),
};

export default function newlyMarriedKookminSpecial(
    state = initialState,
    action
) {
    switch (action.type) {
        case RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST:
        case RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_SUCCESS:
        case RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST,
                'postNewlyMarriedKookminSpecialAptNum'
            )(state, action);
        case RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH:
        case RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_SUCCESS:
        case RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_ERROR:
            return handleAsyncActions(
                RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH,
                'patchNewlyMarriedKookminSpecialRank'
            )(state, action);
        default:
            return state;
    }
}
