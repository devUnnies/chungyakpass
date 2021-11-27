import axios from 'axios';
import { post, get, patch } from './instance';

// 신혼부부 민영 api
// 아파트 공고번호, 주택형 보내기
export const postNewlyMarriedMinyeongAptNum = (info) =>
    post('verification/special/minyeong/newly-married', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });

// 신혼부부 민영 순위 api
export const patchNewlyMarriedMinyeongRank = (info) =>
    patch(`verification/special/minyeong/newly-married/${info.id}`, {
        ranking: info.newlyMarriedMinyeongRank,
        sibilingSupportYn: info.supportYn,
    });

//   신혼부부 민영 순위 get
export const getNewlyMarriedMinyeongRank = () =>
    get(`verification/special/minyeong/newly-married`);
