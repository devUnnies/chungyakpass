import { React, useState, useEffect } from 'react';
import './header.css';
import { NavLink, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import storage from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/actions/authAction';
import { signoutWithToken } from '../../store/actions/tokenAction';

const data = {
    category: [
        {
            idx: 0,
            name: '청약자격확인',
            link: '/addHouseHolder',
            subcategory: [
                {
                    idx: 0,
                    name: '공통정보입력',
                    link: '/addHouseHolder',
                },
                {
                    idx: 1,
                    name: '한눈에보기',
                    link: '/atAGlance',
                },
                {
                    idx: 2,
                    name: '유형별',
                    link: '',
                    subcategory: [
                        {
                            idx: 0,
                            name: '일반공급',
                            link: '',
                            subcategory: [
                                {
                                    idx: 0,
                                    name: '국민주택',
                                    link: '/generalKookminAptNum',
                                },
                                {
                                    idx: 1,
                                    name: '민영주택',
                                    link: '/generalMinyeongAptNum',
                                },
                            ],
                        },
                        {
                            idx: 1,
                            name: '특별공급',
                            link: '',
                            subcategory: [
                                {
                                    idx: 0,
                                    name: '신혼부부',
                                    link: '',
                                },
                                {
                                    idx: 1,
                                    name: '다자녀',
                                    link: '/specialMultiChildMinyeongAptNum',
                                },
                                {
                                    idx: 2,
                                    name: '생애최초',
                                    link: '',
                                },
                                {
                                    idx: 3,
                                    name: '노부모',
                                    link: '',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            idx: 1,
            name: '가배점계산기',
            link: '',
            subcategory: [
                {
                    idx: 0,
                    name: '일반공급',
                    link: '',
                    subcategory: [
                        {
                            idx: 0,
                            name: '민영주택',
                            link: '/point/generalMinyeoung',
                        },
                    ],
                },
                {
                    idx: 1,
                    name: '특별공급',
                    link: '',
                    subcategory: [
                        {
                            idx: 0,
                            name: '신혼부부',
                            link: '/point/newMarriage',
                        },
                        {
                            idx: 1,
                            name: '다자녀',
                            link: '/point/multiChild',
                        },
                        {
                            idx: 2,
                            name: '노부모',
                            link: '/point/oldParent',
                        },
                        {
                            idx: 3,
                            name: '한부모',
                            link: '/point/oneParent',
                        },
                    ],
                },
            ],
        },
        {
            idx: 2,
            name: '부적격사례',
            link: '/case',
            subcategory: [],
        },
        {
            idx: 3,
            name: 'FAQ',
            link: '/FAQ',
            subcategory: [],
        },
    ],
};

function Login() {
    return (
        <div className="login">
            <div className="login-container">
                <div className="login-subcontainer">
                    <div className="login-buttonArea">
                        <button className="login-loginButton">
                            <NavLink to="/login" className="login-loginButton">
                                로그인
                            </NavLink>
                        </button>
                        <button className="login-signUpButton">
                            <NavLink
                                to="/signup"
                                className="login-signUpButton"
                            >
                                회원가입
                            </NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Logout() {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logOut());
        dispatch(signoutWithToken());
        storage.remove('user-token');
        history.push('/');
    };

    return (
        <div className="logout">
            <div className="logout-container">
                <div className="logout-subcontainer">
                    <div className="logout-buttonArea">
                        <button
                            className="logout-loginButton"
                            onClick={handleLogout}
                        >
                            <NavLink to="/" className="logout-logoutButton">
                                로그아웃
                            </NavLink>
                        </button>
                        <button className="logout-mypageButton">
                            <NavLink
                                to="/mypage"
                                className="logout-mypageButton"
                            >
                                마이페이지
                            </NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Logo() {
    return (
        <div className="logo">
            <div className="logo-container">
                <NavLink to="/" className="logo-container">
                    <img src={logo} alt="logo" className="logo-image"></img>
                    <div className="logo-name">
                        청약<i>pass</i>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

function Nav(props) {
    const tok = props === null ? null : props.token;

    return (
        <div className="nav">
            <div className="nav-container">
                {/** 여러 개의 카테고리를 관리 */}
                <ul className="nav-items">
                    {data.category.map((content, i) => {
                        return (
                            <li className="nav-item" key={i}>
                                <NavLink
                                    to={tok ? content.link : '/needLogin'}
                                    className="a"
                                >
                                    {content.name}
                                </NavLink>
                                <ul className={'nav-subItems'}>
                                    {content.subcategory.map(
                                        (subcontent, j) => {
                                            return (
                                                <li
                                                    className={'nav-subItem'}
                                                    key={j}
                                                >
                                                    <NavLink
                                                        to={
                                                            tok
                                                                ? subcontent.link
                                                                : '/needLogin'
                                                        }
                                                        className="a"
                                                    >
                                                        {subcontent.name}
                                                    </NavLink>
                                                    <ul
                                                        className={
                                                            i === 0
                                                                ? 'nav-subsubItems'
                                                                : 'nav-subsubItemsSecond'
                                                        }
                                                    >
                                                        {subcontent.subcategory
                                                            ? subcontent.subcategory.map(
                                                                  (
                                                                      subcontent,
                                                                      k
                                                                  ) => {
                                                                      return (
                                                                          <li
                                                                              className={
                                                                                  i ===
                                                                                  0
                                                                                      ? 'nav-subsubItem'
                                                                                      : 'nav-subsubItemSecond'
                                                                              }
                                                                              key={
                                                                                  k
                                                                              }
                                                                          >
                                                                              <NavLink
                                                                                  to={
                                                                                      tok
                                                                                          ? subcontent.link
                                                                                          : '/needLogin'
                                                                                  }
                                                                                  className="a"
                                                                              >
                                                                                  {
                                                                                      subcontent.name
                                                                                  }
                                                                              </NavLink>
                                                                              <ul className="nav-subsubsubItems">
                                                                                  {subcontent.subcategory
                                                                                      ? subcontent.subcategory.map(
                                                                                            (
                                                                                                subcontent,
                                                                                                m
                                                                                            ) => {
                                                                                                return (
                                                                                                    <li
                                                                                                        className="nav-subsubsubItem"
                                                                                                        key={
                                                                                                            m
                                                                                                        }
                                                                                                    >
                                                                                                        <NavLink
                                                                                                            to={
                                                                                                                tok
                                                                                                                    ? subcontent.link
                                                                                                                    : '/needLogin'
                                                                                                            }
                                                                                                            className="a"
                                                                                                        >
                                                                                                            {
                                                                                                                subcontent.name
                                                                                                            }
                                                                                                        </NavLink>
                                                                                                    </li>
                                                                                                );
                                                                                            }
                                                                                        )
                                                                                      : null}
                                                                              </ul>
                                                                          </li>
                                                                      );
                                                                  }
                                                              )
                                                            : null}
                                                    </ul>
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

const Header = (props) => {
    const tokenStore = useSelector((state) => state.token);
    const tok = storage.get('user-token');
    return (
        <div className="header">
            {tok || tokenStore.token ? <Logout /> : <Login />}
            <Logo></Logo>
            <Nav token={tok}></Nav>
        </div>
    );
};

export default Header;
