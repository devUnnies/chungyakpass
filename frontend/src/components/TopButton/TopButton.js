import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import img from '../../assets/top_button.png';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scorlled upto given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 600) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <TopButton>
            {isVisible && (
                <div onClick={scrollToTop}>
                    <img src={img} alt="Go to top" />
                </div>
            )}
        </TopButton>
    );
}

const TopButton = styled.div`
    position: fixed;
    left: 90%;
    top: 70%;
    z-index: 100;
    cursor: pointer;
`;
