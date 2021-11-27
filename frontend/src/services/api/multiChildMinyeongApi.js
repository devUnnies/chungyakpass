import axios from 'axios';
import { post, get, patch } from './instance';

// 다자녀 민영 api
//아파트 공고번호, 주택형 보내기
export const postMultiChildMinyeongAptNum = (info) =>
    post('verification/special/minyeong/multi-child', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });

// 다자녀 민영 순위 api
export const patchMultiChildMinyeongRank = (info) =>
    patch(
        `verification/special/minyeong/multi-child/${info.verificationRecordSpecialMinyeongMultiChildId}`,
        {
            ranking: info.multiChildMinyeongRank,
            sibilingSupportYn: info.supportYn,
        }
    );

//  다자녀 민영 순위 get
export const getMultiChildMinyeongRank = () =>
    get(`verification/special/minyeong/multi-child`);
