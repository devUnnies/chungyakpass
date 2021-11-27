import React from 'react';
import './loading.css';
import { FadeLoader } from 'halogenium';

const Loading = () => {
    return (
        <div className="loadingContainer">
            <FadeLoader
                color="#bf9075"
                size="32px"
                margin="32px"
                verticalAlign="15px"
            />
        </div>
    );
};

export default Loading;
