import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import MainButton from '../../components/Button/MainButton';
import SubButton from '../../components/Button/SubButton';
import { modAsse } from '../../store/actions/commonInfoAction';

const ModAsset = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const pos = location.state.pos;
    const ineligibleDate = location.state.ineligibleDate;
    const birthDay = location.state.birthDay;
    let startDates = location.state.startDates;
    const memberId = location.state.memberId;
    const houseState = location.state.houseState;

    const commonInfoStore = useSelector((state) => state.commonInfo);

    const [asset, setAsset] = useState(location.state.asset);
    const [logicData, setLogicData] = useState({
        isInheritance: '',
        conditionType: '',
    });
    const [isNoStruct, setIsNoStruct] = useState(false);
    const [startDate, setStartDate] = useState(new Date('1500/01/01'));
    const [ineliDate, setIneliDate] = useState(
        new Date(ineligibleDate).getMonth() + 3
    );

    const [failMsg, setFailMsg] = useState(null);

    console.log(JSON.stringify(asset));

    const logic = () => {
        // console.log('ADD !!!! ' + JSON.stringify(asset));
        // console.log('시작일 !!! ' + startDate);
        // console.log(asset.property === '자동차');
        if (asset.property === '건물') {
            setIsNoStruct(false);

            if (asset.property === '건물' && asset.dispositionDate) {
                // 3개월 이내 처분한 상속주택인지?
                if (
                    logicData.isInheritance === 'y' &&
                    new Date(asset.dispositionDate) <= ineliDate
                ) {
                    setIsNoStruct(true);
                    setAsset({ ...asset, exceptionHouseYn: 'y' });

                    // 폐가, 무허가 건물, 문화재로 지정된 주택, 미분양된 주택, 사업 목적인지?
                    if (logicData.conditionType !== '') {
                        setIsNoStruct(true);
                        setAsset({ ...asset, exceptionHouseYn: 'y' });

                        // 소형 주택인지?
                        if (
                            (asset.residentialBuilding === '단독주택' ||
                                asset.residentialBuilding === '공동주택') &&
                            Number(asset.exclusiveArea) <= 60
                        ) {
                            setIsNoStruct(true);
                            setAsset({ ...asset, exceptionHouseYn: 'y' });
                        }
                    }
                }

                if (startDates) {
                    startDates = [
                        ...startDates,
                        { startDate: asset.dispositionDate },
                    ];
                } else {
                    startDates = [{ startDate: asset.dispositionDate }];
                }
            } else {
                setIsNoStruct(false);
                setStartDate(null);
                setAsset({ ...asset, exceptionHouseYn: 'n' });
            }

            return;
        } else if (asset.property === '자동차') {
            setIsNoStruct(true);
            setStartDate(birthDay);

            return;
        }
    };

    useEffect(() => {
        const data = commonInfoStore.modAssets.data;
        if (data) {
            if (
                data.status === 400 ||
                data.status === 404 ||
                data.status === 409
            ) {
                alert(data.message);
            } else {
                history.goBack(pos, { houseState: houseState });
            }
        }
    }, [commonInfoStore.modAssets]);

    useEffect(() => {
        if (asset.property === '자동차') {
            setAsset({
                ...asset,
                saleRightYn: null,
                exceptionHouseYn: null,
                nonResidentialBuilding: null,
                residentialBuilding: null,
                residentialBuildingYn: null,
            });
            setLogicData({ ...logicData, isInheritance: null });
        } else {
        }
    }, [asset.property]);

    useEffect(() => {
        if (asset.property === '건물' && startDates)
            startDates = [...startDates, { startDate: startDate }];
    }, [startDate]);

    useEffect(() => {
        if (asset.property === '건물') setStartDate(asset.dispositionDate);
    }, [asset.dispositionDate]);

    // 체크해서 아닐 때는 값 없도록
    useEffect(() => {
        if (asset.residentialBuildingYn === 'y') {
            setAsset({ ...asset, nonResidentialBuilding: null });
        } else {
            setAsset({ ...asset, residentialBuilding: null });
        }
    }, [asset.residentialBuildingYn]);

    useEffect(() => {
        if (asset.property === '자동차') {
            setAsset({
                ...asset,
                saleRightYn: null,
                residentialBuildingYn: null,
                residentialBuilding: null,
                nonResidentialBuilding: null,
                metropolitanBuildingYn: null,
                exceptionHouseYn: null,
            });
        }
    }, [asset.property]);

    useEffect(() => {
        // fail msg 수정
        if (
            new Date(Date.parse(asset.acquisitionDate)) >
            new Date(Date.parse(asset.dispositionDate))
        ) {
            setFailMsg('!!');
        } else {
            setFailMsg(null);
        }
    }, [asset]);

    const onAssetChange = (e) => {
        const { name, value } = e.target;
        setAsset({
            ...asset,
            [name]: value,
        });
    };

    const onLogicDataChange = (e) => {
        const { name, value } = e.target;
        setLogicData({
            ...logicData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (failMsg === null) {
            logic();
            dispatch(modAsse(asset));

            setAsset({
                property: '',
                saleRightYn: 'n',
                residentialBuildingYn: 'n',
                residentialBuilding: null,
                nonResidentialBuilding: null,
                metropolitanBuildingYn: 'n',
                exceptionHouseYn: 'n',
                acquisitionDate: '',
                dispositionDate: '',
                exclusiveArea: null,
                amount: '',
                taxBaseDate: '',
                startDate: birthDay,
            });
        } else {
            alert(
                '이대로 진행 시 자격을 판단할 수 없습니다.\n입력 내용을 다시 확인해주십시오.'
            );
        }
    };

    return (
        <>
            <div name="assetsInfo" className="addAssetFormContainer">
                <form
                    name="assetsInfo"
                    onSubmit={handleSubmit}
                    className="addAssetForm"
                    target="assetsInfo"
                >
                    <table className="addAssetFormTable">
                        <tbody className="addAssetFormTableTbody">
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">자산유형</span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    <select
                                        className="assetPropertyInput"
                                        type="number"
                                        name="property"
                                        onChange={onAssetChange}
                                        value={asset.property}
                                        required
                                    >
                                        <option value=""> ---선택--- </option>
                                        <option value="건물">건물</option>
                                        <option value="토지">토지</option>
                                        <option value="자동차">자동차</option>
                                    </select>
                                </td>
                            </tr>

                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">상속 여부</span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    {/* <hr className="Line" /> */}
                                    <input
                                        className="assetSaleRightYnInput"
                                        type="radio"
                                        name="isInheritance"
                                        onChange={onLogicDataChange}
                                        value="n"
                                        checked={
                                            logicData.isInheritance === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetSaleRightYnText">
                                        받지 않았습니다
                                    </span>
                                    <input
                                        className="assetSaleRightYnInput"
                                        type="radio"
                                        name="isInheritance"
                                        onChange={onLogicDataChange}
                                        value="y"
                                        checked={
                                            logicData.isInheritance === 'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="assetSaleRightYnText">
                                        받았습니다
                                    </span>
                                </td>
                            </tr>
                            {asset.property === '건물' ||
                            asset.property === '토지' ? (
                                <tr className="addAssetFormTableTbodyTr">
                                    <td className="addAssetFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            분양권 여부
                                        </span>
                                    </td>
                                    <td className="addAssetFormTableTbodyTrTd">
                                        {/* <hr className="Line" /> */}
                                        <input
                                            className="assetSaleRightYnInput"
                                            type="radio"
                                            name="saleRightYn"
                                            onChange={onAssetChange}
                                            value="n"
                                            checked={
                                                asset.saleRightYn === 'n'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="assetSaleRightYnText">
                                            없습니다
                                        </span>
                                        <input
                                            className="assetSaleRightYnInput"
                                            type="radio"
                                            name="saleRightYn"
                                            onChange={onAssetChange}
                                            value="y"
                                            checked={
                                                asset.saleRightYn === 'y'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="assetSaleRightYnText">
                                            있습니다
                                        </span>
                                    </td>
                                </tr>
                            ) : null}
                            {asset.property === '건물' ||
                            asset.property === '토지' ? (
                                <tr className="addAssetFormTableTbodyTr">
                                    <td className="addAssetFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            주거용 여부
                                        </span>
                                    </td>
                                    <td className="addAssetFormTableTbodyTrTd">
                                        <input
                                            className="assetResidentialBuildingYnInput"
                                            type="radio"
                                            name="residentialBuildingYn"
                                            onChange={onAssetChange}
                                            value="y"
                                            checked={
                                                asset.residentialBuildingYn ===
                                                'y'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="assetResidentialBuildingYnText">
                                            주거용
                                        </span>
                                        <input
                                            className="assetResidentialBuildingYnInput"
                                            type="radio"
                                            name="residentialBuildingYn"
                                            onChange={onAssetChange}
                                            value="n"
                                            checked={
                                                asset.residentialBuildingYn ===
                                                'n'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="assetResidentialBuildingYnText">
                                            비 주거용
                                        </span>
                                    </td>
                                </tr>
                            ) : null}

                            {asset.property === '건물' &&
                            asset.residentialBuildingYn === 'y' ? (
                                <tr className="addAssetFormTableTbodyTr">
                                    <td className="addAssetFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            주거용건물유형
                                        </span>
                                    </td>
                                    <td className="addAssetFormTableTbodyTrTd">
                                        <select
                                            className="assetResidentialBuildingSelect"
                                            type="number"
                                            name="residentialBuilding"
                                            onChange={onAssetChange}
                                            value={asset.residentialBuilding}
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
                                            <option value="단독주택">
                                                단독주택
                                            </option>
                                            <option value="공동주택">
                                                공동주택
                                            </option>
                                            <option value="오피스텔">
                                                오피스텔
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ) : asset.property === '건물' &&
                              asset.residentialBuildingYn === 'n' ? (
                                <tr className="addAssetFormTableTbodyTr">
                                    <td className="addAssetFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            비주거용건물유형
                                        </span>
                                    </td>
                                    <td className="addAssetFormTableTbodyTrTd">
                                        <select
                                            className="assetNoResidentialBuildingSelect"
                                            type="number"
                                            name="nonResidentialBuilding"
                                            onChange={onAssetChange}
                                            value={asset.nonResidentialBuilding}
                                        >
                                            <option value="">
                                                {' '}
                                                ---선택---{' '}
                                            </option>
                                            <option value="건물">건물</option>
                                            <option value="부속토지">
                                                부속토지
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ) : null}
                            {asset.property === '건물' ||
                            (asset.property === '토지' &&
                                asset.residentialBuildingYn === 'y') ? (
                                <tr className="addAssetFormTableTbodyTr">
                                    <td className="addAssetFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            예외 유형
                                        </span>
                                    </td>
                                    <td className="addAssetFormTableTbodyTrTd">
                                        <select
                                            className="assetPropertyInput"
                                            type="number"
                                            name="conditionType"
                                            onChange={onLogicDataChange}
                                            value={logicData.conditionType}
                                        >
                                            <option value="n">
                                                {' '}
                                                해당 없음{' '}
                                            </option>
                                            <option value="폐가">폐가</option>
                                            <option value="무허가건물">
                                                무허가건물
                                            </option>
                                            <option value="문화재지정주택">
                                                문화재지정주택
                                            </option>
                                            <option value="미분양된주택공급">
                                                미분양된주택공급
                                            </option>
                                            <option value="사업목적">
                                                사업목적
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ) : null}
                            {asset.property === '건물' ||
                            asset.property === '토지' ? (
                                <tr className="addAssetFormTableTbodyTr">
                                    <td className="addAssetFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">위치</span>
                                    </td>
                                    <td className="addAssetFormTableTbodyTrTd">
                                        {/* <hr className="Line" /> */}
                                        <input
                                            className="assetSaleRightYnInput"
                                            type="radio"
                                            name="metropolitanBuildingYn"
                                            onChange={onAssetChange}
                                            value="y"
                                            checked={
                                                asset.metropolitanBuildingYn ===
                                                'y'
                                                    ? true
                                                    : false
                                            }
                                            required
                                        />
                                        <span className="assetSaleRightYnText">
                                            수도권이다
                                        </span>
                                        <input
                                            className="assetSaleRightYnInput"
                                            type="radio"
                                            name="metropolitanBuildingYn"
                                            onChange={onAssetChange}
                                            value="n"
                                            checked={
                                                asset.metropolitanBuildingYn ===
                                                'n'
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <span className="assetSaleRightYnText">
                                            수도권이 아니다
                                        </span>
                                    </td>
                                </tr>
                            ) : null}
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">취득일</span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    <input
                                        className="assetAcquisitionDateInput"
                                        type="date"
                                        name="acquisitionDate"
                                        value={asset.acquisitionDate}
                                        onChange={onAssetChange}
                                        required
                                    />
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError">
                                    {new Date(
                                        Date.parse(asset.acquisitionDate)
                                    ) >
                                    new Date(
                                        Date.parse(asset.dispositionDate)
                                    ) ? (
                                        <span className="failMsg">
                                            {failMsg}
                                        </span>
                                    ) : null}
                                </td>
                            </tr>

                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">처분일</span>
                                </td>
                                <td className="addAssetFormTableTbodyTrTd">
                                    <input
                                        className="assetDispositionDateInput"
                                        type="date"
                                        name="dispositionDate"
                                        value={asset.dispositionDate}
                                        onChange={onAssetChange}
                                    />
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError">
                                    {new Date(
                                        Date.parse(asset.acquisitionDate)
                                    ) >
                                    new Date(
                                        Date.parse(asset.dispositionDate)
                                    ) ? (
                                        <span className="failMsg">
                                            {failMsg}
                                        </span>
                                    ) : null}
                                </td>
                            </tr>
                            {asset.property === '건물' ||
                            asset.property === '토지' ? (
                                <tr className="addAssetFormTableTbodyTr">
                                    <td className="addAssetFormTableTbodyTrTdSubTitle">
                                        <span className="subTitle">
                                            전용면적
                                        </span>
                                    </td>
                                    <td className="addAssetFormTableTbodyTrTd">
                                        <input
                                            className="assetExclusiveAreaInput"
                                            type="number"
                                            name="exclusiveArea"
                                            value={asset.exclusiveArea}
                                            onChange={onAssetChange}
                                            required
                                        />
                                        <span> ㎡ </span>
                                    </td>
                                </tr>
                            ) : null}
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">금액</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="assetAmountInput"
                                        type="number"
                                        name="amount"
                                        value={asset.amount}
                                        onChange={onAssetChange}
                                        required
                                    />
                                    <span> 원 </span>
                                </td>
                            </tr>
                            <tr className="addAssetFormTableTbodyTr">
                                <td className="addAssetFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">과세기준일</span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="assetTaxBaseDateInput"
                                        type="date"
                                        name="taxBaseDate"
                                        value={asset.taxBaseDate}
                                        onChange={onAssetChange}
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="buttonContainer">
                        <SubButton
                            type="back"
                            className="save"
                            width="80"
                            height="30"
                            onClick={() => {
                                history.push('/assets', {
                                    houseState: houseState,
                                    ineligibleDate: ineligibleDate,
                                    memberId: memberId,
                                });
                            }}
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
                </form>
            </div>
        </>
    );
};

export default ModAsset;
