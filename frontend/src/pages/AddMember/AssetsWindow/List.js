import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import Tr from './Tr';
import Add from './Add';
import Modify from './Modify';

const List = (props) => {
    const [asset, setAsset] = useState({});
    const [assets, setAssets] = useState([]);
    const [startDate, setStartDate] = useState(props.birthDate);
    const [selected, setSelected] = useState('');
    const [add, setAdd] = useState(false);
    const [modify, setModify] = useState(false);

    const nextId = useRef(1);

    const calStartDate = () => {
        // 자산 각각의 무주택 시작일을 계산해서 가장 나중의 무주택 시작일을 넘겨줘야 함
        const dates = assets.map((content, i) => {
            console.log(content.startDate);
            return { ...content.startDate };
        });

        dates.sort(function (a, b) {
            return b - a;
        });

        setStartDate(dates[0]);

        props.getStartDate(startDate);
    };

    const sendCloseValue = (value) => {
        props.getCloseValue(value);
    };

    const sendAssetsValue = () => {
        props.getAssetsValue(assets);
    };

    const handleAdd = () => {
        setAdd(!add);
        setModify(false);
    };

    const handleSave = (data) => {
        // 데이터 수정하기
        if (data.id) {
            console.log(data.id + '!!!!!');
            // 받아온 데이터 id 가 있을 경우
            setAssets(
                assets.map((row) =>
                    data.id === row.id
                        ? {
                              // 가져온 id 가 기존 table id가 같으면
                              // 가져온 데이터 변경
                              id: data.id,
                              property: data.property,
                              saleRightYn: data.saleRightYn,
                              residentialBuildingYn: data.residentialBuildingYn,
                              residentialBuilding: data.residentialBuilding,
                              nonResidentialBuilding:
                                  data.nonResidentialBuilding,
                              acquistionDate: data.acquistionDate,
                              dispositionDate: data.dispositionDate,
                              exclusiveArea: data.exclusiveArea,
                              amount: data.amount,
                              taxBaseDate: data.taxBaseDate,
                          }
                        : row
                )
            );
        } else {
            // console.log(JSON.stringify(data));
            // 기존의 데이터 추가하기
            setAsset({ ...data, id: nextId.current });
            asset !== {} && assets === []
                ? setAssets([{ ...data, id: nextId.current }])
                : setAssets([...assets, { ...data, id: nextId.current }]);
            nextId.current += 1;
        }

        setAdd(false);
    };

    const handleRemove = (id) => {
        setAssets((info) => info.filter((item) => item.id !== id));
    };

    const handleEdit = (item) => {
        setAdd(false);
        setModify(!modify);
        const selectedData = {
            id: item.id,
            property: item.property,
            saleRightYn: item.saleRightYn,
            residentialBuildingYn: item.residentialBuildingYn,
            residentialBuilding: item.residentialBuilding,
            nonResidentialBuilding: item.nonResidentialBuilding,
            acquistionDate: item.acquistionDate,
            dispositionDate: item.dispositionDate,
            exclusiveArea: item.exclusiveArea,
            amount: item.amount,
            taxBaseDate: item.taxBaseDate,
        };
        console.log(selectedData);
        setSelected(selectedData);
    };

    const handleCancel = () => {
        setModify(false);
    };

    const handleEditSubmit = (item) => {
        console.log(item);
        handleSave(item);
        setModify(false);
    };

    const handleAssetsSubmit = () => {
        // alert('입력이 모두 완료되었습니다 !', () => {
        //     console.log('얜 뭐죠 ?? ');
        // });
        calStartDate();
        sendCloseValue(true);
        sendAssetsValue();
    };

    return (
        <div className="allInfo">
            <div className="allInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">자산 정보 목록</span>
            </div>
            <br />
            <table className="tableContainer">
                <thead className="allInfoThead">
                    <tr className="allInfoTheadTr">
                        <th className="allInfoTheadTrTh"> 자산유형 </th>
                        <th className="allInfoTheadTrTh"> 분양권 여부 </th>
                        <th className="allInfoTheadTrTh"> 건물유형 </th>
                        <th className="allInfoTheadTrTh"> 취득일 </th>
                        <th className="allInfoTheadTrTh"> 처분일 </th>
                        <th className="allInfoTheadTrTh"> 전용면적 </th>
                        <th className="allInfoTheadTrTh"> 금액 </th>
                        <th className="allInfoTheadTrTh"> 과세 기준일 </th>
                        <th className="allInfoTheadTrTh"> 수정 </th>
                        <th className="allInfoTheadTrTh"> 삭제 </th>
                    </tr>
                </thead>
                <Tr
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

            {add && (
                <Add
                    onSaveData={handleSave}
                    birthDate={props.birthDate}
                    ineligibleDate={props.ineligibleDate}
                />
            )}
            {modify && (
                <Modify
                    selectedData={selected}
                    handleCancel={handleCancel}
                    handleEditSubmit={handleEditSubmit}
                />
            )}
        </div>
    );
};

export default List;
