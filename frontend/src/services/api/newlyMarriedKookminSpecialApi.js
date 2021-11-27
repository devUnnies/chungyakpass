import axios from 'axios';
import { post, patch } from './instance';

// 신혼부부 국민 공특법 적용 api
//아파트 공고번호, 주택형 보내기
export const postNewlyMarriedKookminSpecialAptNum = (info) =>
    post('verification/special/kookmin/public/newly-married', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });

// 신혼부부 국민 순위 api
export const patchNewlyMarriedKookminSpecialRank = (info) =>
    patch(`verification/special/kookmin/public/newly-married/${info.id}`, {
        preNewMarriedYn: info.preNewMarriedYn,
        kookminType: info.newlyMarriedKookminSpecialType,
        ranking: info.newlyMarriedKookminSpecialRank,
        sibilingSupportYn: info.supportYn,
    });
