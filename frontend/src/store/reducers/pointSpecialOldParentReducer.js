import {
    // 노부모 정보 post
    RES_OLDPARENT_POINT_POST,
    RES_OLDPARENT_POINT_POST_SUCCESS,
    RES_OLDPARENT_POINT_POST_ERROR,
    // 노부모 가점 get
    RES_OLDPARENT_POINT_GET,
    RES_OLDPARENT_POINT_GET_SUCCESS,
    RES_OLDPARENT_POINT_GET_ERROR,
} from '../actions/pointSpecialOldParentAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postOldParentPoint: reducerUtils.initial(),
    getOldParentPoint: reducerUtils.initial(),
};

export default function oldParentPoint(state = initialState, action) {
    switch (action.type) {
        case RES_OLDPARENT_POINT_POST:
        case RES_OLDPARENT_POINT_POST_SUCCESS:
        case RES_OLDPARENT_POINT_POST_ERROR:
            return handleAsyncActions(
                RES_OLDPARENT_POINT_POST,
                'postOldParentPoint'
            )(state, action);
        case RES_OLDPARENT_POINT_GET:
        case RES_OLDPARENT_POINT_GET_SUCCESS:
        case RES_OLDPARENT_POINT_GET_ERROR:
            return handleAsyncActions(
                RES_OLDPARENT_POINT_GET,
                'getOldParentPoint'
            )(state, action);
        default:
            return state;
    }
}
