import axios from 'axios';
import { get, post } from './instance';

// 한부모 가점 api
// 아파트 공고번호, 주택형 보내기
export const postOneParentPointAptNum = (info) =>
    post('point/special/single-parents', {
        notificationNumber: info.notificationNumber,
    });

// 한부모 가점 순위 api
export const getOneParentPoint = () => get('point/special/single-parents', {});
