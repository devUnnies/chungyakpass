import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
    addMem,
    modMem,
    getMem,
    patHolder,
    getChung,
    getAsse,
    modMemAddInfo,
    getHouse,
} from '../../store/actions/commonInfoAction';
import MainButton from '../../components/Button/MainButton';
import SubButton from '../../components/Button/SubButton';
import MonthAverageIncomeTable from './MonthAverageIncomeTable';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './Member.css';
import Tooltip from '../../components/Tooltip/Tooltip';

const ModMember = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const commonInfoStore = useSelector((state) => state.commonInfo);
    const houseId = location.state.houseId;
    const [edited, setEdited] = useState(location.state.selectedData);
    const [info, setInfo] = useState(location.state.selectedData);
    const [addInfo, setAddInfo] = useState(
        location.state.selectedData.houseMemberAdditionalInfoResponseDto
    );
    const [haveHistories, setHaveHistories] = useState(null);
    const [haveAssets, setHaveAssets] = useState(null);
    const [failMsg, setFailMsg] = useState(null);

    const houseState = location.state.houseState;

    console.log('수정 아이템 !! ' + JSON.stringify(info));

    useEffect(() => {
        dispatch(getChung(edited.id));
        dispatch(getAsse(edited.id));
        dispatch(getHouse());
    }, []);

    useEffect(() => {
        const data = commonInfoStore.getHouse.data;

        if (data) {
            if (houseState === 'my') {
                if (data.houseResponseDto.houseHolderId) {
                    if (info.id === data.houseResponseDto.houseHolderId)
                        setInfo({ ...info, householderYn: 'y' });
                } else {
                    setInfo({ ...info, householderYn: 'n' });
                }
            } else if (houseState === 'spouse') {
                if (data.spouseHouseResponseDto.houseHolderId) {
                    if (info.id === data.spouseHouseResponseDto.houseHolderId)
                        setInfo({ ...info, householderYn: 'y' });
                } else {
                    setInfo({ ...info, householderYn: 'n' });
                }
            }
        }
    }, [commonInfoStore.getHouse]);

    useEffect(() => {
        if (commonInfoStore.getChungyak.loading) {
            setHaveHistories('y');
        } else {
            if (commonInfoStore.getChungyak.data) setHaveHistories('n');
            else setHaveHistories('y');
        }

        if (commonInfoStore.getAssets.loading) {
            setHaveAssets('y');
        } else if (commonInfoStore.getAssets.data) {
            if (commonInfoStore.getAssets.data) setHaveAssets('n');
            else setHaveAssets('y');
        }
    }, [commonInfoStore.getChungyak, commonInfoStore.getAssets]);

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

    const onSubmitEdit = (e) => {
        e.preventDefault();

        console.log(
            '저장 !!!!  ' + JSON.stringify(info),
            houseId,
            haveAssets,
            haveHistories
        );
        dispatch(modMemAddInfo(addInfo));
        dispatch(modMem(info));
        // handleEditSubmit(edited);
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

    useEffect(() => {
        if (addInfo.sameResidentRegistrationYn === 'n') {
            setFailMsg('!!!');
        } else {
            setFailMsg();
        }
    }, [addInfo?.sameResidentRegistrationYn]);

    useEffect(() => {}, [addInfo]);

    useEffect(() => {
        return setInfo({ ...info, homelessStartDate: info.birthDay });
    }, [info.birthDay]);

    useEffect(() => {
        const member = commonInfoStore.modMem.data;
        if (member) {
            if (
                member.status === 400 ||
                member.status === 404 ||
                member.status === 409
            ) {
                alert(member.message);
            } else {
                // 세대주 등록 !
                if (info.householderYn === 'y') {
                    const userForm = {
                        houseId: houseId,
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
                        pos: -2,
                    });
                } else {
                    if (haveAssets === 'y')
                        history.push('/assets', {
                            ineligibleDate: new Date('0000-00-00'),
                            pos: -1,
                        });
                    else {
                        history.push('/members', {
                            houseState: houseState,
                        });

                        if (houseState === 'my')
                            dispatch(
                                getMem(
                                    commonInfoStore.getHouse.data
                                        ?.houseResponseDto?.id
                                )
                            );
                        else
                            dispatch(
                                getMem(
                                    commonInfoStore.getHouse.data
                                        ?.spouseHouseResponseDto?.id
                                )
                            );
                    }
                }
            }
        }
    }, [commonInfoStore.modMem]);

    return (
        <div className="modMemberContainer">
            <div className="menuContainer">
                <div className="oneMenuSelect">
                    <h4 className="oneMenuSelect">세대구성원 수정</h4>
                </div>

                <div className="oneMenu">
                    <h4 className="oneMenu">청약이력 수정</h4>
                </div>

                <div className="oneMenu">
                    <h4 className="oneMenu">자산 수정</h4>
                </div>
            </div>
            <div className="modMemberHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">
                    세대구성원 수정 -{' '}
                    {houseState === 'my'
                        ? '신청자 본인 세대'
                        : '배우자 분리 세대'}
                </span>
            </div>
            <div className="modMemberFormContainer">
                <table className="modMemberFormTable">
                    <tbody className="modMemberFormTableTbody">
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
                            <td className="addMemberFormTableTbodyTrTdError">
                                {failMsg}
                            </td>
                        </tr>
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">이름</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
                                <input
                                    className="nameInput"
                                    name="name"
                                    value={info.name}
                                    onChange={onInfoChange}
                                    required
                                />
                            </td>
                            <td className="modMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">생년월일</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
                                <input
                                    className="birthdateInput"
                                    type="date"
                                    name="birthDay"
                                    value={info.birthDay}
                                    onChange={onInfoChange}
                                    required
                                />
                            </td>
                            <td className="modMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">외국인 여부</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
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
                                    {' '}
                                    내국인
                                </span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTdError"></td>
                        </tr>

                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    신청자와의 관계
                                </span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
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
                            <td className="modMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">세대주 여부</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
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
                            <tr className="modMemberFormTableTbodyTr">
                                <td className="modMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        장기복무 여부
                                    </span>
                                </td>
                                <td className="modMemberFormTableTbodyTrTd">
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
                                <td className="modMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}

                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">무주택시작일</span>
                                {` `}
                            </td>
                            <td className="modMemberFormTableTbodyTrTdTooltip">
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
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">전입신고일</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
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

                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">혼인 여부</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
                                {' '}
                                <input
                                    className="isMarriedInput"
                                    type="radio"
                                    name="isMarried"
                                    onChange={onInfoChange}
                                    value="n"
                                    checked={
                                        !info.marriedDate ||
                                        info.isMarried === 'n'
                                            ? true
                                            : false
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
                                        info.marriedDate ||
                                        info.isMarried === 'y'
                                            ? true
                                            : false
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
                            <tr className="modMemberFormTableTbodyTr">
                                <td className="modMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">혼인신고일</span>
                                </td>
                                <td className="modMemberFormTableTbodyTrTd">
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
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">월 평균 소득</span>
                                {` `}
                            </td>
                            <td className="modMemberFormTableTbodyTrTdTooltip">
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
                        </tr>
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">청약이력</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
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
                        <tr className="modMemberFormTableTbodyTr">
                            <td className="modMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">자산유무</span>
                            </td>
                            <td className="modMemberFormTableTbodyTrTd">
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
                                    <SubButton
                                        type="back"
                                        className="back"
                                        onClick={() => {
                                            history.goBack(-1);
                                        }}
                                    >
                                        목록으로
                                    </SubButton>
                                    <MainButton
                                        type="submit"
                                        className="save"
                                        width="80"
                                        height="30"
                                        onClick={onSubmitEdit}
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
        </div>
    );
};

export default ModMember;
