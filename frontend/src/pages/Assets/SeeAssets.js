import React, { useState, useRef, useEffect } from 'react';
import './Assets.css';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import AssetsTr from './AssetsTr';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
    addAsseDel,
    delAsse,
    getAsse,
    modAsseDel,
    patStart,
} from '../../store/actions/commonInfoAction';
import SubButton from '../../components/Button/SubButton';

const SeeAssets = () => {
    const [memberId, setMemberId] = useState();
    const [name, setName] = useState();
    const [assets, setAssets] = useState();
    const [birthDay, setBirthDay] = useState();
    const [startDate, setStartDate] = useState();
    const [startDates, setStartDates] = useState();
    const location = useLocation();

    const ineligibleDate = location.state.ineligibleDate;
    const pos = location.state.pos;
    const houseState = location.state.houseState;

    const history = useHistory();
    const dispatch = useDispatch();

    const commonInfoStore = useSelector((state) => state.commonInfo);

    // 자산 각각의 무주택 시작일을 계산해서 가장 나중의 무주택 시작일을 넘겨줘야 함
    const calStartDate = () => {
        setStartDates(
            startDates.sort((a, b) => {
                return (
                    new Date(Date.parse(b?.startDate)) -
                    new Date(Date.parse(a?.startDate))
                );
            })
        );

        if (startDates) {
            setStartDate({ ...startDate, startDate: startDates[0]?.startDate });
        } else {
            setStartDate(null);
        }

        console.log('마지막에 넘기는 무주택시작일 ~~~ ' + startDate?.startDate);
        // props.getStartDate(startDate);
    };

    // 추가버튼 누르면 추가화면이 아래에 뜨게
    const handleAdd = () => {
        dispatch(addAsseDel());

        history.push('/addAsset', {
            pos: -1,
            ineligibleDate: ineligibleDate,
            birthDay: birthDay,
            startDates: startDates,
            memberId: memberId,
            houseState: houseState,
        });

        setStartDates({
            id: 0,
            startDate: birthDay,
        });
    };

    useEffect(() => {
        const data = commonInfoStore.delAssets.data;
        if (memberId || data) dispatch(getAsse(memberId));
    }, [memberId, commonInfoStore.delAssets]);

    // 멤버 데이터가 있을 경우
    useEffect(() => {
        const member = commonInfoStore.addMem.data;
        const member2 = commonInfoStore.modMem.data;
        // 미리 값 연결해두기
        if (member) {
            setMemberId(member.id);
            setName(member.name);
            setStartDate(member.homelessStartDate);
            setBirthDay(member.birthDay);
        } else if (member2) {
            setMemberId(member2.id);
            setName(member2.name);
            setStartDate(member2.homelessStartDate);
            setBirthDay(member2.birthDay);
        }
    }, [commonInfoStore.addMem, commonInfoStore.modMem]);

    useEffect(() => {
        const data = commonInfoStore.getAssets.data;
        if (data) {
            setAssets(data);
        }
    }, [commonInfoStore.getAssets]);

    useEffect(() => {
        let temp = [];
        if (assets) {
            assets.map((content, i) => {
                if (content.property == '건물' || content.property == '토지') {
                    if (temp !== [])
                        temp = [
                            ...temp,
                            {
                                id: content.id,
                                startDate: content.dispositionDate,
                            },
                        ];
                    else
                        temp = [
                            {
                                id: content.id,
                                startDate: content.dispositionDate,
                            },
                        ];
                }
            });
            if (temp)
                temp = [
                    ...temp,
                    {
                        id: 0,
                        startDate: birthDay,
                    },
                ];
            setStartDates(temp);
        }
    }, [assets]);

    useEffect(() => {
        if (birthDay) {
            setStartDates([
                {
                    id: 0,
                    startDate: birthDay,
                },
            ]);
        }
    }, [birthDay]);

    // asset 삭제하기
    const handleRemove = (id) => {
        setAssets((info) => info.filter((item) => item.id !== id));
        setStartDates();

        dispatch(delAsse(id));
    };

    // 수정하기
    const handleEdit = (item) => {
        dispatch(modAsseDel());

        history.push('/modAsset', {
            pos: 1,
            asset: item,
            houseState: houseState,
        });

        setStartDates([
            {
                id: 0,
                startDate: birthDay,
            },
        ]);
    };

    // 자산 목록 api로 넘기기
    const handleAssetsSubmit = () => {
        // 무주택 시작일만 변경하여 수정 요청
        const userStartDate = {
            memberId: memberId,
            homelessStartDate:
                startDate.startDate === new Date('1500/01/01') && birthDay
                    ? birthDay
                    : startDate.startDate,
        };
        // console.log('파라미터 !!! ' + JSON.stringify(userStartDate));
        dispatch(patStart(userStartDate));

        history.push('/members', {
            houseState: houseState,
        });

        // window.location.replace('/members', { houseState: houseState });
    };

    useEffect(() => {
        const data = commonInfoStore.addMem.data;
        const data2 = commonInfoStore.modMem.data;
        if (data) {
            setMemberId(data.id);
        } else if (data2) {
            setMemberId(data2.id);
        }
    }, [commonInfoStore.addMem, commonInfoStore.modMem]);

    useEffect(() => {
        if (startDates) calStartDate();
        console.log('목록 ~~~' + JSON.stringify(startDates));
    }, [startDates]);

    return (
        <div className="assetsInfoContainer">
            <div className="menuContainer">
                <div className="oneMenu">
                    <h4 className="oneMenu">세대구성원 등록</h4>
                </div>

                <div className="oneMenu">
                    <h4 className="oneMenu">청약이력 등록</h4>
                </div>

                <div className="oneMenuSelect">
                    <h4 className="oneMenuSelect">자산 등록</h4>
                </div>
            </div>
            <div className="assetsInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">{name}님의 자산 정보 목록</span>
            </div>
            <br />
            <table className="tableContainer">
                <thead className="assetsInfoThead">
                    <tr className="assetsInfoTheadTr">
                        <th className="assetsInfoTheadTrTh"> 자산유형 </th>
                        <th className="assetsInfoTheadTrTh"> 분양권유무 </th>
                        <th className="assetsInfoTheadTrTh"> 건물유형 </th>
                        <th className="assetsInfoTheadTrTh"> 수도권여부 </th>
                        <th className="assetsInfoTheadTrTh"> 취득일 </th>
                        <th className="assetsInfoTheadTrTh"> 처분일 </th>
                        <th className="assetsInfoTheadTrTh"> 전용면적 </th>
                        <th className="assetsInfoTheadTrTh"> 금액 </th>
                        <th className="assetsInfoTheadTrTh"> 과세기준일 </th>
                        <th className="assetsInfoTheadTrTh"> 수정 </th>
                        <th className="assetsInfoTheadTrTh"> 삭제 </th>
                    </tr>
                </thead>
                <AssetsTr
                    data={assets}
                    handleRemove={handleRemove}
                    handleEdit={handleEdit}
                />
            </table>

            <div className="buttonContainer">
                <div className="addButtonContainer" onClick={handleAdd}>
                    <PlusOutlined className="addButton"></PlusOutlined>
                </div>

                {assets !== [] ? (
                    <div
                        className="submitButtonContainer"
                        onClick={handleAssetsSubmit}
                    >
                        <CaretRightOutlined className="submitButton" />
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <div className="backButton">
                <SubButton
                    type="back"
                    className="save"
                    width="80"
                    height="30"
                    onClick={() => {
                        history.push('/members', {
                            houseState: houseState,
                        });
                    }}
                >
                    세대구성원 목록으로
                </SubButton>
            </div>
        </div>
    );
};

export default SeeAssets;
