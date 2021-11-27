import React from 'react';
import styled from 'styled-components';

function SubButton({
    width,
    height,
    children,
    paddingLeft,
    paddingTop,
    type,
    onClick,
}) {
    return (
        <StyledButton
            width={width}
            height={height}
            paddingLeft={paddingLeft}
            paddingTop={paddingTop}
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
    border: none;
    padding: ${(props) => props.paddingTop}px ${(props) => props.paddingLeft}px;
    font-family: 'Gothic A1', sans-serif;
    font-size: var(--button-font-size, 13px);
    color: var(--button-color, #2a4476);
    background: var(--button-bg-color, rgba(0, 0, 0, 0));
    cursor: pointer;

    &:active,
    &:hover,
    &:focus {
        color: var(--button-color, #e3e3e3);
    }
`;

export default SubButton;
