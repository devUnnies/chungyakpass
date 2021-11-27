import * as oldParentMinyeongApi from '../../services/api/oldParentMinyeongApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 다자녀 민영 아파트 분양정보 보내기
export const RES_OLDPARENT_MINYEONG_APTNUM_POST =
    'RES_OLDPARENT_MINYEONG_APTNUM_POST';
export const RES_OLDPARENT_MINYEONG_APTNUM_POST_SUCCESS =
    'RES_OLDPARENT_MINYEONG_APTNUM_POST_SUCCESS';
export const RES_OLDPARENT_MINYEONG_APTNUM_POST_ERROR =
    'RES_OLDPARENT_MINYEONG_APTNUM_POST_ERROR';

// 노부모 민영 순위
export const RES_OLDPARENT_MINYEONG_RANK_PATCH =
    'RES_OLDPARENT_MINYEONG_RANK_PATCH';
export const RES_OLDPARENT_MINYEONG_RANK_PATCH_SUCCESS =
    'RES_OLDPARENT_MINYEONG_RANK_PATCH_SUCCESS';
export const RES_OLDPARENT_MINYEONG_RANK_PATCH_ERROR =
    'RES_OLDPARENT_MINYEONG_RANK_PATCH_ERROR';

// 노부모 국민 순위 조회
export const RES_OLDPARENT_MINYEONG_RANK_GET =
    'RES_OLDPARENT_MINYEONG_RANK_GET';
export const RES_OLDPARENT_MINYEONG_RANK_GET_SUCCESS =
    'RES_OLDPARENT_MINYEONG_RANK_GET_SUCCESS';
export const RES_OLDPARENT_MINYEONG_RANK_GET_ERROR =
    'RES_OLDPARENT_MINYEONG_RANK_GET_ERROR';

/* Action Creator */
export const postOldParentMinyeongAptNum = createPromiseThunk(
    RES_OLDPARENT_MINYEONG_APTNUM_POST,
    oldParentMinyeongApi.postOldParentMinyeongAptNum
);

export const patchOldParentMinyeongRank = createPromiseThunk(
    RES_OLDPARENT_MINYEONG_RANK_PATCH,
    oldParentMinyeongApi.patchOldParentMinyeongRank
);

export const getOldParentMinyeongRank = createPromiseThunk(
    RES_OLDPARENT_MINYEONG_RANK_GET,
    oldParentMinyeongApi.getOldParentMinyeongRank
);
