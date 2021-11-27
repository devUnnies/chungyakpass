import {
    ADD_HOUSE_POST,
    ADD_HOUSE_POST_SUCCESS,
    ADD_HOUSE_POST_ERROR,
    MOD_HOUSE_PUT,
    MOD_HOUSE_PUT_SUCCESS,
    MOD_HOUSE_PUT_ERROR,
    DEL_HOUSE_DELETE,
    DEL_HOUSE_DELETE_SUCCESS,
    DEL_HOUSE_DELETE_ERROR,
    ADD_BANKBOOK_POST,
    ADD_BANKBOOK_POST_SUCCESS,
    ADD_BANKBOOK_POST_ERROR,
    MOD_BANKBOOK_PUT,
    MOD_BANKBOOK_PUT_SUCCESS,
    MOD_BANKBOOK_PUT_ERROR,
    DEL_BANKBOOK_DELETE,
    DEL_BANKBOOK_DELETE_SUCCESS,
    DEL_BANKBOOK_DELETE_ERROR,
    ADD_MEMBER_POST,
    ADD_MEMBER_POST_SUCCESS,
    ADD_MEMBER_POST_ERROR,
    HOUSE_HOLDER_PATCH,
    HOUSE_HOLDER_PATCH_SUCCESS,
    HOUSE_HOLDER_PATCH_ERROR,
    MOD_MEMBER_PUT,
    MOD_MEMBER_PUT_SUCCESS,
    MOD_MEMBER_PUT_ERROR,
    DEL_MEMBER_DELETE,
    DEL_MEMBER_DELETE_SUCCESS,
    DEL_MEMBER_DELETE_ERROR,
    ADD_CHUNGYAK_POST,
    ADD_CHUNGYAK_POST_SUCCESS,
    ADD_CHUNGYAK_POST_ERROR,
    ADD_CHUNGYAK_RESTR_POST,
    ADD_CHUNGYAK_RESTR_POST_SUCCESS,
    ADD_CHUNGYAK_RESTR_POST_ERROR,
    ADD_ASSETS_POST,
    ADD_ASSETS_POST_SUCCESS,
    ADD_ASSETS_POST_ERROR,
    MOD_ASSETS_PUT,
    MOD_ASSETS_PUT_SUCCESS,
    MOD_ASSETS_PUT_ERROR,
    MOD_CHUNGYAK_PUT,
    MOD_CHUNGYAK_PUT_SUCCESS,
    MOD_CHUNGYAK_PUT_ERROR,
    MOD_CHUNGYAK_RESTR_PUT,
    MOD_CHUNGYAK_RESTR_PUT_SUCCESS,
    MOD_CHUNGYAK_RESTR_PUT_ERROR,
    ADD_MEMBER_DELETE,
    HOMELESS_START_DATE_PATCH_SUCCESS,
    HOMELESS_START_DATE_PATCH,
    HOMELESS_START_DATE_PATCH_ERROR,
    HOUSE_GET,
    HOUSE_GET_SUCCESS,
    HOUSE_GET_ERROR,
    MEMBER_GET,
    MEMBER_GET_SUCCESS,
    MEMBER_GET_ERROR,
    ADD_HOUSE_POST_DELETE,
    MOD_HOUSE_PUT_DELETE,
    MOD_MEMBER_DELETE,
    CHUNGYAK_GET,
    CHUNGYAK_GET_SUCCESS,
    CHUNGYAK_GET_ERROR,
    ADD_CHUNGYAK_DELETE,
    MOD_CHUNGYAK_DELETE,
    ADD_CHUNGYAK_RESTR_DELETE,
    MOD_CHUNGYAK_RESTR_DELETE,
    DEL_CHUNGYAK_DELETE,
    DEL_CHUNGYAK_DELETE_SUCCESS,
    DEL_CHUNGYAK_DELETE_ERROR,
    DEL_CHUNGYAK_RESTR_DELETE,
    DEL_CHUNGYAK_RESTR_DELETE_SUCCESS,
    DEL_CHUNGYAK_RESTR_DELETE_ERROR,
    ASSETS_GET,
    ASSETS_GET_SUCCESS,
    ASSETS_GET_ERROR,
    ADD_ASSETS_POST_DELETE,
    MOD_ASSETS_PUT_DELETE,
    DEL_ASSETS_DELETE,
    DEL_ASSETS_DELETE_SUCCESS,
    DEL_ASSETS_DELETE_ERROR,
    BANKBOOK_GET,
    BANKBOOK_GET_SUCCESS,
    BANKBOOK_GET_ERROR,
    ADD_BANKBOOK_POST_DELETE,
    MOD_BANKBOOK_PUT_DELETE,
    HOUSE_GET_DELETE,
    BANKBOOK_GET_DELETE,
    DEL_HOUSE_DELETE_DELETE,
    ADD_MEMBER_ADD_INFO_POST,
    ADD_MEMBER_ADD_INFO_POST_SUCCESS,
    ADD_MEMBER_ADD_INFO_POST_ERROR,
    ADD_MEMBER_ADD_INFO_POST_DELETE,
    MOD_MEMBER_ADD_INFO_PUT,
    MOD_MEMBER_ADD_INFO_PUT_SUCCESS,
    MOD_MEMBER_ADD_INFO_PUT_ERROR,
    MOD_MEMBER_ADD_INFO_PUT_DELETE,
    DEL_MEMBER_ADD_INFO_DELETE,
    DEL_MEMBER_ADD_INFO_DELETE_SUCCESS,
    DEL_MEMBER_ADD_INFO_DELETE_ERROR,
    DEL_MEMBER_ADD_INFO_DELETE_DELETE,
} from '../actions/commonInfoAction';
import {
    reducerUtils,
    handleAsyncActions,
} from '../../services/api/asyncUtils';

