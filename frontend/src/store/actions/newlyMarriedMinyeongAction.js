import * as newlyMarriedMinyeongApi from '../../services/api/newlyMarriedMinyeongApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 신혼부부 민영 아파트 분양정보 보내기
export const RES_NEWLYMARRIED_MINYEONG_APTNUM_POST =
    'RES_NEWLYMARRIED_MINYEONG_APTNUM_POST';
export const RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_SUCCESS =
    'RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_SUCCESS';
export const RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_ERROR =
    'RES_NEWLYMARRIED_MINYEONG_APTNUM_POST_ERROR';

// 신혼부부 민영 순위
export const RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH =
    'RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH';
export const RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_SUCCESS =
    'RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_SUCCESS';
export const RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_ERROR =
    'RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH_ERROR';

// 신혼부부 민영 순위 조회
export const RES_MEWLY_MARRIED_MINYEONG_RANK_GET =
    'RES_MEWLY_MARRIED_MINYEONG_RANK_GET';
export const RES_MEWLY_MARRIED_MINYEONG_RANK_GET_SUCCESS =
    'RES_MEWLY_MARRIED_MINYEONG_RANK_GET_SUCCESS';
export const RES_MEWLY_MARRIED_MINYEONG_RANK_GET_ERROR =
    'RES_MEWLY_MARRIED_MINYEONG_RANK_GET_ERROR';

/* Action Creator */
export const postNewlyMarriedMinyeongAptNum = createPromiseThunk(
    RES_NEWLYMARRIED_MINYEONG_APTNUM_POST,
    newlyMarriedMinyeongApi.postNewlyMarriedMinyeongAptNum
);

export const patchNewlyMarriedMinyeongRank = createPromiseThunk(
    RES_MEWLY_MARRIED_MINYOENG_RANK_PATCH,
    newlyMarriedMinyeongApi.patchNewlyMarriedMinyeongRank
);

export const getNewlyMarriedMinyeongRank = createPromiseThunk(
    RES_MEWLY_MARRIED_MINYEONG_RANK_GET,
    newlyMarriedMinyeongApi.getNewlyMarriedMinyeongRank
);
