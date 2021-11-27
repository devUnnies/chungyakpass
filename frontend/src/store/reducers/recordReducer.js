import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';
import {
    ALL_RECORDS_GET,
    ALL_RECORDS_GET_ERROR,
    ALL_RECORDS_GET_SUCCESS,
    POINT_ALL_RECORDS_GET,
    POINT_ALL_RECORDS_GET_ERROR,
    POINT_ALL_RECORDS_GET_SUCCESS,
} from '../actions/recordAction';

const initialState = {
    getAllRecords: reducerUtils.initial(),
    getPointAllRecords: reducerUtils.initial(),
};

export default function records(state = initialState, action) {
    switch (action.type) {
        case ALL_RECORDS_GET:
        case ALL_RECORDS_GET_SUCCESS:
        case ALL_RECORDS_GET_ERROR:
            return handleAsyncActions(ALL_RECORDS_GET, 'getAllRecords')(
                state,
                action
            );
        case POINT_ALL_RECORDS_GET:
        case POINT_ALL_RECORDS_GET_SUCCESS:
        case POINT_ALL_RECORDS_GET_ERROR:
            return handleAsyncActions(
                POINT_ALL_RECORDS_GET,
                'getPointAllRecords'
            )(state, action);
        default:
            return state;
    }
}
