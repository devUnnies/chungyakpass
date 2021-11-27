import React from 'react';
import RecordTd from './RecordTd';
import './Record.css';

const RecordTr = ({ records }) => {
    return records.map((item) => {
        return (
            <tr className="recordsInfoTableTbodyTr">
                <RecordTd item={item} />
            </tr>
        );
    });
};

export default RecordTr;
