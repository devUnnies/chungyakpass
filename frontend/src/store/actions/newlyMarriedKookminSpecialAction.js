import * as newlyMarriedKookminSpecialApi from '../../services/api/newlyMarriedKookminSpecialApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 신혼부부 국민 공특법 적용 아파트 분양정보 보내기
export const RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST =
    'RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST';
export const RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_SUCCESS =
    'RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_SUCCESS';
export const RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_ERROR =
    'RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST_ERROR';

// 신혼부부 공특법 적용 국민 순위
export const RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH =
    'RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH';
export const RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_SUCCESS =
    'RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_SUCCESS';
export const RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_ERROR =
    'RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH_ERROR';

/* Action Creator */
export const postNewlyMarriedKookminSpecialAptNum = createPromiseThunk(
    RES_NEWLYMARRIED_KOOKMIN_SPECIAL_APTNUM_POST,
    newlyMarriedKookminSpecialApi.postNewlyMarriedKookminSpecialAptNum
);

export const patchNewlyMarriedKookminSpecialRank = createPromiseThunk(
    RES_MEWLY_MARRIED_KOOKMIN_SPECIAL_RANK_PATCH,
    newlyMarriedKookminSpecialApi.patchNewlyMarriedKookminSpecialRank
);
