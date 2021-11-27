import React from 'react';
import './Tooltip.css';
import styled, { keyframes } from 'styled-components';

let tooltipWidth, tooltipHeight;

const Tooltip = ({ children, message, width, height }) => {
    tooltipWidth = width;
    tooltipHeight = height;

    return (
        <Container className="tooltipContainer">
            {children}
            <Content className="tooltip">{message}</Content>
        </Container>
    );
};

const tooltip = keyframes`
  0% { opacity: 0; }
  40% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 1;}
`;

const Container = styled.div`
    position: relative;

    &:hover > .tooltip,
    &:active > .tooltip {
        display: block;
        width: ${tooltipWidth};
        height: ${tooltipHeight};
        background-color: #ffffff;
        box-shadow: 0px 0px 5px 1px #e5e8ed;
        animation: ${tooltip} 1s;
    }
`;

const Content = styled.div`
    display: none;
    position: absolute;
    text-align: left;
    font-size: 12px;
    padding: 3px;
    z-index: 200;
`;

export default Tooltip;
