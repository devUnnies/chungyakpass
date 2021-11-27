import * as firstInLifeKookminApi from '../../services/api/firstInLifeKookminApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 생애최초 국민 아파트 분양정보 보내기
export const RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST =
    'RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST';
export const RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST_SUCCESS =
    'RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST_SUCCESS';
export const RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST_ERROR =
    'RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST_ERROR';

// 생애최초 국민 순위
export const RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH';
export const RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_SUCCESS =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_SUCCESS';
export const RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_ERROR =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH_ERROR';

// 생애최초 국민 순위 조회
export const RES_FIRSTINLIFE_KOOKMIN_RANK_GET =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_GET';
export const RES_FIRSTINLIFE_KOOKMIN_RANK_GET_SUCCESS =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_GET_SUCCESS';
export const RES_FIRSTINLIFE_KOOKMIN_RANK_GET_ERROR =
    'RES_FIRSTINLIFE_KOOKMIN_RANK_GET_ERROR';

/* Action Creator */
export const postFirstInLifeKookminAptNum = createPromiseThunk(
    RES_FIRSTINLIFE_KOOKMIN_APTNUM_POST,
    firstInLifeKookminApi.postFirstInLifeKookminAptNum
);

export const patchFirstLifeKookminRank = createPromiseThunk(
    RES_FIRSTINLIFE_KOOKMIN_RANK_PATCH,
    firstInLifeKookminApi.patchFirstLifeKookminRank
);

export const getFirstLifeKookminRank = createPromiseThunk(
    RES_FIRSTINLIFE_KOOKMIN_RANK_GET,
    firstInLifeKookminApi.getFirstLifeKookminRank
);