const initialState = {
    getHouse: reducerUtils.initial(),
    addHouse: reducerUtils.initial(),
    modHouse: reducerUtils.initial(),
    delHouse: reducerUtils.initial(),
    getBank: reducerUtils.initial(),
    addBank: reducerUtils.initial(),
    modBank: reducerUtils.initial(),
    delBank: reducerUtils.initial(),
    getMem: reducerUtils.initial(),
    addMem: reducerUtils.initial(),
    modMem: reducerUtils.initial(),
    delMem: reducerUtils.initial(),
    addMemPlus: reducerUtils.initial(),
    modMemPlus: reducerUtils.initial(),
    delMemPlus: reducerUtils.initial(),
    patHolder: reducerUtils.initial(),
    getAssets: reducerUtils.initial(),
    addAssets: reducerUtils.initial(),
    patchStartDate: reducerUtils.initial(),
    modAssets: reducerUtils.initial(),
    delAssets: reducerUtils.initial(),
    getChungyak: reducerUtils.initial(),
    addChungyak: reducerUtils.initial(),
    modChungyak: reducerUtils.initial(),
    delChungyak: reducerUtils.initial(),
    addRestriction: reducerUtils.initial(),
    modRestriction: reducerUtils.initial(),
    delRestriction: reducerUtils.initial(),
};

