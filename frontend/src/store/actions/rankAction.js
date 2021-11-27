import * as rankApi from '../../services/api/rankApi'; // rankApi 안의 함수 모두 불러오기
import { createPromiseThunk } from '../../services/api/asyncUtils';

export const USER_RANK_GET = 'USER_RANK_GET';
export const USER_RANK_GET_SUCCESS = 'USER_RANK_GET_SUCCESS';
export const USER_RANK_GET_ERROR = 'USER_RANK_GET_ERROR';

export const getRank = createPromiseThunk('USER_RANK_GET', rankApi.getRank);
