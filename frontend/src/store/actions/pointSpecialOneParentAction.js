import * as pointSpecialOneParentApi from '../../services/api/pointSpecialOneParentApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 한부모 아파트 분양정보 보내기
export const RES_ONEPARENT_POINT_APTNUM_POST =
    'RES_ONEPARENT_POINT_APTNUM_POST';
export const RES_ONEPARENT_POINT_APTNUM_POST_SUCCESS =
    'RES_ONEPARENT_POINT_APTNUM_POST_SUCCESS';
export const RES_ONEPARENT_POINT_APTNUM_POST_ERROR =
    'RES_ONEPARENT_POINT_APTNUM_POST_ERROR';
// 한부모 가점 get
export const RES_ONEPARENT_POINT_GET = 'RES_ONEPARENT_POINT_GET';
export const RES_ONEPARENT_POINT_GET_SUCCESS =
    'RES_ONEPARENT_POINT_GET_SUCCESS';
export const RES_ONEPARENT_POINT_GET_ERROR = 'RES_ONEPARENT_POINT_GET_ERROR';

/* Action Creator */
export const postOneParentPointAptNum = createPromiseThunk(
    RES_ONEPARENT_POINT_APTNUM_POST,
    pointSpecialOneParentApi.postOneParentPointAptNum
);
export const getOneParentPoint = createPromiseThunk(
    RES_ONEPARENT_POINT_GET,
    pointSpecialOneParentApi.getOneParentPoint
);
