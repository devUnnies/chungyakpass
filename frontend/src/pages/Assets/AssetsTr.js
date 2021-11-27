import React from 'react';
import AssetsTd from './AssetsTd';
import './Assets.css';

const AssetsTr = ({ data, handleRemove, handleEdit }) => {
    return (
        <tbody className="allInfoTbody">
            {data?.map((item) => {
                return (
                    <AssetsTd
                        key={item.id}
                        item={item}
                        handleRemove={handleRemove}
                        handleEdit={handleEdit}
                    />
                );
            })}
        </tbody>
    );
};

export default AssetsTr;
