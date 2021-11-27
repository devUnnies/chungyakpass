import React, { useState, useEffect } from 'react';
import MainButton from '../../components/Button/MainButton';
import SubButton from '../../components/Button/SubButton';
import { useDispatch, useSelector } from 'react-redux';
import { modRestr } from '../../store/actions/commonInfoAction';
import { useHistory, useLocation } from 'react-router';

const ModLimit = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [limit, setLimit] = useState(location.state.limit);
    const [chungyakId, setChungyakId] = useState(location.state.chungyakId);
    let tempLimit = limit;

    console.log('수정 도착 !!! ' + JSON.stringify(limit));

    const ineligibleDate = location.state.ineligibleDate;
    const pos = location.state.pos;
    const houseState = location.state.houseState;
    const commonInfoStore = useSelector((state) => state.commonInfo);

    const onLimitChange = (e) => {
        const { name, value } = e.target;
        setLimit({ ...limit, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userForm = {
            id: limit.id,
            restriction: {
                houseMemberChungyakId: limit.houseMemberChungyakId,
                reWinningRestrictedDate:
                    limit.reWinningRestrictedDate === ''
                        ? null
                        : limit.reWinningRestrictedDate,
                specialSupplyRestrictedYn:
                    limit.specialSupplyRestrictedYn === ''
                        ? null
                        : limit.specialSupplyRestrictedYn,
                unqualifiedSubscriberRestrictedDate:
                    limit.unqualifiedSubscriberRestrictedDate === ''
                        ? null
                        : limit.unqualifiedSubscriberRestrictedDate,
                requlatedAreaFirstPriorityRestrictedDate:
                    limit.requlatedAreaFirstPriorityRestrictedDate === ''
                        ? null
                        : limit.requlatedAreaFirstPriorityRestrictedDate,
                additionalPointSystemRestrictedDate:
                    limit.additionalPointSystemRestrictedDate === ''
                        ? null
                        : limit.additionalPointSystemRestrictedDate,
            },
        };

        console.log(JSON.stringify(userForm));
        dispatch(modRestr(userForm));
        setLimit({
            houseMemberChungyakId: null,
            reWinningRestrictedDate: '',
            specialSupplyRestrictedYn: '',
            unqualifiedSubscriberRestrictedDate: '',
            requlatedAreaFirstPriorityRestrictedDate: '',
            additionalPointSystemRestrictedDate: '',
        });
    };

    useEffect(() => {
        Object.values(tempLimit).map((content, i) => {
            if (typeof content === 'object') {
                tempLimit[Object.keys(tempLimit)[i]] = '';
            }
        });

        setLimit(tempLimit);
        setLimit({ ...limit, houseMemberChungyakId: chungyakId });
    }, []);

    useEffect(() => {
        const data = commonInfoStore.addChungyak.data;
        const data2 = commonInfoStore.modChungyak.data;
        if (data) {
            setLimit({ ...limit, houseMemberChungyakId: data?.id });
        } else if (data2) {
            setLimit({ ...limit, houseMemberChungyakId: data2?.id });
        }
    }, [commonInfoStore.addChungyak, commonInfoStore.modChungyak]);

    useEffect(() => {
        const data = commonInfoStore.modRestriction?.data;
        if (data) {
            history.goBack(pos, {
                ineligibleDate: ineligibleDate ? ineligibleDate : null,
                houseState: houseState,
            });
        }
    }, [commonInfoStore.modRestriction]);

    return (
        <div id="modLimit" className="addLimitFormContainer">
            <form
                className="modLimitForm"
                name="modLimit"
                onSubmit={handleSubmit}
            >
                <table className="addLimitFormTable">
                    <tbody className="addLimitFormTableTbody">
                        <tr className="addLimitFormTableTbodyTr">
                            <td className="addLimitFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">재당첨제한</span>
                            </td>
                            <td className="addLimitFormTableTbodyTrTd">
                                <input
                                    className="reWinDateInput"
                                    type="date"
                                    name="reWinningRestrictedDate"
                                    value={limit.reWinningRestrictedDate}
                                    onChange={onLimitChange}
                                />
                            </td>
                            <td className="addLimitFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addLimitFormTableTbodyTr">
                            <td className="addLimitFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">특별공급제한</span>
                            </td>
                            <td className="addLimitFormTableTbodyTrTd">
                                <input
                                    className="limitInput"
                                    type="radio"
                                    name="specialSupplyRestrictedYn"
                                    onChange={onLimitChange}
                                    value="y"
                                    checked={
                                        limit.specialSupplyRestrictedYn === 'y'
                                            ? true
                                            : false
                                    }
                                />{' '}
                                <span className="limitInputText">청약불가</span>{' '}
                                <input
                                    className="limitInput"
                                    type="radio"
                                    name="specialSupplyRestrictedYn"
                                    onChange={onLimitChange}
                                    value="n"
                                    checked={
                                        limit.specialSupplyRestrictedYn === 'n'
                                            ? true
                                            : false
                                    }
                                />{' '}
                                <span className="limitInputText">청약가능</span>
                            </td>
                        </tr>
                        <tr className="addLimitFormTableTbodyTr">
                            <td className="addLimitFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    부적격당첨자제한
                                </span>
                            </td>
                            <td className="addLimitFormTableTbodyTrTd">
                                <input
                                    className="unSubResDateInput"
                                    type="date"
                                    name="unqualifiedSubscriberRestrictedDate"
                                    value={
                                        limit.unqualifiedSubscriberRestrictedDate
                                            ? limit.unqualifiedSubscriberRestrictedDate
                                            : ''
                                    }
                                    onChange={onLimitChange}
                                />
                            </td>
                        </tr>
                        <tr className="addLimitFormTableTbodyTr">
                            <td className="addLimitFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    투기과열지구
                                    <br />
                                    청약과열지구
                                    <br />
                                    1순위제한
                                </span>
                            </td>
                            <td className="addLimitFormTableTbodyTrTd">
                                <input
                                    className="reAreaFirPriRestDateInput"
                                    type="date"
                                    name="requlatedAreaFirstPriorityRestrictedDate"
                                    value={
                                        limit.requlatedAreaFirstPriorityRestrictedDate
                                    }
                                    onChange={onLimitChange}
                                />
                            </td>
                        </tr>
                        <tr className="addLimitFormTableTbodyTr">
                            <td className="addLimitFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">가점제당첨제한</span>
                            </td>
                            <td className="addLimitFormTableTbodyTrTd">
                                <input
                                    className="addPointSysRestDateInput"
                                    type="date"
                                    name="additionalPointSystemRestrictedDate"
                                    value={
                                        limit.additionalPointSystemRestrictedDate
                                    }
                                    onChange={onLimitChange}
                                />
                            </td>
                        </tr>

                        <tr className="addLimitFormTableTbodyTr">
                            <td
                                colSpan="3"
                                className="addLimitFormTableTbodyTrTd"
                            >
                                <div className="buttonContainer">
                                    <SubButton
                                        type="back"
                                        width="80"
                                        height="30"
                                        onClick={() => {
                                            history.goBack(pos);
                                        }}
                                    >
                                        목록으로
                                    </SubButton>
                                    <MainButton
                                        type="submit"
                                        width="80"
                                        height="30"
                                        onClick={() => {
                                            // alert('누름!');
                                        }}
                                    >
                                        저장
                                    </MainButton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default ModLimit;
