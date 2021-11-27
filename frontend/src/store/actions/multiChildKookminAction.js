import * as multiChildKookminApi from '../../services/api/multiChildKookminApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 다자녀 민영 아파트 분양정보 보내기
export const RES_MULTICHILD_KOOKMIN_APTNUM_POST =
    'RES_MULTICHILD_KOOKMIN_APTNUM_POST';
export const RES_MULTICHILD_KOOKMIN_APTNUM_POST_SUCCESS =
    'RES_MULTICHILD_KOOKMIN_APTNUM_POST_SUCCESS';
export const RES_MULTICHILD_KOOKMIN_APTNUM_POST_ERROR =
    'RES_MULTICHILD_KOOKMIN_APTNUM_POST_ERROR';

// 다자녀 국민 순위
export const RES_MULTICHILD_KOOKMIN_RANK_PATCH =
    'RES_MULTICHILD_KOOKMIN_RANK_PATCH';
export const RES_MULTICHILD_KOOKMIN_RANK_PATCH_SUCCESS =
    'RES_MULTICHILD_KOOKMIN_RANK_PATCH_SUCCESS';
export const RES_MULTICHILD_KOOKMIN_RANK_PATCH_ERROR =
    'RES_MULTICHILD_KOOKMIN_RANK_PATCH_ERROR';

// 다자녀 국민 순위 조회
export const RES_MULTICHILD_KOOKMIN_RANK_GET =
    'RES_MULTICHILD_KOOKMIN_RANK_GET';
export const RES_MULTICHILD_KOOKMIN_RANK_GET_SUCCESS =
    'RES_MULTICHILD_KOOKMIN_RANK_GET_SUCCESS';
export const RES_MULTICHILD_KOOKMIN_RANK_GET_ERROR =
    'RES_MULTICHILD_KOOKMIN_RANK_GET_ERROR';

/* Action Creator */
export const postMultiChildKookminAptNum = createPromiseThunk(
    RES_MULTICHILD_KOOKMIN_APTNUM_POST,
    multiChildKookminApi.postMultiChildKookminAptNum
);

export const patchMultiChildKookminRank = createPromiseThunk(
    RES_MULTICHILD_KOOKMIN_RANK_PATCH,
    multiChildKookminApi.patchMultiChildKookminRank
);

export const getMultiChildKookminRank = createPromiseThunk(
    RES_MULTICHILD_KOOKMIN_RANK_GET,
    multiChildKookminApi.getMultiChildKookminRank
);
