import React, { useState, useRef, useEffect } from 'react';
import './Histories.css';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import SubButton from '../../components/Button/SubButton';
import HistoriesTr from './HistoriesTr';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
    addChungDel,
    delChung,
    delRestr,
    getChung,
    modChungDel,
    modRestrDel,
} from '../../store/actions/commonInfoAction';

const SeeHistories = () => {
    const _history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    // 이름 띄워주기 위한
    const [name, setName] = useState();
    const [history, setHistory] = useState();

    const memberId = location.state.memberId;
    const haveAssets = location.state.haveAssets;
    const pos = location.state.pos;
    let ineligibleDate = location.state.ineligibleDate
        ? location.state.ineligibleDate
        : '';
    const houseState = location.state.houseState;

    const commonInfoStore = useSelector((state) => state.commonInfo);

    // 추가버튼을 누르면 추가화면으로 이동
    const handleAdd = () => {
        dispatch(addChungDel());

        _history.push('/addHistory', {
            pos: -3,
            ineligibleDate: ineligibleDate,
            memberId: memberId,
            houseState: houseState,
            haveAssets: haveAssets,
        });
    };

    // 수정버튼을 누르면 !!
    // history
    const handleHistoryEdit = (item) => {
        dispatch(modChungDel());

        _history.push('/modHistory', {
            pos: 1,
            history: item,
            memberId: memberId,
            ineligible: {
                isIneligible: ineligibleDate ? true : false,
                date: ineligibleDate,
            },
            ineligibleDate: ineligibleDate,
            houseState: houseState,
            haveAssets: haveAssets,
        });
    };
    // limit
    const handleLimitEdit = (id, item) => {
        dispatch(modRestrDel());

        _history.push('/modLimit', {
            pos: 1,
            limit: item,
            chungyakId: id,
            memberId: memberId,
            ineligible: {
                isIneligible: ineligibleDate ? true : false,
                data: ineligibleDate,
            },
            houseState: houseState,
        });
    };

    // 삭제버튼을 누르면 !!
    // history
    const handleHistoryRemove = (id) => {
        console.log('지웁니다 ~!!! ' + JSON.stringify(history[id]));
        setHistory((info) => info.filter((item) => item.id !== id));
        dispatch(delChung(id));
    };
    // limit
    const handleLimitRemove = (id) => {
        // let temp = history.find((item) => item.id === id);
        // temp = { ...temp, houseMemberChungyakRestrictionReadDto: null };
        // setHistory((info) => info.filter((item) => item.id !== id));
        // setHistory([...history, temp]);
        dispatch(delRestr(id));
        window.location.reload();
    };

    // 초기에 memberId가 있으면 memberId로 청약 이력을 조회함
    useEffect(() => {
        if (memberId) dispatch(getChung(memberId));
    }, []);

    // 청약 이력이 존재한다면
    useEffect(() => {
        const temp = commonInfoStore.getChungyak.data;
        if (temp) {
            setHistory(temp);
        }
    }, [commonInfoStore.getChungyak]);

    // 새로 추가된 멤버일 때, 수정하려는 멤버일 때의 데이터를 가져와서
    useEffect(() => {
        const data = commonInfoStore.addMem.data;
        const modData = commonInfoStore.modMem.data;

        // 이름을 변경해준다
        if (modData) {
            setName(modData.name);
        } else if (data) {
            setName(data.name);
        }
    }, [commonInfoStore.addMem, commonInfoStore.modMem]);

    // 다음 버튼을 누르면 자산으로 갈지 구성원 목록으로 갈지 정한다
    const handleHistoriesSubmit = () => {
        // 자산 목록 !!! 으로 !!! 넘겨야 함 !!!!
        if (haveAssets === 'y') {
            _history.push('/assets', {
                name: name,
                ineligibleDate: ineligibleDate,
                pos: -5,
                houseState: houseState,
            });
        } else {
            _history.goBack(-2);
        }
    };

    return (
        <div className="historiesInfoContainer">
            <div className="menuContainer">
                <div className="oneMenu">
                    <h4 className="oneMenu">세대구성원 등록</h4>
                </div>

                <div className="oneMenuSelect">
                    <h4 className="oneMenuSelect">청약이력 등록</h4>
                </div>

                <div className="oneMenu">
                    <h4 className="oneMenu">자산 등록</h4>
                </div>
            </div>

            <div className="historiesInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">{name}님의 청약 이력 목록</span>
            </div>
            <br />
            <table className="tableContainer">
                <thead className="historiesInfoThead">
                    <tr className="historiesInfoTheadTr">
                        <th className="historiesInfoTheadTrTh"> 청약이력 </th>
                        <th className="historiesInfoTheadTrTh"> 수정 </th>
                        <th className="historiesInfoTheadTrTh"> 삭제 </th>
                        <th className="historiesInfoTheadTrTh">
                            {' '}
                            청약제한사항{' '}
                        </th>
                        <th className="historiesInfoTheadTrTh"> 수정 </th>
                        <th className="historiesInfoTheadTrTh"> 삭제 </th>
                    </tr>
                </thead>
                {history ? (
                    <HistoriesTr
                        data={history}
                        handleHistoryRemove={handleHistoryRemove}
                        handleLimitRemove={handleLimitRemove}
                        handleHistoryEdit={handleHistoryEdit}
                        handleLimitEdit={handleLimitEdit}
                    />
                ) : null}
            </table>

            <div className="buttonContainer">
                <div className="addButtonContainer" onClick={handleAdd}>
                    <PlusOutlined className="addButton"></PlusOutlined>
                </div>

                {history ? (
                    <div
                        className="submitButtonContainer"
                        onClick={handleHistoriesSubmit}
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
                        _history.goBack(pos);
                    }}
                >
                    세대구성원 목록으로
                </SubButton>
            </div>
        </div>
    );
};

export default SeeHistories;
