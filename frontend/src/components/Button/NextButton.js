import React from 'react';
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';

function NextButton({ width, height, type, fontSize, onClick, props }) {
    return (
        <StyledButton
            width={width}
            height={height}
            type={type}
            fontSize={fontSize}
            onClick={onClick}
            props={props}
        >
            <RightOutlined />
        </StyledButton>
    );
}

const StyledButton = styled.button`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    margin: 0;
    border: none;
    padding: ${(props) => props.paddingTop}px ${(props) => props.paddingLeft}px;
    font-size: var(--button-font-size, ${(props) => props.fontSize}%
    color: var(--button-color, #2a4476);
    cursor: pointer;
    flex: none;
    flex-grow: 0;
    margin: 10px;

    &:active,
    &:hover,
    &:focus {
        background: var(--button-hover-bg-color, #8097c2);
    }
`;

export default NextButton;
