import React from 'react';
import Td from './SeeMemberTd';
import './Member.css';

const Tr = ({ members, handleEdit, handleRemove }) => {
    return members?.map((item) => {
        return (
            <Td
                key={item.id}
                item={item}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
            />
        );
    });
};

export default Tr;
