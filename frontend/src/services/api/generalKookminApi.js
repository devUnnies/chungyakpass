import axios from 'axios';
import { post, patch, get } from './instance';

//아파트 공고번호, 주택형 보내기
export const postGeneralKookminAptNum = (info) =>
    post('verification/general/kookmin', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });

// 일반 국민 순위 api
export const patchGeneralKookminRank = (info) =>
    patch(
        `verification/general/kookmin/${info.verificationRecordGeneralKookminId}`,
        {
            sibilingSupportYn: info.supportYn,
            twentiesSoleHouseHolderYn: info.lifeYn,
            ranking: info.generalKookminRank,
        }
    );

// 일반 국민 순위 get
export const getGeneralKookminRank = () => get(`verification/general/kookmin`);
