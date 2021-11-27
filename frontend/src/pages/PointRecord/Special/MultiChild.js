import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Tooltip from '../../../components/Tooltip/Tooltip';
import SubButton from '../../../components/Button/SubButton';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '../Record.css';

const RecordPointDetailSpecialMultiChild = () => {
    const history = useHistory();
    const location = useLocation();
    const id = location.state.id;
    const recordsStore = useSelector((state) => state.records);

    const [item, setItem] = useState();

    useEffect(() => {
        const allRecords = recordsStore.getPointAllRecords.data;
        const speMulChi =
            allRecords?.pointOfSpecialMinyeongMultiChildResponseDtos;

        if (allRecords) {
            if (speMulChi) {
                speMulChi.map((content, i) => {
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
                                특별공급 다자녀유형 민영주택 가배점 -{' '}
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
                                        다자녀유형
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.multiChildHouseholdType
                                            ? item.multiChildHouseholdType
                                            : null}
                                    </td>
                                </tr>

                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        만19세미만자녀수
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.numberOfChild
                                            ? item.numberOfChild + '명'
                                            : null}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        만6세미만자녀수
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.numberOfChildUnder6Year
                                            ? item.numberOfChildUnder6Year +
                                              '명'
                                            : null}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        청약통장가입기간
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.bankbookJoinPeriod
                                            ? item.bankbookJoinPeriod + '개월'
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
                                        무주택기간
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.periodOfHomelessness
                                            ? item.periodOfHomelessness + '개월'
                                            : null}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        세대구성
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.generationComposition
                                            ? item.generationComposition
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

export default RecordPointDetailSpecialMultiChild;
