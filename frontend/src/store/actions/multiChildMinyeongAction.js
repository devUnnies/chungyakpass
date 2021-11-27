import * as multiChildMinyeongApi from '../../services/api/multiChildMinyeongApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 다자녀 민영 아파트 분양정보 보내기
export const RES_MULTICHILD_MINYEONG_APTNUM_POST =
    'RES_MULTICHILD_MINYEONG_APTNUM_POST';
export const RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS =
    'RES_MULTICHILD_MINYEONG_APTNUM_POST_SUCCESS';
export const RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR =
    'RES_MULTICHILD_MINYEONG_APTNUM_POST_ERROR';

// 다자녀 민영 순위
export const RES_MULTICHILD_MINYEONG_RANK_PATCH =
    'RES_MULTICHILD_MINYEONG_RANK_PATCH';
export const RES_MULTICHILD_MINYEONG_RANK_PATCH_SUCCESS =
    'RES_MULTICHILD_MINYEONG_RANK_PATCH_SUCCESS';
export const RES_MULTICHILD_MINYEONG_RANK_PATCH_ERROR =
    'RES_MULTICHILD_MINYEONG_RANK_PATCH_ERROR';

// 다자녀 민영 순위 조회
export const RES_MULTICHILD_MINYEONG_RANK_GET =
    'RES_MULTICHILD_MINYEONG_RANK_GET';
export const RES_MULTICHILD_MINYEONG_RANK_GET_SUCCESS =
    'RES_MULTICHILD_MINYEONG_RANK_GET_SUCCESS';
export const RES_MULTICHILD_MINYEONG_RANK_GET_ERROR =
    'RES_MULTICHILD_MINYEONG_RANK_GET_ERROR';

/* Action Creator */
export const postMultiChildMinyeongAptNum = createPromiseThunk(
    RES_MULTICHILD_MINYEONG_APTNUM_POST,
    multiChildMinyeongApi.postMultiChildMinyeongAptNum
);

export const patchMultiChildMinyeongRank = createPromiseThunk(
    RES_MULTICHILD_MINYEONG_RANK_PATCH,
    multiChildMinyeongApi.patchMultiChildMinyeongRank
);

export const getMultiChildMinyeongRank = createPromiseThunk(
    RES_MULTICHILD_MINYEONG_RANK_GET,
    multiChildMinyeongApi.getMultiChildMinyeongRank
);
