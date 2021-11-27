import axios from 'axios';
import { post, get, patch } from './instance';

// 생애최초 국민 api
//아파트 공고번호, 주택형 보내기
export const postFirstInLifeKookminAptNum = (info) =>
    post('verification/special/kookmin/public/first-life', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });

// 생애최초 국민 순위 api patch
export const patchFirstLifeKookminRank = (info) =>
    patch(
        `verification/special/kookmin/public/first-life/${info.verificationRecordSpecialKookminFirstLifeId}`,
        {
            firstRankHistoryYn: info.firstRankHistoryYn,
            kookminType: info.firstLifeKookminType,
            ranking: info.firstLifeKookminRank,
            sibilingSupportYn: info.supportYn,
            taxOver5yearsYn: info.taxOver5yearsYn,
        }
    );

//   생애최초 국민 순위 get
export const getFirstLifeKookminRank = () =>
    get(`verification/special/kookmin/public/first-life`);
