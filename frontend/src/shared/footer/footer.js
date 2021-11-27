import { React } from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';

function Logo() {
    return (
        <div className="footer-logo">
            <div className="footer-logo-container">
                <div className="footer-logo-image">
                    <img
                        src={logo}
                        alt="logo"
                        className="footer-logo-image"
                    ></img>
                </div>
                <div className="footer-logo-name">
                    청약<i>pass</i>
                </div>
            </div>
        </div>
    );
}

function Information() {
    return (
        <div className="info">
            <Logo />
            <div className="address">서울시 구로구 연동로 320 성공회대학교</div>
            <div className="tel">02-0000-0000</div>
            <div className="email">chungyakpass1@gmail.com</div>
        </div>
    );
}

function Maps() {
    return (
        <div className="maps">
            {/** 이후에 link 삽입할 예정 */}
            <div className="personalRule">
                <NavLink to="/personalRule" className="personalRule">
                    개인정보처리방침
                </NavLink>
            </div>
            <div className="noEmail">
                <NavLink to="/noEmail" className="noEmail">
                    이메일무단수집거부
                </NavLink>
            </div>
            <div className="sitemap">
                <NavLink to="/sitemap" className="sitemap">
                    사이트맵
                </NavLink>
            </div>
        </div>
    );
}

const footer = () => {
    return (
        <div className="footer">
            <Information />
            <Maps />
            <div className="copyright">
                Copyright ⓒ 청약패스 All Rights Reserved
            </div>
        </div>
    );
};

export default footer;
