import React, { useEffect, useState } from 'react';
import './Assets.css';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import SubButton from '../../components/Button/SubButton';

const AssetsTd = ({ item, handleRemove, handleEdit }) => {
    const onRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            alert('삭제가 완료되었습니다.');
        } else {
            return;
        }
        handleRemove(item.id);
    };

    const onEdit = () => {
        // console.log(JSON.stringify(item));
        handleEdit(item);
    };

    return (
        <tr className="assetsInfoTbodyTr">
            <td className="assetsInfoTbodyTd">
                <span>{item.property}</span>
            </td>
            <td className="assetsInfoTbodyTd">
                <span>{item.saleRightYn === 'y' ? '있음' : '없음'}</span>
            </td>
            <td className="assetsInfoTbodyTd">
                <span>
                    {item.residentialBuildingYn === 'y'
                        ? item.residentialBuilding
                        : item.nonResidentialBuilding}
                </span>
            </td>
            <td className="assetsInfoTbodyTd">
                <span>
                    {item.metropolitanBuildingYn === 'y'
                        ? '수도권'
                        : '비수도권'}
                </span>
            </td>
            <td className="assetsInfoTbodyTd">
                <span>
                    {item?.acquisitionDate
                        ? item?.acquisitionDate
                              .replace('-', '년 ')
                              .replace('-', '월 ')
                              .concat('일')
                        : null}
                </span>
            </td>
            <td className="assetsInfoTbodyTd">
                <span>
                    {item?.dispositionDate
                        ? item?.dispositionDate
                              .replace('-', '년 ')
                              .replace('-', '월 ')
                              .concat('일')
                        : null}
                </span>
            </td>
            <td className="assetsInfoTbodyTd">
                <span>
                    {item?.exclusiveArea ? item?.exclusiveArea + 'm²' : null}
                </span>
            </td>
            <td className="assetsInfoTbodyTd">
                <span>{item?.amount ? item?.amount + '원' : null}</span>
            </td>
            <td className="assetsInfoTbodyTd">
                <span>
                    {item?.taxBaseDate
                        ? item?.taxBaseDate
                              .replace('-', '년 ')
                              .replace('-', '월 ')
                              .concat('일')
                        : null}
                </span>
            </td>

            <td onClick={onEdit} className="modifyContainer">
                <EditFilled className="modifyColor" />
            </td>
            <td onClick={onRemove} className="deleteContainer">
                <DeleteFilled className="deleteColor" />
            </td>
        </tr>
    );
};

export default AssetsTd;
