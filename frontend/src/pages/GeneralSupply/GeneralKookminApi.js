import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postGeneralKookminAptNum } from '../../store/actions/generalKookminAction';
import { Link } from 'react-router-dom';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    PauseCircleOutlined,
} from '@ant-design/icons';
import MainButton from '../../components/Button/MainButton';
import './GeneralSupply.css';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/loading';

const GeneralKookminApi = ({ onSaveData, location }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const generalKookminStore = useSelector((state) => state.generalKookmin); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(false);
    const [notificationNumber, setNotificationNumber] = useState();
    const [housingType, setHousingType] = useState();
    const history = useHistory();

    const data = generalKookminStore?.postGeneralKookminAptNum?.data; // 일반 민영 로직 접근 변수
    // 입력 값 오류에 의한 error 발생 시 처리 코드

    // 로딩 상태 적용
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [form, setForm] = useState({
        name: '',
        supportYn: '',
        lifeYn: '',
        generalKookminRes: '',
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveData(form);
        console.log(form);
        setForm({
            generalKookminRes: '',
        });
    };

    useEffect(() => {
        if (generalKookminStore?.postGeneralKookminAptNum?.data) {
            const data = generalKookminStore?.postGeneralKookminAptNum?.data;
            console.log(JSON.stringify(data));
        }
    }, [generalKookminStore?.postGeneralKookminAptNum]);

    // 결과가 1, 2순위일 경우 순위확인 페이지로 연결
    const rankSuccess = async () => {
        if (
            form?.generalKookminRes === '1순위' ||
            form?.generalKookminRes === '2순위'
        ) {
            history.push({
                pathname: '/rank',
                state: {
                    form,
                },
            });
        }
    };

    // 부적격 발생 시 alert 창
    const fail = async () => {
        if (form?.generalKookminRes === '탈락') {
            alert('자격 조건을 만족하지 못하는 항목이 있습니다.');
        }
    };

    console.log(data);

    return (
        <>
            {loading ? ( // 로딩 상태 2s
                <>
                    <Loading />
                    <p className="loading_msg">Please wait ...</p>
                    <p className="loading_msg">
                        회원님의 정보를 불러와{' '}
                        <strong className="text_highlight">
                            일반공급 국민주택 유형
                        </strong>{' '}
                        자격을 확인하는 중입니다. 잠시만 기다려주세요.
                    </p>
                </>
            ) : (
                <>
                    {/* 공통 정보 입력 오류 값에 의한 error 발생 시(data.error 값이 null이 아닌 경우) alert 창으로 접근 막음.
                    공통 정보 입력 수정 페이지 생성 시 수정 페이지로 연결하기. */}
                    {data?.error === 'BAD_REQUEST' ||
                    data?.error === 'NOT_FOUND' ? (
                        alert(
                            '자격 확인을 진행할 수 없습니다' +
                                '\n' +
                                '사유: ' +
                                data?.message
                        ) + history.push('/')
                    ) : (
                        <>
                            <div className="general_title">
                                <h3 className="general_mainTitle">
                                    일반공급
                                    <span className="general_subTitle">
                                        {' '}
                                        | 국민주택{' '}
                                    </span>
                                </h3>
                            </div>

                            {/* 자격확인 테이블 */}
                            <form
                                className="generalSupply_form"
                                onSubmit={handleSubmit}
                            >
                                <table className="general_table">
                                    {/* 아파트 공고 번호 및 주택형을 받아 data가 비어있지 않을 경우 보여야하는 로직 */}
                                    {data !== null ? (
                                        <>
                                            {/* 규제지역 판단. (규제지역 로직 결과값 넣기.)*/}
                                            <tr className="general_phase">
                                                <td className="qulificaiton">
                                                    <span className="qulificaitonBox">
                                                        선택한 아파트가
                                                        투기과열지구 또는
                                                        청약과열지역인가?
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span class="tooltip-text">
                                                            <p>
                                                                규제
                                                                지역('투기과열지구'
                                                                혹은
                                                                '청약과열지역')
                                                                ?
                                                            </p>
                                                            정부에서 주로
                                                            부동산의 투기 방지,
                                                            주택 시장 안정화
                                                            등을 위해 지정하여
                                                            관리하는 지역.
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="general_result">
                                                    <input
                                                        className="generalAptInfoSelect"
                                                        value={
                                                            data?.restrictedAreaTf
                                                                ? '규제지역'
                                                                : '비규제지역'
                                                        }
                                                        readOnly={true}
                                                    />
                                                    <span>
                                                        {data?.restrictedAreaTf !==
                                                        '' ? (
                                                            <span className="progress">
                                                                <CheckCircleOutlined />
                                                            </span>
                                                        ) : null}
                                                        {data?.restrictedAreaTf ===
                                                        '' ? (
                                                            <span className="pause_tooltip">
                                                                <CloseCircleOutlined />
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </td>
                                            </tr>
                                        </>
                                    ) : null}

                                    {data !== null ? (
                                        <>
                                            {/* 청약통장 조건 충족 여부 */}
                                            <tr className="general_phase">
                                                <td className="qulificaiton">
                                                    <span className="qulificaitonBox">
                                                        청약통장 조건 충족 여부
                                                    </span>
                                                </td>
                                                <td className="general_result">
                                                    <input
                                                        className="generalAptInfoSelect"
                                                        value={
                                                            data?.accountTf
                                                                ? '충족'
                                                                : '미충족'
                                                        }
                                                        readOnly={true}
                                                    />
                                                    <span>
                                                        {data?.accountTf ===
                                                        true ? (
                                                            <span className="progress">
                                                                <CheckCircleOutlined />
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.accountTf ===
                                                        false ? (
                                                            <span className="pause_tooltip">
                                                                <CloseCircleOutlined />
                                                                <span class="pause-tooltip-text">
                                                                    청약 통장
                                                                    조건 미충족
                                                                    시 부적격
                                                                    발생.
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>
                                        </>
                                    ) : null}

                                    {data?.accountTf === true ? (
                                        <>
                                            {/* 인근지역 거주 여부 */}
                                            <tr className="general_phase">
                                                <td className="qulificaiton">
                                                    <span className="qulificaitonBox">
                                                        신청한 아파트 청약
                                                        지역의 인근지역 혹은
                                                        해당지역 거주 여부
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span class="tooltip-text">
                                                            <p>
                                                                ※ 인근지역의
                                                                경우
                                                            </p>
                                                            1순위 조건 충족자는
                                                            맞지만 해당 지역에
                                                            거주하는 자에게 우선
                                                            공급하므로 {'\n'}{' '}
                                                            청약 공급 우선
                                                            순위에서 밀릴 수
                                                            있음을 주의바랍니다.
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="general_result">
                                                    <input
                                                        className="generalAptInfoSelect"
                                                        value={
                                                            data?.meetLivingInSurroundAreaTf
                                                                ? '충족'
                                                                : '미충족'
                                                        }
                                                        readOnly={true}
                                                    />
                                                    <span>
                                                        {data?.meetLivingInSurroundAreaTf ===
                                                        true ? (
                                                            <span className="progress">
                                                                <CheckCircleOutlined />
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.meetLivingInSurroundAreaTf ===
                                                        false ? (
                                                            <span className="pause_tooltip">
                                                                <CloseCircleOutlined />
                                                                <span class="pause-tooltip-text">
                                                                    인근지역
                                                                    혹은
                                                                    해당지역
                                                                    거주 미충족
                                                                    시 탈락
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>

                                            {/* 세대구성원 무주택 판별 */}
                                            {data?.meetLivingInSurroundAreaTf ===
                                            true ? (
                                                <>
                                                    <tr className="special_phase">
                                                        <td className="qulificaiton">
                                                            <span className="qulificaitonBox">
                                                                전세대구성원의
                                                                무주택 여부
                                                            </span>
                                                            <span className="info_tooltip">
                                                                <InfoCircleOutlined />
                                                                <span class="tooltip-text">
                                                                    <p>
                                                                        <div>
                                                                            ※
                                                                            무주택
                                                                            조건
                                                                        </div>
                                                                        <div className="tooltip-text-info">
                                                                            :
                                                                            무주택
                                                                            기간
                                                                            산정은
                                                                            본인
                                                                            기준
                                                                            만
                                                                            30세부터
                                                                            하되,
                                                                            그
                                                                            전에
                                                                            혼인한
                                                                            경우
                                                                            혼인신고일을
                                                                            기준으로
                                                                            산정함.
                                                                        </div>
                                                                    </p>
                                                                    <p>
                                                                        <li>
                                                                            60세
                                                                            이상
                                                                            직계존속이
                                                                            소유한
                                                                            주택
                                                                            혹은
                                                                            분양권
                                                                        </li>
                                                                        <li>
                                                                            3개월
                                                                            이내
                                                                            처분한
                                                                            상속주택
                                                                        </li>
                                                                        <li>
                                                                            비도시
                                                                            지역
                                                                            단독주택
                                                                        </li>
                                                                        <li>
                                                                            소형,
                                                                            저가
                                                                            주택
                                                                        </li>
                                                                        <li>
                                                                            폐가
                                                                            소유
                                                                        </li>
                                                                        <li>
                                                                            무허가
                                                                            건물
                                                                            소유
                                                                        </li>
                                                                        <li>
                                                                            문화재
                                                                            지정
                                                                            주택
                                                                        </li>
                                                                        <li>
                                                                            미분양
                                                                            주택
                                                                            분양권
                                                                        </li>
                                                                        <li>
                                                                            사업
                                                                            목적
                                                                        </li>
                                                                    </p>
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td className="special_result">
                                                            <input
                                                                className="generalAptInfoSelect"
                                                                value={
                                                                    data?.meetHomelessHouseholdMembersTf
                                                                        ? '충족'
                                                                        : '미충족'
                                                                }
                                                                readOnly={true}
                                                            />
                                                            <span>
                                                                {data?.meetHomelessHouseholdMembersTf ===
                                                                true ? (
                                                                    <span className="progress">
                                                                        <CheckCircleOutlined />
                                                                    </span>
                                                                ) : null}
                                                                {data?.meetHomelessHouseholdMembersTf ===
                                                                false ? (
                                                                    <span className="pause_tooltip">
                                                                        <CloseCircleOutlined />
                                                                        <span class="pause-tooltip-text">
                                                                            전
                                                                            세대
                                                                            구성원이
                                                                            무주택이
                                                                            아닐
                                                                            시
                                                                            청약
                                                                            자격
                                                                            미달.
                                                                        </span>
                                                                    </span>
                                                                ) : null}
                                                            </span>
                                                        </td>
                                                    </tr>

                                                    {/* 만 나이 로직 결과 출력*/}
                                                    {data?.meetHomelessHouseholdMembersTf ===
                                                    true ? (
                                                        <>
                                                            <tr className="general_phase">
                                                                <td className="qulificaiton">
                                                                    <span className="qulificaitonBox">
                                                                        나이
                                                                    </span>
                                                                </td>
                                                                <td className="general_result">
                                                                    <input
                                                                        className="generalAptInfoSelect"
                                                                        value={
                                                                            data?.americanAge +
                                                                            ' ' +
                                                                            '세'
                                                                        }
                                                                        readOnly={
                                                                            true
                                                                        }
                                                                    />
                                                                    <span>
                                                                        {data?.americanAge !==
                                                                        '' ? (
                                                                            <span className="progress">
                                                                                <CheckCircleOutlined />
                                                                            </span>
                                                                        ) : null}
                                                                        {data?.americanAge ===
                                                                        'null' ? (
                                                                            <span className="pause_tooltip">
                                                                                <CloseCircleOutlined />
                                                                                <span class="pause-tooltip-text">
                                                                                    나이
                                                                                    입력
                                                                                    필요.
                                                                                </span>
                                                                            </span>
                                                                        ) : null}
                                                                    </span>
                                                                </td>
                                                            </tr>

                                                            {/*  미성년자인 경우에만 보이는 로직 */}
                                                            {/* 세대주 판별 */}
                                                            {data?.americanAge <
                                                            20 ? (
                                                                <>
                                                                    <tr className="general_phase">
                                                                        <td className="qulificaiton">
                                                                            <span className="qulificaitonBox">
                                                                                세대주
                                                                                여부
                                                                            </span>
                                                                        </td>
                                                                        <td className="general_result">
                                                                            <input
                                                                                className="generalAptInfoSelect"
                                                                                value={
                                                                                    data?.householderTf
                                                                                        ? '세대주'
                                                                                        : '세대구성원'
                                                                                }
                                                                                readOnly={
                                                                                    true
                                                                                }
                                                                            />
                                                                            <span>
                                                                                {data?.householderTf ===
                                                                                true ? (
                                                                                    <span className="progress">
                                                                                        <CheckCircleOutlined />
                                                                                    </span>
                                                                                ) : null}

                                                                                {data?.householderTf ===
                                                                                false ? (
                                                                                    <span className="pause_tooltip">
                                                                                        <CloseCircleOutlined />
                                                                                        <span class="pause-tooltip-text">
                                                                                            만
                                                                                            19세
                                                                                            미만
                                                                                            미성년자는
                                                                                            세대주일
                                                                                            경우에만
                                                                                            해당
                                                                                            청약이
                                                                                            신청
                                                                                            진행
                                                                                            가능.
                                                                                        </span>
                                                                                    </span>
                                                                                ) : null}
                                                                            </span>
                                                                        </td>
                                                                    </tr>

                                                                    {/* 세대주 여부를 먼저 충족시켜야 보여지는 로직. */}
                                                                    {/* 미성년자인 경우 형제, 자매 부양 판별 */}
                                                                    {data?.householderTf ===
                                                                    true ? (
                                                                        <>
                                                                            <tr className="general_phase">
                                                                                <td className="qulificaiton">
                                                                                    <span className="qulificaitonBox">
                                                                                        형제,
                                                                                        자매
                                                                                        부양
                                                                                        여부
                                                                                    </span>
                                                                                </td>
                                                                                <td className="general_result">
                                                                                    <span className="general_result_input">
                                                                                        <input
                                                                                            className="isSupportInput"
                                                                                            type="radio"
                                                                                            name="supportYn"
                                                                                            onChange={
                                                                                                onChange
                                                                                            }
                                                                                            value="y"
                                                                                            checked={
                                                                                                form.supportYn ===
                                                                                                'y'
                                                                                                    ? true
                                                                                                    : false
                                                                                            }
                                                                                        />
                                                                                        <span className="InputText">
                                                                                            예
                                                                                        </span>
                                                                                        <input
                                                                                            className="isSupportInput"
                                                                                            type="radio"
                                                                                            name="supportYn"
                                                                                            onChange={
                                                                                                onChange
                                                                                            }
                                                                                            value="n"
                                                                                            checked={
                                                                                                form.supportYn ===
                                                                                                'n'
                                                                                                    ? true
                                                                                                    : false
                                                                                            }
                                                                                        />
                                                                                        <span className="InputText">
                                                                                            아니오
                                                                                        </span>
                                                                                    </span>
                                                                                    <span>
                                                                                        {form.supportYn ===
                                                                                        'y' ? (
                                                                                            <span className="progress">
                                                                                                <CheckCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}
                                                                                        {form.supportYn ===
                                                                                        'n' ? (
                                                                                            <span className="pause_tooltip">
                                                                                                <CloseCircleOutlined />
                                                                                                <span class="pause-tooltip-text">
                                                                                                    만
                                                                                                    19세
                                                                                                    미만
                                                                                                    미성년자는
                                                                                                    세대주이면서
                                                                                                    부양할
                                                                                                    가족이
                                                                                                    있는
                                                                                                    경우에만
                                                                                                    해당
                                                                                                    청약이
                                                                                                    신청
                                                                                                    진행
                                                                                                    가능.
                                                                                                </span>
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        </>
                                                                    ) : null}
                                                                </>
                                                            ) : null}

                                                            {/* 20대인 경우에만 보이는 로직 */}
                                                            {/* 20대 단독 세대주 여부 */}
                                                            {data?.americanAge >=
                                                                20 &&
                                                            data?.americanAge <
                                                                30 ? (
                                                                <>
                                                                    <tr className="general_phase">
                                                                        <td className="qulificaiton">
                                                                            <span className="qulificaitonBox">
                                                                                소득이
                                                                                있으면서
                                                                                독립적으로
                                                                                생계
                                                                                유지가
                                                                                가능한가?
                                                                            </span>
                                                                            <span className="info_tooltip">
                                                                                <InfoCircleOutlined />
                                                                                <span class="tooltip-text">
                                                                                    <p>
                                                                                        미혼
                                                                                        20대
                                                                                        단독세대주
                                                                                        ?
                                                                                    </p>
                                                                                    20대이며,
                                                                                    최저
                                                                                    생계비
                                                                                    (기준중위소득
                                                                                    40%,
                                                                                    약
                                                                                    월
                                                                                    70만원)
                                                                                    이상의
                                                                                    소득이
                                                                                    존재해야
                                                                                    함.
                                                                                </span>
                                                                            </span>
                                                                        </td>
                                                                        <td className="general_result">
                                                                            <span className="general_result_input">
                                                                                <input
                                                                                    className="isLifeYnInput"
                                                                                    type="radio"
                                                                                    name="lifeYn"
                                                                                    onChange={
                                                                                        onChange
                                                                                    }
                                                                                    value="y"
                                                                                    checked={
                                                                                        form.lifeYn ===
                                                                                        'y'
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                />
                                                                                <span className="InputText">
                                                                                    예
                                                                                </span>
                                                                                <input
                                                                                    className="isLifeYnInput"
                                                                                    type="radio"
                                                                                    name="lifeYn"
                                                                                    onChange={
                                                                                        onChange
                                                                                    }
                                                                                    value="n"
                                                                                    checked={
                                                                                        form.lifeYn ===
                                                                                        'n'
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                />
                                                                                <span className="InputText">
                                                                                    아니오
                                                                                </span>
                                                                            </span>
                                                                            <span>
                                                                                {form.lifeYn ===
                                                                                'y' ? (
                                                                                    <span className="progress">
                                                                                        <CheckCircleOutlined />
                                                                                    </span>
                                                                                ) : null}
                                                                                {form.lifeYn ===
                                                                                'n' ? (
                                                                                    <span className="pause_tooltip">
                                                                                        <CloseCircleOutlined />
                                                                                        <span class="tooltip-text">
                                                                                            생계
                                                                                            유지
                                                                                            기준
                                                                                            소득
                                                                                            확인
                                                                                            필요.
                                                                                        </span>
                                                                                    </span>
                                                                                ) : null}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            ) : null}

                                                            {/* 이후 조건 충족 시 다음 인풋 보이도록. */}

                                                            {/* 순위 판별 시작 */}
                                                            {/* 세대주 여부 (미성년자 제외) */}
                                                            {(data?.americanAge <
                                                                20 &&
                                                                data?.householderTf ===
                                                                    true &&
                                                                form.supportYn ===
                                                                    'y') ||
                                                            (data?.americanAge >=
                                                                20 &&
                                                                data?.americanAge <
                                                                    30 &&
                                                                form.lifeYn ===
                                                                    'y') ||
                                                            data?.americanAge >=
                                                                30 ? (
                                                                <>
                                                                    <tr className="special_phase">
                                                                        <td className="qulificaiton">
                                                                            <span className="qulificaitonBox">
                                                                                전세대원의
                                                                                재당첨
                                                                                제한
                                                                                여부
                                                                            </span>
                                                                        </td>
                                                                        <td className="special_result">
                                                                            <input
                                                                                className="aptInfoSelect"
                                                                                value={
                                                                                    data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                                                    true
                                                                                        ? '제한 없음'
                                                                                        : '제한 있음'
                                                                                }
                                                                                readOnly={
                                                                                    true
                                                                                }
                                                                            />
                                                                            <span>
                                                                                {data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                                                true ? (
                                                                                    <span className="progress">
                                                                                        <CheckCircleOutlined />
                                                                                    </span>
                                                                                ) : null}
                                                                                {data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                                                false ? (
                                                                                    <span className="pause_tooltip">
                                                                                        <CloseCircleOutlined />
                                                                                        <span class="pause-tooltip-text">
                                                                                            제당첨
                                                                                            제한
                                                                                            있을
                                                                                            경우
                                                                                            탈락.
                                                                                        </span>
                                                                                    </span>
                                                                                ) : null}
                                                                            </span>
                                                                        </td>
                                                                    </tr>

                                                                    {data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                                    true ? (
                                                                        <>
                                                                            {/* 규제 지역인 경우에만 보이도록 */}
                                                                            {data?.restrictedAreaTf ===
                                                                            true ? (
                                                                                <>
                                                                                    {data?.americanAge >=
                                                                                    20 ? (
                                                                                        <>
                                                                                            <tr className="general_phase">
                                                                                                <td className="qulificaiton">
                                                                                                    <span className="qulificaitonBox">
                                                                                                        세대주
                                                                                                        여부
                                                                                                    </span>
                                                                                                </td>
                                                                                                <td className="general_result">
                                                                                                    <input
                                                                                                        className="generalAptInfoSelect"
                                                                                                        value={
                                                                                                            data?.householderTf
                                                                                                                ? '세대주'
                                                                                                                : '세대구성원'
                                                                                                        }
                                                                                                        readOnly={
                                                                                                            true
                                                                                                        }
                                                                                                    />
                                                                                                    <span>
                                                                                                        {data?.householderTf ===
                                                                                                        true ? (
                                                                                                            <span className="progress">
                                                                                                                <CheckCircleOutlined />
                                                                                                            </span>
                                                                                                        ) : null}
                                                                                                        {data?.householderTf ===
                                                                                                        false ? (
                                                                                                            <span className="secondRankTootip">
                                                                                                                <PauseCircleOutlined />
                                                                                                            </span>
                                                                                                        ) : null}
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </>
                                                                                    ) : null}

                                                                                    {/* 세대원 청약 당첨 이력 전무 여부 */}
                                                                                    {data?.householderTf ===
                                                                                    true ? (
                                                                                        <>
                                                                                            <tr className="general_phase">
                                                                                                <td className="qulificaiton">
                                                                                                    <span className="qulificaitonBox">
                                                                                                        전
                                                                                                        세대원의
                                                                                                        5년
                                                                                                        이내
                                                                                                        청약
                                                                                                        당첨이력
                                                                                                        전무
                                                                                                        여부
                                                                                                    </span>
                                                                                                </td>
                                                                                                <td className="general_result">
                                                                                                    <input
                                                                                                        className="generalAptInfoSelect"
                                                                                                        value={
                                                                                                            data?.meetAllHouseMemberNotWinningIn5yearsTf
                                                                                                                ? '충족'
                                                                                                                : '미충족'
                                                                                                        }
                                                                                                        readOnly={
                                                                                                            true
                                                                                                        }
                                                                                                    />
                                                                                                    <span>
                                                                                                        {data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                                                                                        true ? (
                                                                                                            <span className="progress">
                                                                                                                <CheckCircleOutlined />
                                                                                                            </span>
                                                                                                        ) : null}
                                                                                                        {data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                                                                                        false ? (
                                                                                                            <span className="secondRankTootip">
                                                                                                                <PauseCircleOutlined />
                                                                                                            </span>
                                                                                                        ) : null}
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </>
                                                                                    ) : null}
                                                                                </>
                                                                            ) : null}

                                                                            {/* 청약통장 가입기간 충족 여부 */}
                                                                            {
                                                                                // 규제지역인 경우
                                                                                (data?.restrictedAreaTf ===
                                                                                    true &&
                                                                                    data?.householderTf ===
                                                                                        true &&
                                                                                    data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                                                                        true) ||
                                                                                // 규제지역이 아닌경우
                                                                                data?.restrictedAreaTf ===
                                                                                    false ? (
                                                                                    <>
                                                                                        <tr className="general_phase">
                                                                                            <td className="qulificaiton">
                                                                                                <span className="qulificaitonBox">
                                                                                                    청약통장
                                                                                                    가입기간
                                                                                                    충족여부
                                                                                                </span>
                                                                                                <span className="info_tooltip">
                                                                                                    <InfoCircleOutlined />
                                                                                                    <span class="tooltip-text">
                                                                                                        <table
                                                                                                            border="1"
                                                                                                            className="tootipeTable"
                                                                                                        >
                                                                                                            <tr>
                                                                                                                <td>
                                                                                                                    지역
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    규제지역
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    위축지역
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    수도권
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    수도권
                                                                                                                    외
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td>
                                                                                                                    가입기간
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    24개월
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    1개월
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    12개월
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    6개월
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </table>
                                                                                                    </span>
                                                                                                </span>
                                                                                            </td>
                                                                                            <td className="general_result">
                                                                                                <input
                                                                                                    className="generalAptInfoSelect"
                                                                                                    value={
                                                                                                        data?.meetBankbookJoinPeriodTf
                                                                                                            ? '충족'
                                                                                                            : '미충족'
                                                                                                    }
                                                                                                    readOnly={
                                                                                                        true
                                                                                                    }
                                                                                                />
                                                                                                <span>
                                                                                                    {data?.meetBankbookJoinPeriodTf ===
                                                                                                    true ? (
                                                                                                        <span className="progress">
                                                                                                            <CheckCircleOutlined />
                                                                                                        </span>
                                                                                                    ) : null}
                                                                                                    {data?.meetBankbookJoinPeriodTf ===
                                                                                                    false ? (
                                                                                                        <span className="secondRankTootip">
                                                                                                            <PauseCircleOutlined />
                                                                                                        </span>
                                                                                                    ) : null}
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>

                                                                                        {/* 예치 금액 충족 여부 */}
                                                                                        {(data?.restrictedAreaTf ===
                                                                                            true &&
                                                                                            data?.householderTf ===
                                                                                                true &&
                                                                                            data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                                                                                true &&
                                                                                            data?.meetBankbookJoinPeriodTf ===
                                                                                                true) ||
                                                                                        (data?.restrictedAreaTf ===
                                                                                            false &&
                                                                                            data?.meetBankbookJoinPeriodTf ===
                                                                                                true) ? (
                                                                                            <>
                                                                                                <tr className="general_phase">
                                                                                                    <td className="qulificaiton">
                                                                                                        <span className="qulificaitonBox">
                                                                                                            건설지역
                                                                                                            별
                                                                                                            납입횟수
                                                                                                            충족
                                                                                                            여부
                                                                                                        </span>
                                                                                                        <span className="info_tooltip">
                                                                                                            <InfoCircleOutlined />
                                                                                                            <span class="tooltip-text">
                                                                                                                <table
                                                                                                                    border="1"
                                                                                                                    className="tootipeTable"
                                                                                                                >
                                                                                                                    <tr>
                                                                                                                        <td>
                                                                                                                            지역
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            규제지역
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            수도권
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            수도권
                                                                                                                            외
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td>
                                                                                                                            납입횟수
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            24회
                                                                                                                            이상
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            12회
                                                                                                                            이상
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            6회
                                                                                                                            이상
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </table>
                                                                                                            </span>
                                                                                                        </span>
                                                                                                    </td>
                                                                                                    <td className="general_result">
                                                                                                        <input
                                                                                                            className="generalAptInfoSelect"
                                                                                                            value={
                                                                                                                data?.meetNumberOfPaymentsTf
                                                                                                                    ? '충족'
                                                                                                                    : '미충족'
                                                                                                            }
                                                                                                            readOnly={
                                                                                                                true
                                                                                                            }
                                                                                                        />
                                                                                                        <span>
                                                                                                            {(data?.restrictedAreaTf ===
                                                                                                                true &&
                                                                                                                data?.householderTf ===
                                                                                                                    true &&
                                                                                                                data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                                                                                                    true &&
                                                                                                                data?.meetBankbookJoinPeriodTf ===
                                                                                                                    true &&
                                                                                                                data?.meetNumberOfPaymentsTf ===
                                                                                                                    true) ||
                                                                                                            (data?.restrictedAreaTf ===
                                                                                                                false &&
                                                                                                                data?.meetBankbookJoinPeriodTf ===
                                                                                                                    true &&
                                                                                                                data?.meetNumberOfPaymentsTf ===
                                                                                                                    true) ? (
                                                                                                                <span className="progress">
                                                                                                                    <CheckCircleOutlined />
                                                                                                                </span>
                                                                                                            ) : null}
                                                                                                            {data?.meetNumberOfPaymentsTf ===
                                                                                                            false ? (
                                                                                                                <span className="secondRankTootip">
                                                                                                                    <PauseCircleOutlined />
                                                                                                                </span>
                                                                                                            ) : null}
                                                                                                        </span>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </>
                                                                                        ) : null}
                                                                                    </>
                                                                                ) : null
                                                                            }
                                                                        </>
                                                                    ) : null}
                                                                </>
                                                            ) : null}
                                                        </>
                                                    ) : null}
                                                </>
                                            ) : null}
                                        </>
                                    ) : null}
                                </table>

                                <div className="rankRes">
                                    {/* 순위 매기기 */}
                                    {/* 1순위 */}
                                    {data?.accountTf === true &&
                                    data?.meetLivingInSurroundAreaTf === true &&
                                    data?.meetHomelessHouseholdMembersTf ===
                                        true &&
                                    ((data?.americanAge < 20 &&
                                        form.supportYn === 'y' &&
                                        data?.householderTf === true) ||
                                        (data?.americanAge >= 20 &&
                                            data?.americanAge < 30 &&
                                            form.lifeYn === 'y') ||
                                        data?.americanAge >= 30) &&
                                    data?.meetAllHouseMemberRewinningRestrictionTf ===
                                        true &&
                                    ((data?.restrictedAreaTf === true &&
                                        data?.householderTf === true &&
                                        data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                            true) ||
                                        data?.restrictedAreaTf === false) &&
                                    data?.meetBankbookJoinPeriodTf === true &&
                                    data?.meetNumberOfPaymentsTf === true
                                        ? (form.generalKookminRes = '1순위')
                                        : null}

                                    {/* 2순위 */}
                                    {data?.accountTf === true &&
                                    data?.meetLivingInSurroundAreaTf === true &&
                                    data?.meetHomelessHouseholdMembersTf ===
                                        true &&
                                    ((data?.americanAge < 20 &&
                                        form.supportYn === 'y' &&
                                        data?.householderTf === true) ||
                                        (data?.americanAge >= 20 &&
                                            data?.americanAge < 30 &&
                                            form.lifeYn === 'y') ||
                                        data?.americanAge >= 30) &&
                                    data?.meetAllHouseMemberRewinningRestrictionTf ===
                                        true &&
                                    ((data?.restrictedAreaTf === true && // 규제지역
                                        ((data?.americanAge >= 20 &&
                                            data?.householderTf === false) ||
                                            data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                                false)) ||
                                        data?.meetBankbookJoinPeriodTf ===
                                            false ||
                                        data?.meetNumberOfPaymentsTf ===
                                            false ||
                                        // 비규제지역
                                        (data?.restrictedAreaTf === false &&
                                            (data?.meetBankbookJoinPeriodTf ===
                                                false ||
                                                data?.meetNumberOfPaymentsTf ===
                                                    false)))
                                        ? (form.generalKookminRes = '2순위')
                                        : null}

                                    {/* 탈락 */}
                                    {data?.accountTf === false ||
                                    data?.meetLivingInSurroundAreaTf ===
                                        false ||
                                    data?.meetHomelessHouseholdMembersTf ===
                                        false ||
                                    (data?.americanAge < 20 &&
                                        (form.supportYn === 'n' ||
                                            data?.householderTf === false)) ||
                                    (data?.americanAge >= 20 &&
                                        data?.americanAge < 30 &&
                                        form.lifeYn === 'n' &&
                                        data?.meetAllHouseMemberRewinningRestrictionTf ===
                                            false)
                                        ? (form.generalKookminRes = '탈락')
                                        : null}
                                </div>

                                {/* 순위에 따른 페이지 이동 */}
                                {/* 1, 2순위 */}
                                {form.generalKookminRes === '1순위' ||
                                form.generalKookminRes === '2순위' ? (
                                    <div className="generalRankButton">
                                        <MainButton
                                            onClick={rankSuccess}
                                            type="button"
                                            width="100"
                                            height="30"
                                            fontWeight="bold"
                                            marginLeft="20%"
                                        >
                                            순위 확인하기
                                        </MainButton>
                                    </div>
                                ) : null}

                                {/* 탈락 */}
                                {form.generalKookminRes === '탈락' ? (
                                    <div className="generalRankButton">
                                        <MainButton
                                            onClick={fail}
                                            type="button"
                                            width="100"
                                            height="30"
                                            fontWeight="bold"
                                            marginLeft="20%"
                                        >
                                            순위 확인하기
                                        </MainButton>
                                    </div>
                                ) : null}
                            </form>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default GeneralKookminApi;
