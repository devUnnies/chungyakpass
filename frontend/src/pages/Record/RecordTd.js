import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Record.css';

const RecordTd = ({ item }) => {
    const history = useHistory();

    return (
        <>
            {item ? (
                <>
                    <td className="recordsInfoTableTbodyTrTd">
                        {item.subSupply
                            ? item.supply + ' ' + item.subSupply
                            : item.supply}
                    </td>
                    <td className="recordsInfoTableTbodyTrTd">
                        {item.housingType}
                    </td>
                    <td className="recordsInfoTableTbodyTrTd">
                        <span
                            className="recordsInfoTableTbodyTrTdClick"
                            onClick={() => {
                                if (
                                    item.supply === '일반' &&
                                    item.housingType === '국민'
                                ) {
                                    history.push('/recordsGeneralKookmin', {
                                        id: item.id,
                                    });
                                } else if (
                                    item.supply === '일반' &&
                                    item.housingType === '민영'
                                ) {
                                    history.push('/recordsGeneralMinyeong', {
                                        id: item.id,
                                    });
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '생애최초' &&
                                    item.housingType === '국민'
                                ) {
                                    history.push(
                                        '/recordsSpecialKookminPublicFirstLife',
                                        {
                                            id: item.id,
                                        }
                                    );
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '생애최초' &&
                                    item.housingType === '민영'
                                ) {
                                    history.push(
                                        '/recordsSpecialMinyeongFirstLife',
                                        {
                                            id: item.id,
                                        }
                                    );
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '신혼부부' &&
                                    item.housingType === '국민'
                                ) {
                                    history.push(
                                        '/recordsSpecialKookminPublicNewlyMarried',
                                        {
                                            id: item.id,
                                        }
                                    );
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '신혼부부' &&
                                    item.housingType === '민영'
                                ) {
                                    history.push(
                                        '/recordsSpecialMinyeongNewlyMarried',
                                        {
                                            id: item.id,
                                        }
                                    );
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '다자녀' &&
                                    item.housingType === '국민'
                                ) {
                                    history.push(
                                        '/recordsSpecialKookminPublicMultiChild',
                                        {
                                            id: item.id,
                                        }
                                    );
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '다자녀' &&
                                    item.housingType === '민영'
                                ) {
                                    history.push(
                                        '/recordsSpecialMinyeongMultiChild',
                                        {
                                            id: item.id,
                                        }
                                    );
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '노부모' &&
                                    item.housingType === '국민'
                                ) {
                                    history.push(
                                        '/recordsSpecialKookminPublicOldParents',
                                        {
                                            id: item.id,
                                        }
                                    );
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '노부모' &&
                                    item.housingType === '민영'
                                ) {
                                    history.push(
                                        '/recordsSpecialMinyeongOldParents',
                                        {
                                            id: item.id,
                                        }
                                    );
                                }
                            }}
                        >
                            {item.ranking}
                        </span>
                    </td>
                    <td className="recordsInfoTableTbodyTrTd">
                        <span className="">
                            {item.modifiedDate
                                ? item.modifiedDate
                                      .replace('-', '년 ')
                                      .replace('-', '월 ')
                                      .replace('T', '일\n')
                                      .replace(':', '시 ')
                                      .replace(':', '분 ')
                                      .substring(0, 21)
                                : null}
                        </span>
                    </td>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default RecordTd;
