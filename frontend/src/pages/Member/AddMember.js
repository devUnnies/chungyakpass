import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
    addMem,
    addMemAddInfo,
    patHolder,
} from '../../store/actions/commonInfoAction';
import MainButton from '../../components/Button/MainButton';
import SubButton from '../../components/Button/SubButton';
import MonthAverageIncomeTable from './MonthAverageIncomeTable';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './Member.css';
import Tooltip from '../../components/Tooltip/Tooltip';

const AddMember = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const commonInfoStore = useSelector((state) => state.commonInfo);
    const houseId = location.state.houseId;
    const [addInfo, setAddInfo] = useState({
        houseMemberId: '',
        parentsDeathYn: 'n',
        divorceYn: 'n',
        sameResidentRegistrationYn: 'y',
        stayOverYn: 'n',
        nowStayOverYn: 'n',
    });
    const [info, setInfo] = useState({
        houseId: houseId,
        name: '',
        birthDay: '',
        foreignerYn: '',
        homelessStartDate: '',
        relation: '',
        householderYn: '',
        soldierYn: 'n',
        isMarried: null,
        marriedDate: '',
        transferDate: '',
        income: '0',
    });
    const [haveHistories, setHaveHistories] = useState(null);
    const [haveAssets, setHaveAssets] = useState(null);
    const [failMsg, setFailMsg] = useState(null);

    const houseState = location.state.houseState;

    const onAddInfoChange = (e) => {
        const { name, value } = e.target;
        setAddInfo({
            ...addInfo,
            [name]: value,
        });
    };

    const onInfoChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userForm = {
            houseId: info.houseId,
            relation: info.relation,
            name: info.name,
            birthDay: info.birthDay,
            foreignerYn: info.foreignerYn,
            soldierYn: info.soldierYn,
            marriageDate: info.isMarried === 'y' ? info.marriedDate : null,
            homelessStartDate: info.homelessStartDate,
            transferDate: info.transferDate,
            income: info.income,
        };

        // console.log('제출 버튼 눌렀습니다 !!!!' + JSON.stringify(userForm));
        if (failMsg)
            alert('부적격판단을 받을 수 있는 항목을 선택하셨습니다 !!');
        else dispatch(addMem(userForm));
    };

    useEffect(() => {
        if (
            Number(new Date(info.birthDay)) >
            Number(new Date(info.homelessStartDate))
        ) {
            setFailMsg('!!!');
        } else {
            setFailMsg(null);
        }
    }, [info]);

    // useEffect(() => {
    //     if (addInfo.sameResidentRegistrationYn === 'n') {
    //         setFailMsg('!!!');
    //     } else {
    //         setFailMsg();
    //     }
    // }, [addInfo.sameResidentRegistrationYn]);

    useEffect(() => {
        if (houseId) setInfo({ ...info, houseId: houseId });
    }, [houseId]);

    useEffect(() => {
        return setInfo({ ...info, homelessStartDate: info.birthDay });
    }, [info.birthDay]);

    useEffect(() => {
        const member = commonInfoStore.addMem.data;
        if (member) {
            if (
                member.status === 400 ||
                member.status === 404 ||
                member.status === 409
            ) {
                alert(member.message);
            } else {
                const add = {
                    ...addInfo,
                    houseMemberId: member.id,
                };
                dispatch(addMemAddInfo(add));

                // 세대주 등록 !
                if (info.householderYn === 'y') {
                    const userForm = {
                        houseId: info.houseId,
                        memberId: member.id,
                    };
                    dispatch(patHolder(userForm));
                }
                // 청약이력 목록 화면으로
                if (haveHistories === 'y') {
                    history.push('/histories', {
                        houseState: houseState,
                        haveAssets: haveAssets,
                        memberId: member.id,
                        pos: -1,
                    });
                } else {
                    if (haveAssets === 'y')
                        history.push('/assets', {
                            ineligibleDate: new Date('0000-00-00'),
                            pos: -1,
                            memberId: member.id,
                        });
                    else
                        history.push('/members', {
                            houseState: houseState,
                        });
                }
            }
        }
    }, [commonInfoStore.addMem]);

    return (
        <div className="addMemberContainer">
            <div className="menuContainer">
                <div className="oneMenuSelect">
                    <h4 className="oneMenuSelect">세대구성원 등록</h4>
                </div>

                <div className="oneMenu">
                    <h4 className="oneMenu">청약이력 등록</h4>
                </div>

                <div className="oneMenu">
                    <h4 className="oneMenu">자산 등록</h4>
                </div>
            </div>
            <div className="addMemberHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">
                    세대구성원 등록 -{' '}
                    {houseState === 'my'
                        ? '신청자 본인 세대'
                        : '배우자 분리 세대'}
                </span>
            </div>
            <div className="addMemberFormContainer">
                {/* <form
                    onSubmit={() => handleSubmit}
                    className="addMemberForm"
                    name="addMember"
                > */}
                <table className="addMemberFormTable">
                    <tbody className="addMemberFormTableTbody">
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    동세대 거주 여부
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="sameResidentRegistrationYn"
                                    onChange={onAddInfoChange}
                                    value="y"
                                    checked={
                                        addInfo.sameResidentRegistrationYn ===
                                        'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    예{'  '}
                                </span>
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="sameResidentRegistrationYn"
                                    onChange={onAddInfoChange}
                                    value="n"
                                    checked={
                                        addInfo.sameResidentRegistrationYn ===
                                        'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    아니오
                                </span>
                            </td>
                            <Tooltip
                                message={
                                    <div className="textTooltip">
                                        최근 3년 이상 동일한 주민등록표상에
                                        등재되어있는지에 대한 질문입니다.
                                    </div>
                                }
                                width={150}
                                height={100}
                            >
                                <ExclamationCircleOutlined className="tooltipIcon" />
                            </Tooltip>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">이름</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="nameInput"
                                    name="name"
                                    value={info.name}
                                    onChange={onInfoChange}
                                    required
                                />
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">생년월일</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="birthdateInput"
                                    type="date"
                                    name="birthDay"
                                    value={info.birthDay}
                                    onChange={onInfoChange}
                                    required
                                />
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">외국인 여부</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="foreignerInput"
                                    type="radio"
                                    name="foreignerYn"
                                    onChange={onInfoChange}
                                    value="y"
                                    checked={
                                        info.foreignerYn === 'y' ? true : false
                                    }
                                    required
                                />
                                <span className="foreignerInputText">
                                    {' '}
                                    외국인{'  '}
                                </span>
                                <input
                                    className="foreignerInput"
                                    type="radio"
                                    name="foreignerYn"
                                    onChange={onInfoChange}
                                    value="n"
                                    checked={
                                        info.foreignerYn === 'n' ? true : false
                                    }
                                    required
                                />
                                <span className="foreignerInputText">
                                    내국인
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>

                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    신청자와의 관계
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <select
                                    className="relationshipSelect"
                                    name="relation"
                                    value={info.relation}
                                    onChange={onInfoChange}
                                    required
                                >
                                    <option value=""> ---선택--- </option>
                                    <option value="본인">본인</option>
                                    <option value="배우자">배우자</option>
                                    <option value="모">모</option>
                                    <option value="부">부</option>
                                    <option value="자녀_일반">자녀_일반</option>
                                    <option value="자녀_태아">자녀_태아</option>
                                    <option value="배우자의모">
                                        배우자의 모
                                    </option>
                                    <option value="배우자의부">
                                        배우자의 부
                                    </option>
                                    <option value="자녀의배우자">
                                        자녀의 배우자
                                    </option>
                                    <option value="조모">조모</option>
                                    <option value="조부">조부</option>
                                    <option value="손자녀">손자녀</option>
                                    <option value="손자녀의배우자">
                                        손자녀의 배우자
                                    </option>
                                    <option value="배우자의조모">
                                        배우자의 조모
                                    </option>
                                    <option value="배우자의조부">
                                        배우자의 조부
                                    </option>
                                </select>
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">세대주 여부</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="householderInput"
                                    type="radio"
                                    name="householderYn"
                                    onChange={onInfoChange}
                                    value="y"
                                    checked={
                                        info.householderYn === 'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="householderInputText">
                                    {' '}
                                    세대주이다{'  '}
                                </span>
                                <input
                                    className="householderInput"
                                    type="radio"
                                    name="householderYn"
                                    onChange={onInfoChange}
                                    value="n"
                                    checked={
                                        info.householderYn === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="householderInputText">
                                    {' '}
                                    세대주가 아니다
                                </span>
                            </td>
                        </tr>
                        {info.relation === '본인' ? (
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        장기복무 여부
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="isSoldierInput"
                                        type="radio"
                                        name="soldierYn"
                                        onChange={onInfoChange}
                                        value="y"
                                        checked={
                                            info.soldierYn === 'y'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="isSoldierInputText">
                                        {' '}
                                        예{'  '}
                                    </span>
                                    <input
                                        className="isSoldierInput"
                                        type="radio"
                                        name="soldierYn"
                                        onChange={onInfoChange}
                                        value="n"
                                        checked={
                                            info.soldierYn === 'n'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="isSoldierInputText">
                                        {' '}
                                        아니오{'  '}
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}

                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">무주택시작일</span>
                                {` `}
                            </td>
                            <td className="addMemberFormTableTbodyTrTdTooltip">
                                <input
                                    className="homelessStartDateInput"
                                    type="input"
                                    name="homelessStartDate"
                                    value={
                                        info.homelessStartDate
                                            ? info.homelessStartDate
                                            : '0000-00-00'
                                    }
                                    onChange={onInfoChange}
                                    disabled
                                />
                            </td>
                            <td>
                                <Tooltip
                                    message={
                                        <div className="textTooltip">
                                            자산 입력 전일 경우 생년월일
                                            기준으로 자동 계산됩니다.
                                        </div>
                                    }
                                    width={150}
                                    height={100}
                                >
                                    <ExclamationCircleOutlined className="tooltipIcon" />
                                </Tooltip>
                            </td>
                            <td>
                                {Number(new Date(info.birthDay)) >
                                Number(new Date(info.homelessStartDate)) ? (
                                    <span className="failMsg">{failMsg}</span>
                                ) : null}
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">전입신고일</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="transferDateInput"
                                    type="date"
                                    name="transferDate"
                                    value={info.transferDate}
                                    onChange={onInfoChange}
                                    required
                                />
                            </td>
                        </tr>

                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">혼인 여부</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                {' '}
                                <input
                                    className="isMarriedInput"
                                    type="radio"
                                    name="isMarried"
                                    onChange={onInfoChange}
                                    value="n"
                                    checked={
                                        info.isMarried === 'n' ? true : false
                                    }
                                />
                                <span className="isMarriedInputText">
                                    {' '}
                                    결혼한 상태가 아닙니다{'  '}
                                </span>
                                <input
                                    className="isMarriedInput"
                                    type="radio"
                                    name="isMarried"
                                    onChange={onInfoChange}
                                    value="y"
                                    checked={
                                        info.isMarried === 'y' ? true : false
                                    }
                                />
                                <span className="isMarriedInputText">
                                    {' '}
                                    결혼한 상태입니다{'  '}
                                </span>
                            </td>
                        </tr>
                        {(info.relation === '본인' ||
                            info.relation === '배우자') &&
                        info.isMarried === 'y' ? (
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">혼인신고일</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="marriedDateInput"
                                        type="date"
                                        name="marriedDate"
                                        value={info.marriedDate}
                                        onChange={onInfoChange}
                                    />
                                </td>
                            </tr>
                        ) : null}
                        {info.relation !== '본인' &&
                        info.relation !== '배우자' &&
                        info.isMarried === 'n' ? (
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">이혼여부</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="assetHaveAssetsInput"
                                        type="radio"
                                        name="divorceYn"
                                        onChange={onAddInfoChange}
                                        value="y"
                                        checked={
                                            addInfo.divorceYn === 'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetHaveAssetsInputText">
                                        {' '}
                                        있습니다{'  '}
                                    </span>
                                    <input
                                        className="assetHaveAssetsInput"
                                        type="radio"
                                        name="divorceYn"
                                        onChange={onAddInfoChange}
                                        value="n"
                                        checked={
                                            addInfo.divorceYn === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetHaveAssetsInputText">
                                        {' '}
                                        없습니다
                                    </span>
                                </td>
                            </tr>
                        ) : null}
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">부모사망이력</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="parentsDeathYn"
                                    onChange={onAddInfoChange}
                                    value="y"
                                    checked={
                                        addInfo.parentsDeathYn === 'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    있습니다{'  '}
                                </span>
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="parentsDeathYn"
                                    onChange={onAddInfoChange}
                                    value="n"
                                    checked={
                                        addInfo.parentsDeathYn === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    없습니다
                                </span>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">월 평균 소득</span>
                                {` `}
                            </td>
                            <td className="addMemberFormTableTbodyTrTdTooltip">
                                <input
                                    className="incomeInput"
                                    type="number"
                                    name="income"
                                    onChange={onInfoChange}
                                    value={info.income}
                                    required
                                />
                                <span className="incomeUnit">원</span>
                            </td>
                            <td>
                                <Tooltip
                                    message={<MonthAverageIncomeTable />}
                                    width={200}
                                    height={200}
                                >
                                    <ExclamationCircleOutlined className="tooltipIcon" />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    해외나 요양시설 체류중 여부
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="nowStayOverYn"
                                    onChange={onAddInfoChange}
                                    value="y"
                                    checked={
                                        addInfo.nowStayOverYn === 'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    예{'  '}
                                </span>
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="nowStayOverYn"
                                    onChange={onAddInfoChange}
                                    value="n"
                                    checked={
                                        addInfo.nowStayOverYn === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    아니오
                                </span>
                            </td>
                            <td>
                                <Tooltip
                                    message={
                                        <div className="textTooltip">
                                            최근 3년 이내에 입주자모집공고일
                                            기준 연속으로 90일을 초과하여 해외나
                                            요양시설에 체류하고 있는지에 대한
                                            질문입니다.
                                        </div>
                                    }
                                    width={150}
                                    height={100}
                                >
                                    <ExclamationCircleOutlined className="tooltipIcon" />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    해외나 요양시설 체류이력
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="stayOverYn"
                                    onChange={onAddInfoChange}
                                    value="y"
                                    checked={
                                        addInfo.stayOverYn === 'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    있습니다{'  '}
                                </span>
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="stayOverYn"
                                    onChange={onAddInfoChange}
                                    value="n"
                                    checked={
                                        addInfo.stayOverYn === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    없습니다
                                </span>
                            </td>
                            <td>
                                <Tooltip
                                    message={
                                        <div className="textTooltip">
                                            최근 3년 이내에 입주자모집공고일
                                            기준 연속으로 90일을 초과하여 해외나
                                            요양시설에 체류한 적이 있는지에 대한
                                            질문입니다.
                                        </div>
                                    }
                                    width={150}
                                    height={100}
                                >
                                    <ExclamationCircleOutlined className="tooltipIcon" />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">청약이력</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="haveHistories"
                                    onChange={(e) => {
                                        setHaveHistories(e.target.value);
                                    }}
                                    value="y"
                                    checked={
                                        haveHistories === 'y' ? true : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    있습니다{'  '}
                                </span>
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="haveHistories"
                                    onChange={(e) => {
                                        setHaveHistories(e.target.value);
                                    }}
                                    value="n"
                                    checked={
                                        haveHistories === 'n' ? true : false
                                    }
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    없습니다
                                </span>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">자산유무</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="haveAssets"
                                    onChange={(e) => {
                                        setHaveAssets(e.target.value);
                                    }}
                                    value="y"
                                    checked={haveAssets === 'y' ? true : false}
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    있습니다{'  '}
                                </span>
                                <input
                                    className="assetHaveAssetsInput"
                                    type="radio"
                                    name="haveAssets"
                                    onChange={(e) => {
                                        setHaveAssets(e.target.value);
                                    }}
                                    value="n"
                                    checked={haveAssets === 'n' ? true : false}
                                    required
                                />
                                <span className="assetHaveAssetsInputText">
                                    {' '}
                                    없습니다
                                </span>
                            </td>
                            <td>
                                <Tooltip
                                    message={
                                        <div className="textTooltip">
                                            자산은 자동차, 토지, 주거용 건물, 비
                                            주거용 건물을 의미합니다.
                                        </div>
                                    }
                                    width={150}
                                    height={100}
                                >
                                    <ExclamationCircleOutlined className="tooltipIcon" />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5">
                                <div className="saveButtonContainer">
                                    <MainButton
                                        type="submit"
                                        className="save"
                                        width="80"
                                        height="30"
                                        onClick={handleSubmit}
                                    >
                                        저장
                                    </MainButton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* </form> */}
            </div>

            <div className="backButton">
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
    );
};

export default AddMember;
