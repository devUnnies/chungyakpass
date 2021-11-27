import axios from 'axios';
import { post, get, patch } from './instance';

// 노부모 민영 api
//아파트 공고번호, 주택형 보내기
export const postOldParentMinyeongAptNum = (info) =>
    post('verification/special/minyeong/old-parent', {
        notificationNumber: info.notificationNumber,
        housingType: info.housingType,
    });

// 노부모 민영 순위 api
export const patchOldParentMinyeongRank = (info) =>
    patch(
        `verification/special/minyeong/old-parent/${info.verificationRecordSpecialMinyeongOldParentId}`,
        {
            oldParentMinyeongRank: info.oldParentMinyeongRank,
            supportYn: info.supportYn,
        }
    );

//   노부모 민영 순위 get
export const getOldParentMinyeongRank = () =>
    get(`verification/special/minyeong/old-parent`);
