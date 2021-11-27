import axios from 'axios';
import { post, get, patch } from './instance';

// 생애최초 민영 api
//아파트 공고번호, 주택형 보내기
export const postFirstInLifeMinyeongAptNum = (info) =>
    post('verification/special/minyeong/first-life', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });

// 생애최초 민영 순위 api
export const patchFirstLifeMinyeongRank = (info) =>
    patch(
        `verification/special/minyeong/first-life/${info.verificationRecordSpecialMinyeongFirstLifeId}`,
        {
            firstRankHistoryYn: info.firstRankHistoryYn,
            ranking: info.firstLifeMinyeongRank,
            sibilingSupportYn: info.supportYn,
            taxOver5yearsYn: info.taxOver5yearsYn,
        }
    );

//   생애최초 국민 순위 get
export const getFirstLifeMinyeongRank = () =>
    get(`verification/special/minyeong/first-life`);
