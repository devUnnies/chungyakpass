import {
    // 다자녀 아파트 분양정보 post
    RES_MULTICHILD_POINT_APTNUM_POST,
    RES_MULTICHILD_POINT_APTNUM_POST_SUCCESS,
    RES_MULTICHILD_POINT_APTNUM_POST_ERROR,
    // 다자녀 가점 get
    RES_MULTICHILD_POINT_GET,
    RES_MULTICHILD_POINT_GET_SUCCESS,
    RES_MULTICHILD_POINT_GET_ERROR,
} from '../actions/pointSpecialMultiChildAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    postMultiChildPointAptNum: reducerUtils.initial(),
    getMultiChildPoint: reducerUtils.initial(),
};

export default function multiChildPoint(state = initialState, action) {
    switch (action.type) {
        case RES_MULTICHILD_POINT_APTNUM_POST:
        case RES_MULTICHILD_POINT_APTNUM_POST_SUCCESS:
        case RES_MULTICHILD_POINT_APTNUM_POST_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_POINT_APTNUM_POST,
                'postMultiChildPointAptNum'
            )(state, action);
        case RES_MULTICHILD_POINT_GET:
        case RES_MULTICHILD_POINT_GET_SUCCESS:
        case RES_MULTICHILD_POINT_GET_ERROR:
            return handleAsyncActions(
                RES_MULTICHILD_POINT_GET,
                'getMultiChildPoint'
            )(state, action);
        default:
            return state;
    }
}
