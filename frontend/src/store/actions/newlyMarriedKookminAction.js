import * as newlyMarriedKookminApi from '../../services/api/newlyMarriedKookminApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 신혼부부 국민 아파트 분양정보 보내기
export const RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST =
    'RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST';
export const RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_SUCCESS =
    'RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_SUCCESS';
export const RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_ERROR =
    'RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST_ERROR';

// 신혼부부 공특법 미적용 국민 순위
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH';
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_SUCCESS =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_SUCCESS';
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_ERROR =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH_ERROR';

// 신혼부부 국민 순위 조회(공특법 적용, 미적용 둘 다)
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_GET =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_GET';
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_SUCCESS =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_SUCCESS';
export const RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_ERROR =
    'RES_MEWLY_MARRIED_KOOKMIN_RANK_GET_ERROR';

/* Action Creator */
export const postNewlyMarriedKookminAptNum = createPromiseThunk(
    RES_NEWLYMARRIED_KOOKMIN_APTNUM_POST,
    newlyMarriedKookminApi.postNewlyMarriedKookminAptNum
);

export const patchNewlyMarriedKookminRank = createPromiseThunk(
    RES_MEWLY_MARRIED_KOOKMIN_RANK_PATCH,
    newlyMarriedKookminApi.patchNewlyMarriedKookminRank
);

export const getNewlyMarriedKookminRank = createPromiseThunk(
    RES_MEWLY_MARRIED_KOOKMIN_RANK_GET,
    newlyMarriedKookminApi.getNewlyMarriedKookminRank
);
