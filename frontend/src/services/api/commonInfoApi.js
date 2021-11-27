import { post, put, del, patch, get } from './instance';

//공통정보입력 API
//  - 세대조회 API
export const getHouse = () => get(`user/house`);

//  - 세대등록 API
export const addHouse = (info) => post('user/house', info);

//  - 세대수정 API
export const modHouse = (info) => put(`user/house/${info.id}`, info.addressArr);

//  - 세대삭제 API
export const delHouse = (houseId) => del(`user/house/${houseId}`);

// ----------------------------------------------------------------------------

//  - 통장정보조회 API
export const getBankBook = () => get(`user/bankbook`);

//  - 통장정보등록 API
export const addBankBook = (info) => post('user/bankbook', info);

//  - 통장정보수정 API
export const modBankBook = (info) =>
    put(`user/bankbook/${info.id}`, {
        bank: info.bank,
        bankbook: info.bankbook,
        joinDate: info.joinDate,
        deposit: info.deposit,
        paymentsCount: info.paymentsCount,
    });

//  - 통장정보삭제 API
export const delBankBook = (bankBookId) => del(`user/bankbook/${bankBookId}`);

// ----------------------------------------------------------------------------

//  - 세대구성원조회 API
export const getMember = (houseId) => get(`user/house/member/${houseId}`);

//  - 세대구성원등록 API
export const addMember = (info) => post('user/house/member', info);

//  - 세대구성원수정 API
export const modMember = (info) =>
    put(`user/house/member/${info.id}`, {
        relation: info.relation,
        name: info.name,
        birthDay: info.birthDay,
        foreignerYn: info.foreignerYn,
        soldierYn: info.soldierYn,
        marriageDate: info.marriageDate,
        homelessStartDate: info.homelessStartDate,
        transferDate: info.transferDate,
        income: info.income,
    });

//  - 세대구성원삭제 API
export const delMember = (memberId) => del(`user/house/member/${memberId}`);

//  - 세대구성원 추가정보 저장 API
export const addMemberPlusInfo = (info) =>
    post(`user/house/member/additional-info`, info);

export const modMemberPlusInfo = (info) =>
    put(
        `user/house/member/additional-info/${info.houseMemberAdditionalInfoId}`,
        {
            houseMemberId: info.houseMemberId,
            parentsDeathYn: info.parentsDeathYn,
            divorceYn: info.divorceYn,
            sameResidentRegistrationYn: info.sameResidentRegistrationYn,
            stayOverYn: info.stayOverYn,
            nowStayOverYn: info.nowStayOverYn,
        }
    );

export const delMemberPlusInfo = (id) =>
    del(`user/house/member/additional-info/${id}`);

// ----------------------------------------------------------------------------

//  - 세대주 지정 API
export const patchHolder = (info) =>
    patch(`user/house/holder/${info.houseId}`, {
        houseMemberId: info.memberId,
    });

// ----------------------------------------------------------------------------

//  - 세대구성원자산조회 API
export const getAssets = (memberId) =>
    get(`user/house/member/property/${memberId}`);

//  - 세대구성원자산등록 API
export const addAssets = (info) => post(`user/house/member/property`, info);

//  - 세대구성원자산수정 API
export const modAssets = (info) =>
    put(`user/house/member/property/${info.id}`, {
        houseMemberId: info.houseMemberId,
        property: info.property,
        saleRightYn: info.saleRightYn,
        residentialBuildingYn: info.residentialBuildingYn,
        residentialBuilding: info.residentialBuilding,
        nonResidentialBuilding: info.nonResidentialBuilding,
        exceptionHouseYn: info.exceptionHouseYn,
        metropolitanBuildingYn: info.metropolitanBuildingYn,
        exclusiveArea: info.exclusiveArea,
        amount: info.amount,
        acquisitionDate: info.acquisitionDate,
        dispositionDate: info.dispositionDate,
        taxBaseDate: info.taxBaseDate,
    });

//  - 세대구성원자산삭제 API
export const delAssets = (assetId) =>
    del(`user/house/member/property/${assetId}`);

//  - 세대구성원무주택시작일수정 API
export const patchStartDate = (info) =>
    patch(`user/house/member/homeless-start-date/${info.memberId}`, {
        homelessStartDate: info.homelessStartDate,
    });
// ----------------------------------------------------------------------------

//  -　세대구성원청약신청및제한사항 조회 API
export const getChungyak = (memberId) =>
    get(`user/house/member/chungyak/${memberId}`);

//  - 세대구성원청약신청이력등록 API
export const addChungyak = (info) => post(`user/house/member/chungyak`, info);

//  - 세대구성원청약신청이력수정 API
export const modChungyak = (info) =>
    put(`user/house/member/chungyak/${info.id}`, info.history);

//  - 세대구성원청약신청이력삭제 API
export const delChungyak = (chungyakId) =>
    del(`user/house/member/chungyak/${chungyakId}`);
// ----------------------------------------------------------------------------

//  - 세대구성원청약제한사항등록 API
export const addRestriction = (info) =>
    post(`user/house/member/chungyak/restriction`, info);

//  - 세대구성원청약제한사항수정 API
export const modRestriction = (info) =>
    put(`user/house/member/chungyak/restriction/${info.id}`, info.restriction);

//  - 세대구성원청약제한사항삭제 API
export const delRestriction = (restrictionId) =>
    del(`user/house/member/chungyak/restriction/${restrictionId}`);
