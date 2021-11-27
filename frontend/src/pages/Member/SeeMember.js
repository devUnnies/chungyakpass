import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Tr from './SeeMemberTr';
import './Member.css';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import {
    modMem,
    delMem,
    addMemDel,
    modMemDel,
    getMem,
    addHouseDel,
    getHouse,
    addMemAddInfoDel,
    modMemAddInfoDel,
    delMemAddInfo,
} from '../../store/actions/commonInfoAction';
import SubButton from '../../components/Button/SubButton';

const SeeMember = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const location = useLocation();
    const commonInfoStore = useSelector((state) => state.commonInfo);
    const houseState = location.state.houseState;
    const [houseId, setHouseId] = useState();
    const [members, setMembers] = useState([]);
    const [selected, setSelected] = useState('');
    const [houseHolderYn, setHouseHolderYn] = useState();

    useEffect(() => {
        dispatch(getHouse());
    }, []);

    useEffect(() => {
        const getData = commonInfoStore.getHouse.data;
        const addData = commonInfoStore.addHouse.data;

        if (getData) {
            if (houseState === 'my') {
                setHouseId(getData.houseResponseDto?.id);
            } else {
                setHouseId(getData.spouseHouseResponseDto?.id);
            }
        } else if (addData) {
            setHouseId(addData?.id);
        }
    }, [commonInfoStore.getHouse, commonInfoStore.addHouse]);

    const handleAdd = () => {
        // console.log(houseId);
        dispatch(getHouse());
        dispatch(addMemDel());
        dispatch(addMemAddInfoDel());

        history.push('/addMember', {
            houseState: houseState,
            houseId: houseId,
        });
    };

    const handleEdit = (item) => {
        dispatch(modMemDel());
        dispatch(modMemAddInfoDel());

        // 선택한 데이터 재정의
        const selectedData = {
            id: item.id,
            name: item.name,
            birthDay: item.birthDay,
            account: item.account,
            foreignerYn: item.foreignerYn,
            relation: item.relation,
            householderYn: houseHolderYn,
            soldierYn: item.soldierYn,
            homelessStartDate: item.homelessStartDate,
            isMarried: item.isMarried,
            marriedDate: item.marriedDate,
            transferDate: item.transferDate,
            income: item.income,
            houseMemberAdditionalInfoResponseDto:
                item.houseMemberAdditionalInfoResponseDto,
        };
        // 선택한 데이터로 바꾸기
        setSelected(selectedData);
        history.push('/modMember', {
            houseState: houseState,
            houseId: houseId,
            selectedData: selectedData,
            houseId: houseId,
        });
        // dispatch(modMem(selectedData));
    };

    const handleRemove = (id) => {
        setMembers((info) => info.filter((item) => item.id != id));
        dispatch(delMem(id));
    };

    const handleMembersSubmit = () => {
        const data = commonInfoStore.getHouse.data;
        if (data.spouseHouseResponseDto) {
            window.location.replace('/');
            dispatch(
                getMem(commonInfoStore.addHouse.data?.houseResponseDto?.id)
            );
        } else {
            if (window.confirm('배우자분리세대를 등록하시겠습니까?')) {
                history.push('/house');
                dispatch(addHouseDel());
            } else {
                window.location.replace('/');
                dispatch(
                    getMem(commonInfoStore.addHouse.data?.houseResponseDto?.id)
                );
            }
        }
    };

    useEffect(() => {
        const data = commonInfoStore.addHouse.data;

        if (data) {
            dispatch(getMem(data.id));
        }
    }, []);

    useEffect(() => {
        const data = commonInfoStore.getMem.data;

        if (data) {
            if (data.status === 404) {
                alert(data.message);
            } else setMembers(data);
        }
    }, [commonInfoStore.getMem]);

    return (
        <>
            <div className="membersInfo">
                <div className="membersInfoHeaderContainer">
                    <div className="heightBar"></div>
                    <span className="listTitle">
                        구성원 정보 목록 -{' '}
                        {houseState === 'my'
                            ? '신청자 본인 세대'
                            : '배우자 분리 세대'}
                    </span>
                </div>
                <br />
                <table className="tableContainer">
                    <thead className="membersInfoThead">
                        <tr className="membersInfoTheadTr">
                            <th className="membersInfoTheadTrTh"> 이름 </th>
                            <th className="membersInfoTheadTrTh"> 생년월일 </th>
                            <th className="membersInfoTheadTrTh"> 국적 </th>
                            <th className="membersInfoTheadTrTh"> 관계 </th>
                            <th className="membersInfoTheadTrTh"> 장기복무 </th>
                            <th className="membersInfoTheadTrTh">
                                {' '}
                                혼인신고일{' '}
                            </th>
                            <th className="membersInfoTheadTrTh">
                                {' '}
                                무주택시작일{' '}
                            </th>
                            <th className="membersInfoTheadTrTh">
                                {' '}
                                전입신고일{' '}
                            </th>
                            <th className="membersInfoTheadTrTh">
                                {' '}
                                월평균소득{' '}
                            </th>
                            <th className="membersInfoTheadTrTh"> 추가정보 </th>
                            <th className="membersInfoTheadTrTh"> 수정 </th>
                            <th className="membersInfoTheadTrTh"> 삭제 </th>
                        </tr>
                    </thead>
                    <tbody className="membersInfoTbody">
                        {members ? (
                            <Tr
                                members={members}
                                handleEdit={handleEdit}
                                handleRemove={handleRemove}
                            />
                        ) : (
                            <></>
                        )}
                    </tbody>
                </table>
                <div className="buttonContainer">
                    <div className="addButtonContainer" onClick={handleAdd}>
                        <PlusOutlined className="addButton"></PlusOutlined>
                    </div>
                    {members !== [] ? (
                        <div
                            className="submitButtonContainer"
                            onClick={handleMembersSubmit}
                        >
                            <CaretRightOutlined className="submitButton" />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                {/* <div className="backButton">
                    <SubButton
                        type="back"
                        className="save"
                        width="80"
                        height="30"
                        onClick={() => {
                            history.push('/selectHouse');
                        }}
                    >
                        세대등록
                    </SubButton>
                </div> */}
            </div>
        </>
    );
};

export default SeeMember;
