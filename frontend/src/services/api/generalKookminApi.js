import axios from 'axios';
import { post } from './instance';

//아파트 공고번호, 주택형 보내기
export const postGeneralKookminAptNum = (info) =>
    post('verification/general/kookmin', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });