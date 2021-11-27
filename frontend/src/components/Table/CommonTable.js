import React from 'react';
import './CommonTable.css';

const CommonTable = (props) => {
    const { headersName, children } = props;

    return (
        <table className="common_table">
            <thead>
                <tr>
                    {headersName.map((item, index) => {
                        return (
                            <td
                                className="commonTable_header_column"
                                key={index}
                            >
                                {item}
                            </td>
                        );
                    })}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
};

export default CommonTable;
