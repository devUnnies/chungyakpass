import * as pointSpecialMultiChildApi from '../../services/api/pointSpecialMultiChildApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 다자녀 아파트 분양정보 보내기
export const RES_MULTICHILD_POINT_APTNUM_POST =
    'RES_MULTICHILD_POINT_APTNUM_POST';
export const RES_MULTICHILD_POINT_APTNUM_POST_SUCCESS =
    'RES_MULTICHILD_POINT_APTNUM_POST_SUCCESS';
export const RES_MULTICHILD_POINT_APTNUM_POST_ERROR =
    'RES_MULTICHILD_POINT_APTNUM_POST_ERROR';

// 다자녀 가점 get
export const RES_MULTICHILD_POINT_GET = 'RES_MULTICHILD_POINT_GET';
export const RES_MULTICHILD_POINT_GET_SUCCESS =
    'RES_MULTICHILD_POINT_GET_SUCCESS';
export const RES_MULTICHILD_POINT_GET_ERROR = 'RES_MULTICHILD_POINT_GET_ERROR';

/* Action Creator */
export const postMultiChildPointAptNum = createPromiseThunk(
    RES_MULTICHILD_POINT_APTNUM_POST,
    pointSpecialMultiChildApi.postMultiChildPointAptNum
);
export const getMultiChildPoint = createPromiseThunk(
    RES_MULTICHILD_POINT_GET,
    pointSpecialMultiChildApi.getMultiChildPoint
);
