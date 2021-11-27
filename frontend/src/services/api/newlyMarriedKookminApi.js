import axios from 'axios';
import { post, get, patch } from './instance';

// 신혼부부 국민 api
//아파트 공고번호, 주택형 보내기
export const postNewlyMarriedKookminAptNum = (info) =>
    post('verification/special/kookmin/newly-married', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });

// 신혼부부 국민 순위 api
export const patchNewlyMarriedKookminRank = (info) =>
    patch(
        `verification/special/kookmin/newly-married/${info.verificationRecordSpecialKookminNewlyMarriedId}`,
        {
            kookminType: info.newlyMarriedKookminType,
            ranking: info.newlyMarriedKookminRank,
            sibilingSupportYn: info.supportYn,
        }
    );

// 신혼부부 국민 순위 get(공특법 적용, 미적용 둘 다)
export const getNewlyMarriedKookminRank = () =>
    get(`verification/special/kookmin/newly-married`);
