import axios from 'axios';
import { get, post } from './instance';

// 다자녀 가점 api
//아파트 공고번호, 주택형 보내기
export const postMultiChildPointAptNum = (info) =>
    post('point/special/multi-child', {
        notificationNumber: info.notificationNumber,
        multiChildHouseholdType: info.multiChildHouseholdType,
    });

// 다자녀 가점 순위 api
export const getMultiChildPoint = () => get('point/special/multi-child', {});
