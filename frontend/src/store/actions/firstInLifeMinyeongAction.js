import * as firstInLifeMinyeongApi from '../../services/api/firstInLifeMinyeongApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 생애최초 민영 아파트 분양정보 보내기
export const RES_FIRSTINLIFE_MINYOENG_APTNUM_POST =
    'RES_FIRSTINLIFE_MINYOENG_APTNUM_POST';
export const RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_SUCCESS =
    'RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_SUCCESS';
export const RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_ERROR =
    'RES_FIRSTINLIFE_MINYOENG_APTNUM_POST_ERROR';

// 생애최초 민영 순위
export const RES_FIRSTINLIFE_MINYEONG_RANK_PATCH =
    'RES_FIRSTINLIFE_MINYEONG_RANK_PATCH';
export const RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_SUCCESS =
    'RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_SUCCESS';
export const RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_ERROR =
    'RES_FIRSTINLIFE_MINYEONG_RANK_PATCH_ERROR';

// 생애최초 민영 순위 조회
export const RES_FIRSTINLIFE_MINYEONG_RANK_GET =
    'RES_FIRSTINLIFE_MINYEONG_RANK_GET';
export const RES_FIRSTINLIFE_MINYEONG_RANK_GET_SUCCESS =
    'RES_FIRSTINLIFE_MINYEONG_RANK_GET_SUCCESS';
export const RES_FIRSTINLIFE_MINYEONG_RANK_GET_ERROR =
    'RES_FIRSTINLIFE_MINYEONG_RANK_GET_ERROR';

/* Action Creator */
export const postFirstInLifeMinyeongAptNum = createPromiseThunk(
    RES_FIRSTINLIFE_MINYOENG_APTNUM_POST,
    firstInLifeMinyeongApi.postFirstInLifeMinyeongAptNum
);

export const patchFirstLifeMinyeongRank = createPromiseThunk(
    RES_FIRSTINLIFE_MINYEONG_RANK_PATCH,
    firstInLifeMinyeongApi.patchFirstLifeMinyeongRank
);

export const getFirstLifeMinyeongRank = createPromiseThunk(
    RES_FIRSTINLIFE_MINYEONG_RANK_GET,
    firstInLifeMinyeongApi.getFirstLifeMinyeongRank
);
