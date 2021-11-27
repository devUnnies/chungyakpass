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
                                    item.housingType === '민영'
                                ) {
                                    history.push(
                                        '/recordsPointGeneralMinyeong',
                                        {
                                            id: item.id,
                                        }
                                    );
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '신혼부부'
                                ) {
                                    history.push(
                                        '/recordsPointSpecialNewlyMarried',
                                        {
                                            id: item.id,
                                        }
                                    );
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '한부모'
                                ) {
                                    history.push(
                                        '/recordsPointSpecialSingleParents',
                                        {
                                            id: item.id,
                                        }
                                    );
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '노부모'
                                ) {
                                    history.push(
                                        '/recordsPointSpecialOldParents',
                                        {
                                            id: item.id,
                                        }
                                    );
                                } else if (
                                    item.supply === '특별' &&
                                    item.subSupply === '다자녀'
                                ) {
                                    history.push(
                                        '/recordsPointSpecialMultiChild',
                                        {
                                            id: item.id,
                                        }
                                    );
                                }
                            }}
                        >
                            {item.total}
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
