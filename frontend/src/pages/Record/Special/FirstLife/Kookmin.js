import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Tooltip from '../../../../components/Tooltip/Tooltip';
import SubButton from '../../../../components/Button/SubButton';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '../../Record.css';

const RecordDetailSpecialFirstLifeKookmin = () => {
    const history = useHistory();
    const location = useLocation();
    const id = location.state.id;
    const recordsStore = useSelector((state) => state.records);

    const [item, setItem] = useState();

    useEffect(() => {
        const allRecords = recordsStore.getAllRecords.data;
        const speFirLifKook =
            allRecords?.verificationOfSpecialKookminPublicFirstLifeResponseDtos;

        if (allRecords) {
            if (speFirLifKook) {
                speFirLifKook.map((content, i) => {
                    if (id === content.id) {
                        setItem(content);
                    }
                });
            }
        }
    }, [recordsStore.getAllRecords]);

    return (
        <>
            {item ? (
                <>
                    <div className="recordsGeneralKookminInfo">
                        <div className="recordsGeneralKookminInfoHeaderContainer">
                            <div className="heightBar"></div>
                            <span className="listTitle">
                                특별공급 생애최초유형 특별법 적용 국민주택 -{' '}
                                {item.ranking}
                            </span>
                        </div>
                        <br />

                        <table className="recordsGeneralKookminInfoTable">
                            <tbody className="recordsGeneralKookminInfoTableTbody">
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        만나이
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.americanAge}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        세대주
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.householderTf
                                            ? '세대주'
                                            : '세대구성원'}
                                    </td>
                                </tr>

                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        인근지역거주조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetLivingInSurroundAreaTf
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        규제지역조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.restrictedAreaTf
                                            ? '규제지역'
                                            : '규제지역아님'}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        청약통장유형조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.accountTf ? '충족' : '미충족'}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        생애최초대상자조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetRecipientTf
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        우선공급 월평균소득기준
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetMonthlyAverageIncomePriorityTf
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        일반공급 월평균소득기준
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetMonthlyAverageIncomeGeneral
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>

                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        자산기준
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetPropertyTf
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>

                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        무주택세대구성원조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetHomelessHouseholdMembersTf
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>

                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        5년이내미당첨조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetAllHouseMemberNotWinningIn5yearsTf
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>

                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        재당첨제한조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetAllHouseMemberRewinningRestrictionTf
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>

                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        청약통장납입횟수조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetNumberOfPaymentsTf
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        청약통장가입기간조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetBankbookJoinPeriodTf
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        자매형제부양조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.sibilingSupportYn
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        5년이상소득세납부조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.taxOver5yearsYn
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        일반공급1순위당첨이력
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.firstRankHistoryYn
                                            ? '있음'
                                            : '없음'}
                                    </td>
                                </tr>

                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        자격확인일
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.modifiedDate
                                            ? item.modifiedDate
                                                  .replace('-', '년 ')
                                                  .replace('-', '월 ')
                                                  .replace('T', '일 ')
                                                  .replace(':', '시 ')
                                                  .replace(':', '분 ')
                                                  .substring(0, 21)
                                            : null}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <br />
                        <div className="recordsGeneralKookminButtonContainer">
                            <SubButton
                                type="back"
                                className="save"
                                width="80"
                                height="30"
                                onClick={() => {
                                    history.goBack(-1);
                                }}
                            >
                                목록으로
                            </SubButton>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default RecordDetailSpecialFirstLifeKookmin;
