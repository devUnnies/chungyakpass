import * as recordApi from '../../services/api/recordApi'; // recordApi 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

// 액션 타입
export const ALL_RECORDS_GET = 'ALL_RECORDS_GET';
export const ALL_RECORDS_GET_SUCCESS = 'ALL_RECORDS_GET_SUCCESS';
export const ALL_RECORDS_GET_ERROR = 'ALL_RECORDS_GET_ERROR';

export const POINT_ALL_RECORDS_GET = 'POINT_ALL_RECORDS_GET';
export const POINT_ALL_RECORDS_GET_SUCCESS = 'POINT_ALL_RECORDS_GET_SUCCESS';
export const POINT_ALL_RECORDS_GET_ERROR = 'POINT_ALL_RECORDS_GET_ERROR';

export const getAllRecords = createPromiseThunk(
    ALL_RECORDS_GET,
    recordApi.allRecord
);

export const getPointAllRecords = createPromiseThunk(
    POINT_ALL_RECORDS_GET,
    recordApi.allPointRecord
);
