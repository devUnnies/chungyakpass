import React, { useState, useRef, useEffect } from 'react';
import './House.css';
import { PlusOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
    addHouseDel,
    modHouseDel,
    getHouse,
    delHouse,
} from '../../store/actions/commonInfoAction';
import SubButton from '../../components/Button/SubButton';
import MainButton from '../../components/Button/MainButton';

const SeeHouse = () => {
    const dispatch = useDispatch();
    const commonInfoStore = useSelector((state) => state.commonInfo);
    const history = useHistory();

    const [house, setHouse] = useState({
        houseResponseDto: {
            houseHolderId: '',
            addressLevel1: '',
            addressLevel2: '',
            addressDetail: '',
            zipcode: '',
        },
        spouseHouseResponseDto: {
            houseHolderId: '',
            addressLevel1: '',
            addressLevel2: '',
            addressDetail: '',
            zipcode: '',
        },
    });

    const [state, setState] = useState();

    console.log(state);

    const handleAdd = () => {
        dispatch(addHouseDel());
        if (state === 'my') {
            history.push('/addHouse', { houseState: 'my' });
        } else if (state === 'spouse') {
            history.push('/addHouse', { houseState: 'spouse' });
        }
    };

    const handleEdit = () => {
        dispatch(modHouseDel());
        if (state === 'my') {
            history.push('/modHouse', {
                houseState: 'my',
                selectedData: house.houseResponseDto,
            });
        } else if (state === 'spouse') {
            history.push('/modHouse', {
                houseState: 'spouse',
                selectedData: house.spouseHouseResponseDto,
            });
        }
    };

    const handleRemove = () => {
        if (state === 'my') {
            if (house.houseResponseDto.id) {
                if (window.confirm('정말 삭제하시겠습니까?')) {
                    alert('삭제가 완료되었습니다.');
                } else {
                    return;
                }
                dispatch(delHouse(house.houseResponseDto.id));
            }
        } else if (state === 'spouse') {
            if (house.spouseHouseResponseDto.id) {
                if (window.confirm('정말 삭제하시겠습니까?')) {
                    alert('삭제가 완료되었습니다.');
                } else {
                    return;
                }
                dispatch(delHouse(house.spouseHouseResponseDto.id));
            }
        }
    };

    useEffect(() => {
        dispatch(getHouse());
    }, []);

    useEffect(() => {
        const data = commonInfoStore.getHouse.data;
        if (data) {
            if (data.status === 404) {
                alert('세대 정보를 등록해주세요 !');
            } else {
                setHouse(data);
            }
        }
    }, [commonInfoStore.getHouse]);

    useEffect(() => {
        const data = commonInfoStore.delHouse.data;
        if (data) {
            if (data.status === 409) {
                if (window.confirm('먼저 세대주 멤버를 삭제해주십시오 !')) {
                    history.push('/addHouse', { houseState: state });
                } else {
                    return;
                }
            }
            window.location.replace('/house');
        }
    }, [commonInfoStore.delHouse]);

    return (
        <div className="getHouseContainer">
            <div className="getHouseHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">세대 조회</span>
            </div>

            <table className="getHouseTable">
                <thead className="getHouseTableThead">
                    <tr className="getHouseTableTheadTr">
                        <td className="getHouseTableTheadTrTd"></td>
                        <td className="getHouseTableTheadTrTdAddress">
                            <span className="subTitle">주소</span>
                        </td>
                        <td className="getHouseTableTheadTrTd">
                            <span className="subTitle">우편번호</span>
                        </td>
                        <td className="getHouseTableTheadTrTd">
                            <span className="subTitle">수정</span>
                        </td>
                        <td className="getHouseTableTheadTrTd">
                            <span className="subTitle">삭제</span>
                        </td>
                    </tr>
                </thead>
                <tbody className="getHouseTableTbody">
                    <tr className="getHouseTableTbodyTr">
                        <td className="getHouseTableTbodyTrTdSubTitle">
                            <span className="subTitle">본인세대</span>
                        </td>
                        {house.houseResponseDto ? (
                            <>
                                <td className="getHouseTableTbodyTrTd">
                                    <span
                                        className="getHouseTableTbodyTrTdClick"
                                        onClick={() => {
                                            history.push('/members', {
                                                houseState: 'my',
                                            });
                                        }}
                                    >
                                        {house.houseResponseDto.addressLevel1 &&
                                        house.houseResponseDto.addressLevel2 &&
                                        house.houseResponseDto.addressDetail
                                            ? house.houseResponseDto
                                                  .addressLevel1 +
                                              ' ' +
                                              house.houseResponseDto
                                                  .addressLevel2 +
                                              ' ' +
                                              house.houseResponseDto
                                                  .addressDetail
                                            : null}
                                    </span>
                                </td>
                                <td className="getHouseTableTbodyTrTd">
                                    <span className="getHouseTableTbodyTrTdText">
                                        {house.houseResponseDto.zipcode
                                            ? house.houseResponseDto.zipcode
                                            : null}
                                    </span>
                                </td>
                                <td className="getHouseTableTbodyTrTd">
                                    <div className="saveButtonContainer">
                                        <EditFilled
                                            className="modify"
                                            onClick={() => {
                                                setState('my');
                                                handleEdit();
                                            }}
                                        />
                                    </div>
                                </td>
                                <td className="getHouseTableTbodyTrTd">
                                    <div className="saveButtonContainer">
                                        <DeleteFilled
                                            className="delete"
                                            onClick={() => {
                                                setState('my');
                                                handleRemove();
                                            }}
                                        />
                                    </div>
                                </td>
                            </>
                        ) : (
                            <>
                                <td
                                    className="getHouseTableTbodyTrTdPlus"
                                    colSpan="4"
                                >
                                    <div className="saveButtonContainer">
                                        <PlusOutlined
                                            className="add"
                                            onClick={() => {
                                                setState('my');
                                                handleAdd();
                                            }}
                                        />
                                    </div>
                                </td>
                            </>
                        )}
                    </tr>
                    <tr className="getHouseTableTbodyTr">
                        <td className="getHouseTableTbodyTrTdSubTitle">
                            <span className="subTitle">배우자분리세대</span>
                        </td>
                        {house.spouseHouseResponseDto ? (
                            <>
                                <td className="getHouseTableTbodyTrTd">
                                    <span className="getHouseTableTbodyTrTdClick">
                                        {house.spouseHouseResponseDto
                                            .addressLevel1 &&
                                        house.spouseHouseResponseDto
                                            .addressLevel2 &&
                                        house.spouseHouseResponseDto
                                            .addressDetail
                                            ? house.spouseHouseResponseDto
                                                  .addressLevel1 +
                                              ' ' +
                                              house.spouseHouseResponseDto
                                                  .addressLevel2 +
                                              ' ' +
                                              house.spouseHouseResponseDto
                                                  .addressDetail
                                            : null}
                                    </span>
                                </td>
                                <td className="getHouseTableTbodyTrTd">
                                    <span className="getHouseTableTbodyTrTdText">
                                        {house.spouseHouseResponseDto.zipcode
                                            ? house.spouseHouseResponseDto
                                                  .zipcode
                                            : null}
                                    </span>
                                </td>
                                <td className="getHouseTableTbodyTrTd">
                                    <div className="saveButtonContainer">
                                        <EditFilled
                                            className="modify"
                                            onClick={() => {
                                                setState('spouse');
                                                handleEdit();
                                            }}
                                        />
                                    </div>
                                </td>
                                <td className="getHouseTableTbodyTrTd">
                                    <div className="saveButtonContainer">
                                        <DeleteFilled
                                            className="delete"
                                            onClick={() => {
                                                setState('spouse');
                                                handleRemove();
                                            }}
                                        />
                                    </div>
                                </td>
                            </>
                        ) : (
                            <>
                                <td
                                    className="getHouseTableTbodyTrTdPlus"
                                    colSpan="4"
                                >
                                    <div className="saveButtonContainer">
                                        <PlusOutlined
                                            className="add"
                                            onClick={() => {
                                                setState('spouse');
                                                handleAdd();
                                            }}
                                        />
                                    </div>
                                </td>
                            </>
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SeeHouse;
