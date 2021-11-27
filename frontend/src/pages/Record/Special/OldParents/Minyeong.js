import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Tooltip from '../../../../components/Tooltip/Tooltip';
import SubButton from '../../../../components/Button/SubButton';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '../../Record.css';

const RecordDetailSpecialOldParentsMinyeong = () => {
    const history = useHistory();
    const location = useLocation();
    const id = location.state.id;
    const recordsStore = useSelector((state) => state.records);

    const [item, setItem] = useState();

    useEffect(() => {
        const allRecords = recordsStore.getAllRecords.data;
        const speOldParMin =
            allRecords?.verificationOfSpecialMinyeongOldParentResponseDtos;

        if (allRecords) {
            if (speOldParMin) {
                speOldParMin.map((content, i) => {
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
                                특별공급 노부모유형 민영주택 - {item.ranking}
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
                                        미성년자녀 수
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.calcMinorChildren}
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        <Tooltip
                                            message={
                                                <div className="textTooltip">
                                                    태아 포함
                                                </div>
                                            }
                                            width={150}
                                            height={100}
                                        >
                                            <ExclamationCircleOutlined className="tooltipIcon" />
                                        </Tooltip>
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
                                        소유주택2개미만세대조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetHouseHavingLessThan2AptTf
                                            ? '충족'
                                            : '미충족'}
                                    </td>
                                </tr>

                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        우선순위조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.priorityApt ? '충족' : '미충족'}
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        <Tooltip
                                            message={
                                                <div className="textTooltip">
                                                    <b>우선순위조건이란?</b>{' '}
                                                    주거전용면적 85m²를 초과하는
                                                    공공건설임대주택이나
                                                    <br />
                                                    수도권에 지정된 공공주택에서
                                                    공급하는 민영주택에
                                                    청약하는지에 대한
                                                    조건입니다.
                                                </div>
                                            }
                                            width={150}
                                            height={100}
                                        >
                                            <ExclamationCircleOutlined className="tooltipIcon" />
                                        </Tooltip>
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
                                        청약통장예치금액조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.meetDepositTf ? '충족' : '미충족'}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        자매형제부양조건
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.sibilingSupportYn === 'y'
                                            ? '충족'
                                            : '미충족'}
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

export default RecordDetailSpecialOldParentsMinyeong;
