import React from 'react';
import styled from 'styled-components';

function MainButton({
    width,
    height,
    children,
    paddingLeft,
    paddingTop,
    fontSize,
    type,
    onClick,
}) {
    return (
        <StyledButton
            width={width}
            height={height}
            paddingLeft={paddingLeft}
            paddingTop={paddingTop}
            fontSize={fontSize}
            type={type}
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
}

const StyledButton = styled.button`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    margin: 0;
    border: none;
    padding: ${(props) => props.paddingTop}px ${(props) => props.paddingLeft}px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: var(--button-font-size, ${(props) => props.fontSize}px);
    border-radius: var(--button-radius, 30px);
    color: var(--button-color, #ffffff);
    background: var(--button-bg-color, #2a4476);
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

export default MainButton;
