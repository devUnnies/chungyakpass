import * as pointSpecialOldParentApi from '../../services/api/pointSpecialOldParentApi';
import { createPromiseThunk } from '../../services/api/asyncUtils';

/* 액션 타입 */
// 노부모 필요 정보 보내기
export const RES_OLDPARENT_POINT_POST = 'RES_OLDPARENT_POINT_POST';
export const RES_OLDPARENT_POINT_POST_SUCCESS =
    'RES_OLDPARENT_POINT_POST_SUCCESS';
export const RES_OLDPARENT_POINT_POST_ERROR = 'RES_OLDPARENT_POINT_POST_ERROR';

// 노부모 가점 get
export const RES_OLDPARENT_POINT_GET = 'RES_OLDPARENT_POINT_GET';
export const RES_OLDPARENT_POINT_GET_SUCCESS =
    'RES_OLDPARENT_POINT_GET_SUCCESS';
export const RES_OLDPARENT_POINT_GET_ERROR = 'RES_OLDPARENT_POINT_GET_ERROR';

/* Action Creator */
export const postOldParentPoint = createPromiseThunk(
    RES_OLDPARENT_POINT_POST,
    pointSpecialOldParentApi.postOldParentPoint
);
export const getOldParentPoint = createPromiseThunk(
    RES_OLDPARENT_POINT_GET_ERROR,
    pointSpecialOldParentApi.getOldParentPoint
);
