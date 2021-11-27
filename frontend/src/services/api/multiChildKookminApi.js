import axios from 'axios';
import { post, get, patch } from './instance';

// 다자녀 국민 api
//아파트 공고번호, 주택형 보내기
export const postMultiChildKookminAptNum = (info) =>
    post('verification/special/kookmin/public/multi-child', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });

// 다자녀 국민 순위 api
export const patchMultiChildKookminRank = (info) =>
    patch(
        `verification/special/kookmin/public/multi-child/${info.verificationRecordSpecialKookminMultiChildId}`,
        {
            kookminType: info.multiChildType,
            ranking: info.multiChildKookminRank,
            sibilingSupportYn: info.supportYn,
        }
    );

//  다자녀 국민 순위 get
export const getMultiChildKookminRank = () =>
    get(`verification/special/kookmin/public/multi-child`);
