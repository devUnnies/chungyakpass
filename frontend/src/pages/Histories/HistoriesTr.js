import React, { useState } from 'react';
import HistoriesTd from './HistoriesTd';
import './Histories.css';

const HistoriesTr = ({
    data,
    handleHistoryRemove,
    handleHistoryEdit,
    handleLimitRemove,
    handleLimitEdit,
}) => {
    return (
        <tbody className="historiesInfoTbody">
            {data?.map((content, i) => {
                return (
                    <HistoriesTd
                        key={i}
                        item={content}
                        handleHistoryEdit={handleHistoryEdit}
                        handleHistoryRemove={handleHistoryRemove}
                        handleLimitEdit={handleLimitEdit}
                        handleLimitRemove={handleLimitRemove}
                    />
                );
            })}
        </tbody>
    );
};

export default HistoriesTr;
