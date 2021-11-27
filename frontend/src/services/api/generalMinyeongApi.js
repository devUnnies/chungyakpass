import axios from 'axios';
import { post, patch, get } from './instance';

//아파트 공고번호, 주택형 보내기
export const postGeneralMinyeongAptNum = (info) =>
    post('verification/general/minyeong', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });

// 일반 민영 순위 api
export const patchGeneralMinyeongRank = (info) =>
    patch(
        `verification/general/minyeong/${info.verificationRecordGeneralMinyeongId}`,
        {
            sibilingSupportYn: info.supportYn,
            ranking: info.generalMinyeongRank,
        }
    );

//   일반 민영 순위 get
export const getGeneralMinyeongRank = () =>
    get(`verification/general/minyeong`);
