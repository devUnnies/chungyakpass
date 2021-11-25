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

/* Action Creator */
export const postNewlyMarriedMinyeongAptNum = createPromiseThunk(
    RES_NEWLYMARRIED_MINYEONG_APTNUM_POST,
    newlyMarriedMinyeongApi.postNewlyMarriedMinyeongAptNum
);