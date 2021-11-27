import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './BankBook.css';
import MainButton from '../../components/Button/MainButton';
import { addBank } from '../../store/actions/commonInfoAction';
import { useHistory } from 'react-router';

const AddBankbook = () => {
    const [account, setAccount] = useState({
        bank: '',
        bankbook: '',
        joinDate: '',
        deposit: 0,
        paymentsCount: 0,
    });
    const [validYn, setValidYn] = useState();
    const [failMsg, setFailMsg] = useState(null);

    const dispatch = useDispatch();
    const commonInfoStore = useSelector((state) => state.commonInfo);
    const history = useHistory();

    const onAccountChange = (e) => {
        const { name, value } = e.target;
        setAccount({
            ...account,
            [name]: value,
        });
    };

    const onValidYnChange = (e) => {
        setValidYn(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (failMsg === null) {
            console.log('등록할 통장 정보 !!!! ' + JSON.stringify(account));

            // 디스패치가 들어올 공간
            dispatch(addBank(account));

            setAccount({
                bank: '',
                bankbook: '',
                joinDate: '',
                deposit: 0,
                paymentsCount: 0,
            });
        } else {
            alert('부적격 받은 사례가 있는 항목을 선택하셨습니다 !');
        }
    };

    useEffect(() => {
        if (validYn === 'n') {
            setFailMsg('!!');
        } else {
            setFailMsg(null);
        }
    }, [validYn]);

    // 디스패치 이후 데이터 인식해서 데이터가 들어왔으면
    // 세대를 선택하는 화면으로 보내기
    useEffect(() => {
        const data = commonInfoStore.addBank.data;
        if (data) {
            if (data.status === 409) {
                alert(data.message);
            }
            history.push('/bankbook');
        }
    }, [commonInfoStore.addBank]);

    return (
        <div className="addBankbookContainer">
            <div className="addBankbookHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">청약통장 등록</span>
            </div>

            <form
                className="addBankbookForm"
                onSubmit={handleSubmit}
                name="addBankbook"
            >
                <table className="addBankbookFormTable">
                    <tbody className="addBankbookFormTableTbody">
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">개설은행</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <select
                                    className="bankSelect"
                                    name="bank"
                                    value={account.bank}
                                    onChange={onAccountChange}
                                >
                                    <option value=""> ---선택--- </option>
                                    <option value="국민">국민</option>
                                    <option value="기업">기업</option>
                                    <option value="농협">농협</option>
                                    <option value="신한">신한</option>
                                    <option value="우리">우리</option>
                                    <option value="하나">하나</option>
                                </select>
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">청약통장종류</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <select
                                    className="bankbookSelect"
                                    name="bankbook"
                                    value={account.bankbook}
                                    onChange={onAccountChange}
                                    required
                                >
                                    <option value=""> ---선택--- </option>
                                    <option value="주택청약종합저축">
                                        주택청약종합저축
                                    </option>
                                    <option value="청약저축">청약저축</option>
                                    <option value="청약예금">청약예금</option>
                                    <option value="청약부금">청약부금</option>
                                </select>
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">가입일</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="joinDateInput"
                                    type="date"
                                    name="joinDate"
                                    value={account.joinDate}
                                    onChange={onAccountChange}
                                />
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">예치금액</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="depositInput"
                                    type="number"
                                    name="deposit"
                                    value={account.deposit}
                                    onChange={onAccountChange}
                                />
                                <span> 원</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">납입횟수</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="paymentsCountInput"
                                    type="number"
                                    name="paymentsCount"
                                    value={account.paymentsCount}
                                    onChange={onAccountChange}
                                />
                                <span> 회</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">유효여부</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="validYnInput"
                                    type="radio"
                                    name="validYn"
                                    onChange={onValidYnChange}
                                    value="y"
                                    checked={validYn === 'y' ? true : false}
                                    required
                                />
                                <span className="validYnInputText">예</span>
                                <input
                                    className="validYnInput"
                                    type="radio"
                                    name="validYn"
                                    onChange={onValidYnChange}
                                    value="n"
                                    checked={validYn === 'n' ? true : false}
                                    required
                                />
                                <span className="validYnInputText">아니오</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError">
                                {validYn === 'n' ? (
                                    <div>
                                        <span className="failMsg">
                                            {failMsg}
                                        </span>
                                    </div>
                                ) : null}
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td
                                className="addMemberFormTableTbodyTrTd"
                                colSpan="3"
                            >
                                <div className="saveButtonContainer">
                                    <MainButton
                                        type="submit"
                                        // className="save"
                                        width="80"
                                        height="30"
                                    >
                                        등록
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

export default AddBankbook;
