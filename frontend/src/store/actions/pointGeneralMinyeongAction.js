import * as pointGeneralMinyeongApi from '../../services/api/pointGeneralMinyeongApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 일반 민영 가점
export const RES_GENERAL_MINYEONG_POINT_POST =
    'RES_GENERAL_MINYEONG_POINT_POST';
export const RES_GENERAL_MINYEONG_POINT_POST_SUCCESS =
    'RES_GENERAL_MINYEONG_POINT_POST_SUCCESS';
export const RES_GENERAL_MINYEONG_POINT_POST_ERROR =
    'RES_GENERAL_MINYEONG_POINT_POST_ERROR';

// 일반 민영 가점 get
export const RES_GENERAL_MINYEONG_POINT_GET = 'RES_GENERAL_MINYEONG_POINT_GET';
export const RES_GENERAL_MINYEONG_POINT_GET_SUCCESS =
    'RES_GENERAL_MINYEONG_POINT_GET_SUCCESS';
export const RES_GENERAL_MINYEONG_POINT_GET_ERROR =
    'RES_GENERAL_MINYEONG_POINT_GET_ERROR';

/* Action Creator */
export const postGeneralMinyeongPoint = createPromiseThunk(
    RES_GENERAL_MINYEONG_POINT_POST,
    pointGeneralMinyeongApi.postGeneralMinyeongPoint
);
export const getGeneralMinyeongPoint = createPromiseThunk(
    RES_GENERAL_MINYEONG_POINT_GET,
    pointGeneralMinyeongApi.getGeneralMinyeongPoint
);
