import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Tooltip from '../../../components/Tooltip/Tooltip';
import SubButton from '../../../components/Button/SubButton';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '../Record.css';

const RecordPointDetailSpecialOldParents = () => {
    const history = useHistory();
    const location = useLocation();
    const id = location.state.id;
    const recordsStore = useSelector((state) => state.records);

    const [item, setItem] = useState();

    useEffect(() => {
        const allRecords = recordsStore.getPointAllRecords.data;
        const speOldPar =
            allRecords?.pointOfSpecialMinyeongOldParentsResponseDtos;

        if (allRecords) {
            if (speOldPar) {
                speOldPar.map((content, i) => {
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
                                특별공급 노부모유형 민영주택 가배점 -{' '}
                                {item.total + '점'}
                            </span>
                        </div>
                        <br />

                        <table className="recordsGeneralKookminInfoTable">
                            <tbody className="recordsGeneralKookminInfoTableTbody">
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
                                        부양가족 수
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.numberOfDependents
                                            ? item.numberOfDependents + '명'
                                            : null}
                                    </td>
                                </tr>
                                <tr className="recordsGeneralKookminInfoTableTbodyTr">
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTdSubTitle">
                                        청약통장유효여부
                                    </td>
                                    <td className="recordsGeneralKookminInfoTableTbodyTrTd">
                                        {item.bankBookVaildTf
                                            ? '유효함'
                                            : '유효하지 않음'}
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

export default RecordPointDetailSpecialOldParents;
