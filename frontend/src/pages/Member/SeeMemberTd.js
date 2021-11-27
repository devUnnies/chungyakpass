import React, { useEffect, useState } from 'react';
import './Member.css';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import SubButton from '../../components/Button/SubButton';

const Td = ({ item, assets, handleEdit, handleRemove }) => {
    const [isShow, setIsShow] = useState(false);

    const onEdit = () => {
        handleEdit(item);
    };

    const onRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            alert('삭제가 완료되었습니다.');
        } else {
            return;
        }
        handleRemove(item?.id);
    };

    return (
        <>
            {item ? (
                <tr className="membersInfoTbodyTr">
                    {/* 이름 */}
                    <td className="membersInfoTbodyTrTd">
                        <span>{item?.name}</span>
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.birthDay
                            .replace('-', '년 ')
                            .replace('-', '월 ')
                            .concat('일')}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.foreignerYn === 'y' ? '외국인' : '내국인'}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.relation ? item.relation : null}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.soldierYn === 'y' ? '장기복무중' : null}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.marriageDate ? item?.marriageDate : null}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.homelessStartDate
                            ? item?.homelessStartDate
                                  .replace('-', '년 ')
                                  .replace('-', '월 ')
                                  .concat('일')
                            : null}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.transferDate
                            ? item?.transferDate
                                  .replace('-', '년 ')
                                  .replace('-', '월 ')
                                  .concat('일')
                            : null}
                    </td>

                    <td className="membersInfoTbodyTrTd">
                        {item?.income !== 0
                            ? item?.income + '원'
                            : item?.income === 0
                            ? item?.income + '원'
                            : null}
                    </td>
                    <td className="membersInfoTbodyTrTd">
                        {item.houseMemberAdditionalInfoResponseDto ? (
                            <>
                                {isShow ? (
                                    <>
                                        <span>부모 사망 이력 : </span>
                                        {item
                                            .houseMemberAdditionalInfoResponseDto
                                            .parentsDeathYn === 'y' ? (
                                            <>
                                                <span>O</span>
                                                <br />
                                            </>
                                        ) : (
                                            <>
                                                <span>X</span>
                                                <br />
                                            </>
                                        )}
                                        {item.relation !== '본인' &&
                                        item.relation !== '배우자' &&
                                        !item.marriageDate ? (
                                            <>
                                                <span>이혼여부 : </span>
                                                {item
                                                    .houseMemberAdditionalInfoResponseDto
                                                    .divorceYn === 'y' ? (
                                                    <>
                                                        <span>O</span>
                                                        <br />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>X</span>
                                                        <br />
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        <span>
                                            해외나 요양시설 체류 이력 :{' '}
                                        </span>
                                        {item
                                            .houseMemberAdditionalInfoResponseDto
                                            .stayOverYn === 'y' ? (
                                            <>
                                                <span>O</span>
                                                <br />
                                            </>
                                        ) : (
                                            <>
                                                <span>X</span>
                                                <br />
                                            </>
                                        )}
                                        <span>해외나 요양시설 체류 중 : </span>
                                        {item
                                            .houseMemberAdditionalInfoResponseDto
                                            .nowStayOverYn === 'y' ? (
                                            <>
                                                <span>O</span>
                                                <br />
                                            </>
                                        ) : (
                                            <>
                                                <span>X</span>
                                                <br />
                                            </>
                                        )}
                                        <SubButton
                                            onClick={() => setIsShow(!isShow)}
                                        >
                                            접기
                                        </SubButton>
                                    </>
                                ) : (
                                    <SubButton
                                        onClick={() => setIsShow(!isShow)}
                                    >
                                        더보기
                                    </SubButton>
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </td>
                    {/* 수정 버튼 */}
                    <td onClick={onEdit} className="modifyContainer">
                        <EditFilled className="modifyColor" />
                    </td>
                    {/* 삭제 버튼 */}
                    <td onClick={onRemove} className="allInfoTbodyTd">
                        <DeleteFilled className="deleteColor" />
                    </td>
                </tr>
            ) : null}
        </>
    );
};

export default Td;
