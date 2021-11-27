import React, { useState, useEffect } from 'react';
import MainButton from '../../components/Button/MainButton';
import SubButton from '../../components/Button/SubButton';
import { useDispatch, useSelector } from 'react-redux';
import { modChung } from '../../store/actions/commonInfoAction';
import { useHistory, useLocation } from 'react-router';

const ModHistory = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const pos = location.state.pos;
    const memberId = location.state.memberId;
    let ineligibleDate = location.state.ineligibleDate;
    const houseState = location.state.houseState;
    const haveAssets = location.state.haveAssets;
    const commonInfoStore = useSelector((state) => state.commonInfo);

    // history 초기화
    const [history, setHistory] = useState(location.state.history);
    const [ineligible, setIneligible] = useState(location.state.ineligible);
    // 제한사항 여부
    const [haveLimit, setHaveLimit] = useState(false);

    const _history = useHistory();

    const onHistoryChange = (e) => {
        const { name, value } = e.target;
        setHistory({ ...history, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // history 하나 우선 저장함

        const userForm = {
            id: history.id,
            history: {
                houseMemberId: memberId,
                houseName: history.houseName,
                supply: history.supply,
                specialSupply: history.specialSupply,
                housingType: history.housingType,
                ranking: history.ranking,
                result: history.result,
                preliminaryNumber: history.preliminaryNumber,
                winningDate: history.winningDate,
                raffle: history.raffle,
                cancelWinYn: history.cancelWinYn,
            },
        };
        dispatch(modChung(userForm));
        // 초기화
        setHistory({
            houseName: '',
            supply: '',
            specialSupply: '',
            housingType: '',
            ranking: '',
            result: '',
            preliminaryNumber: null,
            winningDate: '',
            raffle: '',
            cancelWinYn: '',
        });
        setIneligible({
            isIneligible: '',
            date: '',
        });
    };

    useEffect(() => {
        const data = commonInfoStore.modChungyak.data;
        if (data && haveLimit) {
            _history.push('/addLimit', {
                pos: pos + 1,
                ineligibleDate: ineligibleDate,
                houseState: houseState,
            });
        } else if (data) {
            _history.goBack(pos);
        }
    }, [commonInfoStore.modChungyak]);

    useEffect(() => {
        if (ineligible.isIneligible === 'y') {
            ineligibleDate = ineligible.date;
        }
    }, [ineligible.isIneligible]);

    useEffect(() => {
        if (history.result === '미당첨') {
            setHistory({
                ...history,
                preliminaryNumber: null,
                winningDate: null,
                cancelWinYn: null,
            });
        }
    }, [history.result]);

    return (
        <div id="modHistory" className="modHistoryFormContainer">
            <form
                onSubmit={handleSubmit}
                className="modHistoryForm"
                name="modHistory"
            >
                <table className="modHistoryFormTable">
                    <tbody className="modHistoryFormTableTbody">
                        <tr className="modHistoryFormTableTbodyTr">
                            <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">주택명</span>
                            </td>
                            <td className="modHistoryFormTableTbodyTrTd">
                                <input
                                    className="houseNameInput"
                                    type="text"
                                    name="houseName"
                                    value={history.houseName}
                                    onChange={onHistoryChange}
                                    required
                                />
                            </td>
                            <td className="modHistoryFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modHistoryFormTableTbodyTr">
                            <td className="addHistoryFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">주택형</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
                                <input
                                    className="houseTypeInput"
                                    type="text"
                                    name="housingType"
                                    value={history.housingType}
                                    onChange={onHistoryChange}
                                />
                            </td>
                        </tr>
                        <tr className="modHistoryFormTableTbodyTr">
                            <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">공급유형</span>
                            </td>
                            <td className="modHistoryFormTableTbodyTrTd">
                                <select
                                    className="supplySelect"
                                    name="supply"
                                    value={history.supply}
                                    onChange={onHistoryChange}
                                >
                                    <option value=""> ---선택--- </option>
                                    <option value="일반공급">일반공급</option>
                                    <option value="특별공급">특별공급</option>
                                    <option value="특별공급가점">
                                        특별공급가점
                                    </option>
                                </select>
                            </td>
                        </tr>
                        {history.supply === '특별공급' ||
                        history.supply === '특별공급가점' ? (
                            <tr className="modHistoryFormTableTbodyTr">
                                <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">세부유형</span>
                                </td>
                                <td className="modHistoryFormTableTbodyTrTd">
                                    <select
                                        className="specialSupplySelect"
                                        name="spercialSupply"
                                        value={history.specialSupply}
                                        onChange={onHistoryChange}
                                    >
                                        <option value=""> ---선택--- </option>
                                        <option value="다자녀가구">
                                            다자녀가구
                                        </option>
                                        <option value="신혼부부">
                                            신혼부부
                                        </option>
                                        <option value="생애최초">
                                            생애최초
                                        </option>
                                        <option value="노부모부양">
                                            노부모부양
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ) : null}
                        <tr className="modHistoryFormTableTbodyTr">
                            <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">순위</span>
                            </td>
                            <td className="modHistoryFormTableTbodyTrTd">
                                <select
                                    className="rankingSelect"
                                    name="ranking"
                                    value={history.ranking}
                                    onChange={onHistoryChange}
                                >
                                    <option value=""> ---선택--- </option>
                                    <option value="일순위">일순위</option>
                                    <option value="이순위">이순위</option>
                                </select>
                            </td>
                        </tr>
                        <tr className="modHistoryFormTableTbodyTr">
                            <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">추첨방식</span>
                            </td>
                            <td className="modHistoryFormTableTbodyTrTd">
                                <select
                                    className="resultSelect"
                                    name="raffle"
                                    value={history.raffle}
                                    onChange={onHistoryChange}
                                >
                                    <option value=""> ---선택--- </option>
                                    <option value="가점제">가점제</option>
                                    <option value="추첨제">추첨제</option>
                                </select>
                            </td>
                        </tr>
                        <tr className="modHistoryFormTableTbodyTr">
                            <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">당첨결과</span>
                            </td>
                            <td className="modHistoryFormTableTbodyTrTd">
                                <select
                                    className="resultSelect"
                                    name="result"
                                    value={history.result}
                                    onChange={onHistoryChange}
                                >
                                    <option value=""> ---선택--- </option>
                                    <option value="당첨">당첨</option>
                                    <option value="미당첨">미당첨</option>
                                    <option value="예비당첨">예비당첨</option>
                                </select>
                            </td>
                        </tr>
                        {history.result === '예비당첨' ? (
                            <tr className="modHistoryFormTableTbodyTr">
                                <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">예비번호</span>
                                </td>
                                <td className="modHistoryFormTableTbodyTrTd">
                                    <input
                                        className="houseTypeInput"
                                        type="text"
                                        name="preliminaryNumber"
                                        value={history.preliminaryNumber}
                                        onChange={onHistoryChange}
                                    />
                                </td>
                            </tr>
                        ) : null}
                        {history.result === '당첨' ? (
                            <tr className="modHistoryFormTableTbodyTr">
                                <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">당첨일</span>
                                </td>
                                <td className="modHistoryFormTableTbodyTrTd">
                                    <input
                                        className="houseTypeInput"
                                        type="date"
                                        name="winningDate"
                                        value={history.winningDate}
                                        onChange={onHistoryChange}
                                    />
                                </td>
                            </tr>
                        ) : null}
                        {history.result === '당첨' ||
                        history.result === '예비당첨' ? (
                            <tr className="modHistoryFormTableTbodyTr">
                                <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">당첨취소</span>
                                </td>
                                <td className="modMemberFormTableTbodyTrTd">
                                    <input
                                        className="cancelWinYnInput"
                                        type="radio"
                                        name="cancelWinYn"
                                        onChange={onHistoryChange}
                                        value="y"
                                        checked={
                                            history.cancelWinYn === 'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />{' '}
                                    <span className="historyInputText">
                                        취소
                                    </span>
                                    <input
                                        className="cancelWinYnInput"
                                        type="radio"
                                        name="cancelWinYn"
                                        onChange={onHistoryChange}
                                        value="n"
                                        checked={
                                            history.cancelWinYn === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="historyInputText">
                                        유지
                                    </span>
                                </td>
                            </tr>
                        ) : null}
                        {history.result === '당첨' ? (
                            <tr className="modHistoryFormTableTbodyTr">
                                <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">부적격여부</span>
                                </td>
                                <td className="modHistoryFormTableTbodyTrTd">
                                    <input
                                        className="cancelYnInput"
                                        type="radio"
                                        name="isIneligible"
                                        onChange={(e) => {
                                            setIneligible({
                                                ...ineligible,
                                                isIneligible: e.target.value,
                                            });
                                        }}
                                        value="y"
                                        checked={
                                            ineligible.isIneligible === 'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />{' '}
                                    <span className="historyInputText">
                                        부적격
                                    </span>
                                    <input
                                        className="cancelYnInput"
                                        type="radio"
                                        name="isIneligible"
                                        onChange={(e) => {
                                            setIneligible({
                                                ...ineligible,
                                                isIneligible: e.target.value,
                                            });
                                        }}
                                        value="n"
                                        checked={
                                            ineligible.isIneligible === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="historyInputText">
                                        부적격 아님
                                    </span>
                                </td>
                            </tr>
                        ) : null}
                        {ineligible.isIneligible === 'y' ? (
                            <tr className="modHistoryFormTableTbodyTr">
                                <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        부적격통보날짜
                                    </span>
                                </td>
                                <td className="modHistoryFormTableTbodyTrTd">
                                    <input
                                        className="cancelYnInput"
                                        type="date"
                                        name="date"
                                        onChange={(e) => {
                                            setIneligible({
                                                ...ineligible,
                                                date: e.target.value,
                                            });
                                        }}
                                        value={ineligible.date}
                                        required
                                    />
                                </td>
                            </tr>
                        ) : null}
                        {!history.houseMemberChungyakRestrictionReadDto ? (
                            <tr className="modHistoryFormTableTbodyTr">
                                <td className="modHistoryFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        제한사항여부
                                    </span>
                                </td>
                                <td className="modHistoryFormTableTbodyTrTd">
                                    <input
                                        className="cancelYnInput"
                                        type="radio"
                                        name="haveLimit"
                                        onChange={() => {
                                            setHaveLimit(true);
                                        }}
                                        value="true"
                                        checked={haveLimit}
                                        required
                                    />{' '}
                                    <span className="historyInputText">
                                        있음
                                    </span>
                                    <input
                                        className="cancelYnInput"
                                        type="radio"
                                        name="haveLimit"
                                        onChange={() => {
                                            setHaveLimit(false);
                                        }}
                                        value="false"
                                        checked={!haveLimit}
                                        required
                                    />
                                    <span className="historyInputText">
                                        없음
                                    </span>
                                </td>
                            </tr>
                        ) : (
                            <></>
                        )}
                        <tr className="modHistoryFormTableTbodyTr">
                            <td
                                colSpan="3"
                                className="modHistoryFormTableTbodyTrTd"
                            >
                                <div className="buttonContainer">
                                    <SubButton
                                        type="back"
                                        className="list"
                                        width="80"
                                        height="30"
                                        onClick={() =>
                                            _history.push('/histories', {
                                                houseState: houseState,
                                                haveAssets: haveAssets,
                                                ineligibleDate: ineligibleDate,
                                                memberId: memberId,
                                            })
                                        }
                                    >
                                        목록으로
                                    </SubButton>
                                    <MainButton
                                        type="submit"
                                        className="save"
                                        width="80"
                                        height="30"
                                        // onClick={handleSubmit}
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

export default ModHistory;
