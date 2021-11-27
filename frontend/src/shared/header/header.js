import { React, useState, useEffect } from 'react';
import './header.css';
import { NavLink, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import storage from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/actions/authAction';
import { signoutWithToken } from '../../store/actions/tokenAction';
import {
    getBank,
    getHouse,
    getMem,
} from '../../store/actions/commonInfoAction';

let blockUrl = '/addBankBook';

let bank = blockUrl;
let generalKookminAptNum = blockUrl;
let generalMinyeongAptNum = blockUrl;
let specialNewlyMarriedTypeSelect = blockUrl;
let specialMultiChildTypeSelect = blockUrl;
let specialFirstLifeTypeSelect = blockUrl;
let specialOldParentTypeSelect = blockUrl;
let pointGeneralMinyeoungPost = blockUrl;
let pointNewlyMarriageAptNum = blockUrl;
let pointMultiChildAptNum = blockUrl;
let pointOldParentPost = blockUrl;
let pointOneParentAptNum = blockUrl;

const data = {
    category: [
        {
            idx: 0,
            name: '기초정보등록',
            link: bank,
            subcategory: [
                {
                    idx: 0,
                    name: '통장정보등록',
                    link: bank,
                },
                {
                    idx: 1,
                    name: '세대등록',
                    link: '/house',
                },
            ],
        },
        {
            idx: 1,
            name: '청약자격확인',
            link: '',
            subcategory: [
                // {
                //     idx: 0,
                //     name: '공통정보입력',
                //     link: '',
                // },
                // {
                //     idx: 0,
                //     name: '한눈에보기',
                //     link: '/atAGlance',
                // },
                {
                    idx: 0,
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
                                    link: generalKookminAptNum,
                                },
                                {
                                    idx: 1,
                                    name: '민영주택',
                                    link: generalMinyeongAptNum,
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
                                    link: specialNewlyMarriedTypeSelect,
                                },
                                {
                                    idx: 1,
                                    name: '다자녀',
                                    link: specialMultiChildTypeSelect,
                                },
                                {
                                    idx: 2,
                                    name: '생애최초',
                                    link: specialFirstLifeTypeSelect,
                                },
                                {
                                    idx: 3,
                                    name: '노부모',
                                    link: specialOldParentTypeSelect,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            idx: 2,
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
                            link: pointGeneralMinyeoungPost,
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
                            link: pointNewlyMarriageAptNum,
                        },
                        {
                            idx: 1,
                            name: '다자녀',
                            link: pointMultiChildAptNum,
                        },
                        {
                            idx: 2,
                            name: '노부모',
                            link: pointOldParentPost,
                        },
                        {
                            idx: 3,
                            name: '한부모',
                            link: pointOneParentAptNum,
                        },
                    ],
                },
            ],
        },
        {
            idx: 3,
            name: '부적격사례',
            link: '/case',
            subcategory: [],
        },
        {
            idx: 4,
            name: '자주묻는질문',
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
        window.location.replace('/');
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
    const commonInfoStore = useSelector((state) => state.commonInfo);
    const history = useHistory();

    useEffect(() => {
        const data1 = commonInfoStore.getBank.data;
        const data2 = commonInfoStore.getMem.data;
        const data3 = commonInfoStore.getHouse.data;

        if (data1) {
            if (data1.status === 404) {
                bank = '/addBankbook';
            } else {
                bank = '/bankbook';
            }
        }

        if (data3) {
            generalKookminAptNum = '/generalKookminAptNum';
            generalMinyeongAptNum = '/generalMinyeongAptNum';
            specialNewlyMarriedTypeSelect = '/specialNewlyMarriedTypeSelect';
            specialMultiChildTypeSelect = '/specialMultiChildTypeSelect';
            specialFirstLifeTypeSelect = '/specialFirstLifeTypeSelect';
            specialOldParentTypeSelect = '/specialOldParentTypeSelect';
            pointGeneralMinyeoungPost = '/point/generalMinyeoungPost';
            pointNewlyMarriageAptNum = '/point/newlyMarriageAptNum';
            pointMultiChildAptNum = '/point/multiChildAptNum';
            pointOldParentPost = '/point/oldParentPost';
            pointOneParentAptNum = '/point/oneParentAptNum';

            data.category.map((content, i) => {
                if (content.name === '기초정보등록') {
                    content.subcategory.map((content2, j) => {
                        if (content2.name === '통장정보등록') {
                            content2.link = bank;
                        }
                    });
                } else if (content.name === '청약자격확인') {
                    content.subcategory.map((content2, j) => {
                        content2.subcategory.map((content3, k) => {
                            if (content3.name === '일반공급') {
                                content3.subcategory.map((content4, l) => {
                                    if (content4.name === '국민주택')
                                        content4.link = generalKookminAptNum;
                                    else content4.link = generalMinyeongAptNum;
                                });
                            } else if (content3.name === '특별공급') {
                                content3.subcategory.map((content4, l) => {
                                    if (content4.name === '신혼부부')
                                        content4.link =
                                            specialNewlyMarriedTypeSelect;
                                    else if (content4.name === '다자녀')
                                        content4.link =
                                            specialMultiChildTypeSelect;
                                    else if (content4.name === '생애최초')
                                        content4.link =
                                            specialFirstLifeTypeSelect;
                                    else if (content4.name === '노부모')
                                        content4.link =
                                            specialOldParentTypeSelect;
                                });
                            }
                        });
                    });
                } else if (content.name === '가배점계산기') {
                    content.subcategory.map((content2, j) => {
                        content2.subcategory.map((content3, k) => {
                            if (content3.name === '민영주택')
                                content3.link = pointGeneralMinyeoungPost;
                            else if (content3.name === '신혼부부')
                                content3.link = pointNewlyMarriageAptNum;
                            else if (content3.name === '다자녀')
                                content3.link = pointMultiChildAptNum;
                            else if (content3.name === '한부모')
                                content3.link = pointOneParentAptNum;
                            else if (content3.name === '노부모')
                                content3.link = pointOldParentPost;
                        });
                    });
                }
            });
        }

        if (data3?.status === 404) {
            window.confirm('아직 기초정보가 등록되어있지 않습니다 !');
        }
    }, [commonInfoStore.getHouse, commonInfoStore.getMem]);

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
                                                            i === 1
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
    const dispatch = useDispatch();
    const tokenStore = useSelector((state) => state.token);
    const tok = storage.get('user-token');

    const commonInfoStore = useSelector((state) => state.commonInfo);
    // const authStore = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getBank());
        dispatch(getHouse());
    }, []);

    useEffect(() => {
        const data = commonInfoStore.getHouse.data;
        if (data && data.houseResponseDto) {
            dispatch(getMem(data.houseResponseDto.id));
        }
    }, [commonInfoStore.getHouse]);

    return (
        <div className="header">
            {tok || tokenStore.token ? <Logout /> : <Login />}
            <Logo></Logo>
            <Nav token={tok}></Nav>
        </div>
    );
};

export default Header;
