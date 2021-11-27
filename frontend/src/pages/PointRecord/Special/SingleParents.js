import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Tooltip from '../../../components/Tooltip/Tooltip';
import SubButton from '../../../components/Button/SubButton';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '../Record.css';

const RecordPointDetailSpecialSingleParents = () => {
    const history = useHistory();
    const location = useLocation();
    const id = location.state.id;
    const recordsStore = useSelector((state) => state.records);

    const [item, setItem] = useState();

    useEffect(() => {
        const allRecords = recordsStore.getPointAllRecords.data;
        const speSinPar =
            allRecords?.pointOfSpecialMinyeongSingleParentsResponseDtos;

        if (allRecords) {
            if (speSinPar) {
                speSinPar.map((content, i) => {
                    if (id === content.id) {
                        setItem(content);
                    }
                });
            }
        }
    }, [recordsStore.getPointAllRecords]);

    return (
        <>
            {item ? (
                <>
                    <div className="recordsGeneralKookminInfo">
                        <div className="recordsGeneralKookminInfoHeaderContainer">
                            <div className="heightBar"></div>
                            <span className="listTitle">
                                특별공급 한부모유형 민영주택 가배점 -{' '}
                                {item.total + '점'}
                            </span>
                        </div>
                        <br />

                        <table className="recordsGeneralKookminInfoTable">
                            <tbody className="recordsGeneralKookminInfoTableTbody">
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        공고번호
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.aptNotificationNumber}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        자녀수
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.numberOfMinors
                                            ? item.numberOfMinors + '명'
                                            : null}
                                    </td>
                                </tr>

                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        영아 자녀수
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.ageOfMostYoungChild
                                            ? item.ageOfMostYoungChild + '명'
                                            : null}
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        <Tooltip
                                            message={
                                                <div className="textTooltip">
                                                    <b>영아란?</b> 0~24개월 미만
                                                    신생아나 영아를 의미합니다.
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
                                        납입횟수
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.bankbookPaymentsCount
                                            ? item.bankbookPaymentsCount + '회'
                                            : null}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        해당지역연속거주기간
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.periodOfApplicableAreaResidence
                                            ? item.periodOfApplicableAreaResidence +
                                              '개월'
                                            : null}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        소득
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.monthOfAverageIncome
                                            ? item.monthOfAverageIncome + '원'
                                            : null}
                                    </td>
                                </tr>

                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        가배점계산일
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

export default RecordPointDetailSpecialSingleParents;
