import axios from 'axios';
import { post, get, patch } from './instance';

// 노부모 국민 api
//아파트 공고번호, 주택형 보내기
export const postOldParentKookminAptNum = (info) =>
    post('verification/special/kookmin/public/old-parent', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });

// 노부모 국민 순위 api
export const patchOldParentKookminRank = (info) =>
    patch(
        `verification/special/kookmin/public/old-parent/${info.verificationRecordSpecialKookminOldParentId}`,
        {
            oldParentKookminType: info.oldParentKookminType,
            oldParentKookminRank: info.oldParentKookminRank,
            supportYn: info.supportYn,
        }
    );

//   노부모 국민 순위 get
export const getOldParentKookminRank = () =>
    get(`verification/special/kookmin/public/old-parent`);
