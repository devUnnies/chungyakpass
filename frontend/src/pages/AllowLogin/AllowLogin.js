import React from 'react';
import { NavLink } from 'react-router-dom';
import MainButton from '../../components/Button/MainButton';
import { WarningFilled } from '@ant-design/icons';
import './AllowLogin.css';

const AllowLogin = () => {
    return (
        <div className="allowLogin">
            <div className="container">
                <span className="message">
                    <WarningFilled className="warningIcon" /> <br />
                    로그인이 필요한 메뉴입니다 !<br />
                    로그인을 먼저 해주세요 ! <br />
                    <br />
                    <NavLink to="/login">
                        <MainButton width={80} height={30}>
                            로그인
                        </MainButton>
                    </NavLink>
                </span>
            </div>
        </div>
    );
};

export default AllowLogin;
