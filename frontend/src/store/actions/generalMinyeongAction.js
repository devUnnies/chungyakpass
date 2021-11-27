import * as generalMinyeongApi from '../../services/api/generalMinyeongApi'; // 일반민영Api 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

// 일반 민영 아파트 분양 정보 받아오기
export const RES_GENERAL_MINYEONG_APTNUM_POST =
    'RES_GENERAL_MINYEONG_APTNUM_POST';
export const RES_GENERAL_MINYEONG_APTNUM_POST_SUCCESS =
    'RES_GENERAL_MINYEONG_APTNUM_POST_SUCCESS';
export const RES_GENERAL_MINYEONG_APTNUM_POST_ERROR =
    'RES_GENERAL_MINYEONG_APTNUM_POST_ERROR';

// 일반 민영 순위
export const RES_GENERAL_MINYEONG_RANK_PATCH =
    'RES_GENERAL_MINYEONG_RANK_PATCH';
export const RES_GENERAL_MINYEONG_RANK_PATCH_SUCCESS =
    'RES_GENERAL_MINYEONG_RANK_PATCH_SUCCESS';
export const RES_GENERAL_MINYEONG_RANK_PATCH_ERROR =
    'RES_GENERAL_MINYEONG_RANK_PATCH_ERROR';

// 일반 민영 순위 조회
export const RES_GENERAL_MINYEONG_RANK_GET = 'RES_GENERAL_MINYEONG_RANK_GET';
export const RES_GENERAL_MINYEONG_RANK_GET_SUCCESS =
    'RES_GENERAL_MINYEONG_RANK_GET_SUCCESS';
export const RES_GENERAL_MINYEONG_RANK_GET_ERROR =
    'RES_GENERAL_MINYEONG_RANK_GET_ERROR';

/* Action Creator */
export const postGeneralMinyeongAptNum = createPromiseThunk(
    RES_GENERAL_MINYEONG_APTNUM_POST,
    generalMinyeongApi.postGeneralMinyeongAptNum
);

export const patchGeneralMinyeongRank = createPromiseThunk(
    RES_GENERAL_MINYEONG_RANK_PATCH,
    generalMinyeongApi.patchGeneralMinyeongRank
);

export const getGeneralMinyeongRank = createPromiseThunk(
    RES_GENERAL_MINYEONG_RANK_GET,
    generalMinyeongApi.getGeneralMinyeongRank
);