export default function commonInfo(state = initialState, action) {
    switch (action.type) {
        case HOUSE_GET:
        case HOUSE_GET_SUCCESS:
        case HOUSE_GET_ERROR:
            return handleAsyncActions(HOUSE_GET, 'getHouse')(state, action);
        case HOUSE_GET_DELETE:
            return {
                ...state,
                getHouse: reducerUtils.initial(),
            };
        case ADD_HOUSE_POST:
        case ADD_HOUSE_POST_SUCCESS:
        case ADD_HOUSE_POST_ERROR:
            return handleAsyncActions(ADD_HOUSE_POST, 'addHouse')(
                state,
                action
            );
        case ADD_HOUSE_POST_DELETE:
            return {
                ...state,
                addHouse: reducerUtils.initial(),
            };
        case MOD_HOUSE_PUT:
        case MOD_HOUSE_PUT_SUCCESS:
        case MOD_HOUSE_PUT_ERROR:
            return handleAsyncActions(MOD_HOUSE_PUT, 'modHouse')(state, action);
        case MOD_HOUSE_PUT_DELETE:
            return {
                ...state,
                modHouse: reducerUtils.initial(),
            };

        case DEL_HOUSE_DELETE:
        case DEL_HOUSE_DELETE_SUCCESS:
        case DEL_HOUSE_DELETE_ERROR:
            return handleAsyncActions(DEL_HOUSE_DELETE, 'delHouse')(
                state,
                action
            );
        case DEL_HOUSE_DELETE_DELETE:
            return {
                ...state,
                delHouse: reducerUtils.initial(),
            };
        case BANKBOOK_GET:
        case BANKBOOK_GET_SUCCESS:
        case BANKBOOK_GET_ERROR:
            return handleAsyncActions(BANKBOOK_GET, 'getBank')(state, action);
        case BANKBOOK_GET_DELETE:
            return { ...state, getBank: reducerUtils.initial() };
        case ADD_BANKBOOK_POST:
        case ADD_BANKBOOK_POST_SUCCESS:
        case ADD_BANKBOOK_POST_ERROR:
            return handleAsyncActions(ADD_BANKBOOK_POST, 'addBank')(
                state,
                action
            );
        case ADD_BANKBOOK_POST_DELETE:
            return {
                ...state,
                addBank: reducerUtils.initial(),
            };
        case MOD_BANKBOOK_PUT:
        case MOD_BANKBOOK_PUT_SUCCESS:
        case MOD_BANKBOOK_PUT_ERROR:
            return handleAsyncActions(MOD_BANKBOOK_PUT, 'modBank')(
                state,
                action
            );
        case MOD_BANKBOOK_PUT_DELETE:
            return {
                ...state,
                modBank: reducerUtils.initial(),
            };
        case DEL_BANKBOOK_DELETE:
        case DEL_BANKBOOK_DELETE_SUCCESS:
        case DEL_BANKBOOK_DELETE_ERROR:
            return handleAsyncActions(DEL_BANKBOOK_DELETE, 'delBank')(
                state,
                action
            );
        case MEMBER_GET:
        case MEMBER_GET_SUCCESS:
        case MEMBER_GET_ERROR:
            return handleAsyncActions(MEMBER_GET, 'getMem')(state, action);
        case ADD_MEMBER_POST:
        case ADD_MEMBER_POST_SUCCESS:
        case ADD_MEMBER_POST_ERROR:
            return handleAsyncActions(ADD_MEMBER_POST, 'addMem')(state, action);
        case ADD_MEMBER_ADD_INFO_POST:
        case ADD_MEMBER_ADD_INFO_POST_SUCCESS:
        case ADD_MEMBER_ADD_INFO_POST_ERROR:
            return handleAsyncActions(ADD_MEMBER_ADD_INFO_POST, 'addMemPlus')(
                state,
                action
            );
        case ADD_MEMBER_DELETE:
            return {
                ...state,
                addMem: reducerUtils.initial(),
            };
        case ADD_MEMBER_ADD_INFO_POST_DELETE:
            return {
                ...state,
                addMemPlus: reducerUtils.initial(),
            };
        case MOD_MEMBER_PUT:
        case MOD_MEMBER_PUT_SUCCESS:
        case MOD_MEMBER_PUT_ERROR:
            return handleAsyncActions(MOD_MEMBER_PUT, 'modMem')(state, action);
        case MOD_MEMBER_ADD_INFO_PUT:
        case MOD_MEMBER_ADD_INFO_PUT_SUCCESS:
        case MOD_MEMBER_ADD_INFO_PUT_ERROR:
            return handleAsyncActions(MOD_MEMBER_ADD_INFO_PUT, 'modMemPlus')(
                state,
                action
            );
        case MOD_MEMBER_DELETE:
            return {
                ...state,
                modMem: reducerUtils.initial(),
            };
        case MOD_MEMBER_ADD_INFO_PUT_DELETE:
            return {
                ...state,
                modMemPlus: reducerUtils.initial(),
            };
        case DEL_MEMBER_DELETE:
        case DEL_MEMBER_DELETE_SUCCESS:
        case DEL_MEMBER_DELETE_ERROR:
            return handleAsyncActions(DEL_MEMBER_DELETE, 'delMem')(
                state,
                action
            );
        case DEL_MEMBER_ADD_INFO_DELETE:
        case DEL_MEMBER_ADD_INFO_DELETE_SUCCESS:
        case DEL_MEMBER_ADD_INFO_DELETE_ERROR:
            return handleAsyncActions(DEL_MEMBER_ADD_INFO_DELETE, 'delMemPlus')(
                state,
                action
            );
        case DEL_MEMBER_ADD_INFO_DELETE_DELETE:
            return { ...state, delMemPlus: reducerUtils.initial() };
        case HOUSE_HOLDER_PATCH:
        case HOUSE_HOLDER_PATCH_SUCCESS:
        case HOUSE_HOLDER_PATCH_ERROR:
            return handleAsyncActions(HOUSE_HOLDER_PATCH, 'patHolder')(
                state,
                action
            );
        case ASSETS_GET:
        case ASSETS_GET_SUCCESS:
        case ASSETS_GET_ERROR:
            return handleAsyncActions(ASSETS_GET, 'getAssets')(state, action);
        case ADD_ASSETS_POST:
        case ADD_ASSETS_POST_SUCCESS:
        case ADD_ASSETS_POST_ERROR:
            return handleAsyncActions(ADD_ASSETS_POST, 'addAssets')(
                state,
                action
            );
        case ADD_ASSETS_POST_DELETE:
            return {
                ...state,
                addAssets: reducerUtils.initial(),
            };
        case MOD_ASSETS_PUT:
        case MOD_ASSETS_PUT_SUCCESS:
        case MOD_ASSETS_PUT_ERROR:
            return handleAsyncActions(MOD_ASSETS_PUT, 'modAssets')(
                state,
                action
            );
        case MOD_ASSETS_PUT_DELETE:
            return {
                ...state,
                modAssets: reducerUtils.initial(),
            };
        case DEL_ASSETS_DELETE:
        case DEL_ASSETS_DELETE_SUCCESS:
        case DEL_ASSETS_DELETE_ERROR:
            return handleAsyncActions(DEL_ASSETS_DELETE, 'delAssets')(
                state,
                action
            );
        case HOMELESS_START_DATE_PATCH:
        case HOMELESS_START_DATE_PATCH_SUCCESS:
        case HOMELESS_START_DATE_PATCH_ERROR:
            return handleAsyncActions(
                HOMELESS_START_DATE_PATCH,
                'patchStartDate'
            )(state, action);
        case CHUNGYAK_GET:
        case CHUNGYAK_GET_SUCCESS:
        case CHUNGYAK_GET_ERROR:
            return handleAsyncActions(CHUNGYAK_GET, 'getChungyak')(
                state,
                action
            );
        case ADD_CHUNGYAK_POST:
        case ADD_CHUNGYAK_POST_SUCCESS:
        case ADD_CHUNGYAK_POST_ERROR:
            return handleAsyncActions(ADD_CHUNGYAK_POST, 'addChungyak')(
                state,
                action
            );
        case ADD_CHUNGYAK_DELETE:
            return {
                ...state,
                addChungyak: reducerUtils.initial(),
            };
        case MOD_CHUNGYAK_PUT:
        case MOD_CHUNGYAK_PUT_SUCCESS:
        case MOD_CHUNGYAK_PUT_ERROR:
            return handleAsyncActions(MOD_CHUNGYAK_PUT, 'modChungyak')(
                state,
                action
            );
        case MOD_CHUNGYAK_DELETE:
            return {
                ...state,
                modChungyak: reducerUtils.initial(),
            };
        case DEL_CHUNGYAK_DELETE:
        case DEL_CHUNGYAK_DELETE_SUCCESS:
        case DEL_CHUNGYAK_DELETE_ERROR:
            return handleAsyncActions(DEL_CHUNGYAK_DELETE, 'delChungyak')(
                state,
                action
            );
        case ADD_CHUNGYAK_RESTR_POST:
        case ADD_CHUNGYAK_RESTR_POST_SUCCESS:
        case ADD_CHUNGYAK_RESTR_POST_ERROR:
            return handleAsyncActions(
                ADD_CHUNGYAK_RESTR_POST,
                'addRestriction'
            )(state, action);
        case ADD_CHUNGYAK_RESTR_DELETE:
            return {
                ...state,
                addRestriction: reducerUtils.initial(),
            };
        case MOD_CHUNGYAK_RESTR_PUT:
        case MOD_CHUNGYAK_RESTR_PUT_SUCCESS:
        case MOD_CHUNGYAK_RESTR_PUT_ERROR:
            return handleAsyncActions(MOD_CHUNGYAK_RESTR_PUT, 'modRestriction')(
                state,
                action
            );
        case MOD_CHUNGYAK_RESTR_DELETE:
            return {
                ...state,
                modRestriction: reducerUtils.initial(),
            };
        case DEL_CHUNGYAK_RESTR_DELETE:
        case DEL_CHUNGYAK_RESTR_DELETE_SUCCESS:
        case DEL_CHUNGYAK_RESTR_DELETE_ERROR:
            return handleAsyncActions(
                DEL_CHUNGYAK_RESTR_DELETE,
                'delRestriction'
            )(state, action);
        default:
            return state;
    }
}
