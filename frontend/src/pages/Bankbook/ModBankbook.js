import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './BankBook.css';
import MainButton from '../../components/Button/MainButton';
import { getHouse, modBank } from '../../store/actions/commonInfoAction';
import { useHistory, useLocation } from 'react-router';

const ModBankbook = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const commonInfoStore = useSelector((state) => state.commonInfo);
    const history = useHistory();
    const item = location.state?.item ? location.state.item : undefined;
    const [account, setAccount] = useState({
        bank: '',
    });

    const [failMsg, setFailMsg] = useState(null);

    const onAccountChange = (e) => {
        const { name, value } = e.target;
        setAccount({
            ...account,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (failMsg === null) {
            console.log('등록할 통장 정보 !!!! ' + JSON.stringify(account));

            // 디스패치가 들어올 공간
            dispatch(modBank(account));

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
        const data = commonInfoStore.getBank.data;
        if (data) {
            if (
                data.status === 400 ||
                data.status === 404 ||
                data.status === 409
            ) {
                alert(data.message);
                history.push('/');
            } else {
                if (item) setAccount(item);
                else setAccount(data);
            }
        }
    }, [commonInfoStore.getBank]);

    // 디스패치 이후 데이터 인식해서 데이터가 들어왔으면
    // 세대를 선택하는 화면으로 보내기
    useEffect(() => {
        const data = commonInfoStore.modBank.data;
        if (data) {
            if (data.status === 409) {
                alert(data.message);
            }
        }
    }, [commonInfoStore.modBank]);

    useEffect(() => {
        const data = commonInfoStore.getHouse.data;
        if (data) {
            if (data.status === 404) {
                history.push('/selectHouse');
            } else {
                // 분리세대 등록하는 거 다시 확인하고 추가 할 것 !!!!!!!!
                // history.push('/selectHouse');
                console.log('통장은 등록되어있고 세대가 등록 안되어있는 경우');
            }
        }
    }, [commonInfoStore.getHouse]);

    return (
        <div className="modBankbookContainer">
            <div className="modBankbookHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">청약통장 수정</span>
            </div>

            <form
                className="modBankbookForm"
                onSubmit={handleSubmit}
                name="modBankbook"
            >
                <table className="modBankbookFormTable">
                    <tbody className="modBankbookFormTableTbody">
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">개설은행</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
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
                            <td className="modMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">청약통장종류</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
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
                            <td className="modMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">가입일</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
                                <input
                                    className="joinDateInput"
                                    type="date"
                                    name="joinDate"
                                    value={account.joinDate}
                                    onChange={onAccountChange}
                                />
                            </td>
                            <td className="modMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">예치금액</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
                                <input
                                    className="depositInput"
                                    type="number"
                                    name="deposit"
                                    value={account.deposit}
                                    onChange={onAccountChange}
                                />
                                <span> 원</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">납입횟수</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
                                <input
                                    className="paymentsCountInput"
                                    type="number"
                                    name="paymentsCount"
                                    value={Number(account.paymentsCount)}
                                    onChange={onAccountChange}
                                />
                                <span> 회</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTdError"></td>
                        </tr>

                        <tr className="modMemberFormTableTbodyTr">
                            <td
                                className="modMemberFormTableTbodyTrTd"
                                colSpan="3"
                            >
                                <div className="saveButtonContainer">
                                    <MainButton
                                        type="submit"
                                        className="save"
                                        width="80"
                                        height="30"
                                    >
                                        수정
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

export default ModBankbook;
