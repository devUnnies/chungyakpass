import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
    postGeneralKookminAptNum,
    patchGeneralKookminRank,
    getGeneralKookminRank,
} from '../../store/actions/generalKookminAction';
import {
    CheckOutlined,
    CaretRightOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    PauseCircleOutlined,
} from '@ant-design/icons';
import MainButton from '../../components/Button/MainButton';
import './GeneralSupply.css';
import useInputState from '../../components/Input/useInputState';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/loading';

const GeneralKookminApi = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const generalKookminStore = useSelector((state) => state.generalKookmin); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.

    const [form, setForm] = useState({
        name: '',
        generalKookminRes: '',
    });

    // info_tooltip animation 추가
    const [mount, setMount] = useState(false);
    const [effect, setEffect] = useState('mount2');

    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();
    // 일반 국민 순위 patch
    const [supportYn, setSupportYn, handleChangeSupportYn] =
        useInputState(null);
    const [lifeYn, setLifeYn, handleChangeLifeYn] = useInputState(null);
    // 순위
    const [generalKookminRank, setGeneralKookminRank] = useState('');

    // 로딩 상태 적용
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, []);

    useEffect(() => {
        if (generalKookminStore.postGeneralKookminAptNum.data) {
            const data = generalKookminStore.postGeneralKookminAptNum?.data;
            console.log(JSON.stringify(data));
        }
    }, [generalKookminStore.postGeneralKookminAptNum]);

    // 순위 로직
    useEffect(() => {
        // 순위 useEffect.
        if (generalKookminStore?.patchGeneralKookminRank) {
            const data = generalKookminStore?.patchGeneralKookminRank?.data;
        }
    }, [generalKookminStore?.patchGeneralKookminRank]);

    const data = generalKookminStore?.postGeneralKookminAptNum?.data; // 일반 민영 로직 접근 변수
    // console.log(data.id);

    // info tooltip animation
    const onClickBtn = () => {
        if (mount) {
            setEffect('unmount');
            setTimeout(() => {
                setMount((v) => !v);
            }, 400);
        } else {
            setEffect('mount2');
            setMount((v) => !v);
        }
    };

    const onChange = (e) => {
        const { generalKookminRes, value } = e.target;
        setForm({
            ...form,
            [generalKookminRes]: value,
        });
    };

    // 결과가 1, 2순위일 경우 순위확인 페이지로 연결
    const rankSuccess = async () => {
        if (
            form?.generalKookminRes === '일순위' ||
            form?.generalKookminRes === '이순위'
        ) {
            dispatch(
                patchGeneralKookminRank({
                    verificationRecordGeneralKookminId: data.id,
                    generalKookminRank: form.generalKookminRes,
                    supportYn,
                    lifeYn,
                })
            );

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
            dispatch(
                patchGeneralKookminRank({
                    verificationRecordGeneralKookminId: data.id,
                    generalKookminRank: form.generalKookminRes,
                    supportYn,
                    lifeYn,
                })
            );
        }
    };

    // 일반 국민 순위 로직
    if (
        data?.accountTf === true &&
        data?.meetLivingInSurroundAreaTf === true &&
        data?.meetHomelessHouseholdMembersTf === true &&
        ((data?.americanAge < 20 &&
            supportYn === 'y' &&
            data?.householderTf === true) ||
            (data?.americanAge >= 20 &&
                data?.americanAge < 30 &&
                lifeYn === 'y') ||
            data?.americanAge >= 30) &&
        ((data?.restrictedAreaTf === true &&
            data?.meetAllHouseMemberRewinningRestrictionTf === true &&
            data?.householderTf === true &&
            data?.meetAllHouseMemberNotWinningIn5yearsTf === true) ||
            data?.restrictedAreaTf === false) &&
        data?.meetBankbookJoinPeriodTf === true &&
        data?.meetNumberOfPaymentsTf === true
    ) {
        form.generalKookminRes = '일순위';
    } else if (
        data?.accountTf === true &&
        data?.meetLivingInSurroundAreaTf === true &&
        data?.meetHomelessHouseholdMembersTf === true &&
        ((data?.americanAge < 20 &&
            supportYn === 'y' &&
            data?.householderTf === true) ||
            (data?.americanAge >= 20 &&
                data?.americanAge < 30 &&
                lifeYn === 'y') ||
            data?.americanAge >= 30) &&
        ((data?.restrictedAreaTf === true && // 규제지역
            data?.meetAllHouseMemberRewinningRestrictionTf === true &&
            ((data?.americanAge >= 20 && data?.householderTf === false) ||
                data?.meetAllHouseMemberNotWinningIn5yearsTf === false ||
                data?.meetBankbookJoinPeriodTf === false ||
                data?.meetNumberOfPaymentsTf === false)) ||
            // 비규제지역
            (data?.restrictedAreaTf === false &&
                (data?.meetBankbookJoinPeriodTf === false ||
                    data?.meetNumberOfPaymentsTf === false)))
    ) {
        form.generalKookminRes = '이순위';
    } else if (
        data?.accountTf === false ||
        data?.meetLivingInSurroundAreaTf === false ||
        data?.meetHomelessHouseholdMembersTf === false ||
        (data?.americanAge < 20 && supportYn !== 'y') ||
        data?.householderTf === false ||
        (data?.americanAge >= 20 && lifeYn !== 'y') ||
        data?.meetAllHouseMemberRewinningRestrictionTf === false
    ) {
        form.generalKookminRes = '탈락';
    } else {
        form.generalKookminRes = '';
    }

    const handleSubmit = (e) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        e.preventDefault();
        onSaveData(form);
        setForm({
            generalKookminRes: '',
        });

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            patchGeneralKookminRank({
                verificationRecordGeneralKookminId: data.id,
                generalKookminRank,
                supportYn,
                lifeYn,
            })
        );
    };

    console.log(supportYn);
    console.log(lifeYn);
    console.log(form?.generalKookminRes);

    return (
        <>
            {loading ? ( // 로딩 상태 2s
                <>
                    <Loading />
                    <p className="loading_msg1">Please wait ...</p>
                    <p className="loading_msg2">
                        회원님의{' '}
                        <strong className="text_highlight">
                            일반공급 국민주택 유형
                        </strong>{' '}
                        자격 확인 중입니다. <br />
                        잠시만 기다려주세요.
                    </p>
                </>
            ) : (
                <>
                    {/* 공통 정보 입력 오류 값에 의한 error 발생 시(data?.error 값이 null이 아닌 경우) alert 창으로 접근 막음.
                    공통 정보 입력 수정 페이지 생성 시 수정 페이지로 연결하기. */}
                    {data?.error === 'BAD_REQUEST' ||
                    data?.error === 'NOT_FOUND' ? (
                        <>
                            {/* 아파트 공고번호 입력 오류일 경우 해당 공급 종류의 aptNum페이지로 이동. */}
                            {data?.code === 'NOT_FOUND_APT'
                                ? alert(
                                      '자격 확인을 진행할 수 없습니다' +
                                          '\n' +
                                          '사유: ' +
                                          data?.message
                                  ) + history.push('generalKookminAptNum')
                                : alert(
                                      '자격 확인을 진행할 수 없습니다' +
                                          '\n' +
                                          '사유: ' +
                                          data?.message
                                  ) + history.goBack(-1)}
                        </>
                    ) : (
                        <>
                            <div className="general_title">
                                <strong className="general_mainTitle">
                                    일반공급{' '}
                                </strong>
                                <span className="general_subTitle">
                                    | 국민주택
                                </span>
                                <div className="general_subPlusTitle">
                                    <span className="checkRedIcon">
                                        <CheckOutlined />
                                    </span>
                                    청약 자격 확인
                                </div>
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
                                                <td className="qualification">
                                                    <span className="qualificationBox">
                                                        <span className="qualificationIcon">
                                                            <CaretRightOutlined />
                                                        </span>
                                                        선택한 아파트가
                                                        투기과열지구 또는
                                                        청약과열지역인가?
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span className="tooltip-text">
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
                                                <td className="qualification">
                                                    <span className="qualificationBox">
                                                        <span className="qualificationIcon">
                                                            <CaretRightOutlined />
                                                        </span>
                                                        청약통장 조건 충족 여부
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span className="tooltip-text">
                                                            <p>
                                                                ※ 국민 주택의
                                                                경우
                                                            </p>
                                                            주택청약종합저축
                                                            혹은 청약 저축인
                                                            경우에만 청약통장
                                                            조건 만족.
                                                        </span>
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
                                                <td className="qualification">
                                                    <span className="qualificationBox">
                                                        <span className="qualificationIcon">
                                                            <CaretRightOutlined />
                                                        </span>
                                                        신청한 아파트 청약
                                                        지역의 인근지역 혹은
                                                        해당지역 거주 여부
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span className="tooltip-text">
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
                                                    <tr className="general_phase">
                                                        <td className="qualification">
                                                            <span className="qualificationBox">
                                                                <span className="qualificationIcon">
                                                                    <CaretRightOutlined />
                                                                </span>
                                                                전세대구성원의
                                                                무주택 여부
                                                            </span>
                                                            <span className="info_tooltip">
                                                                <InfoCircleOutlined />
                                                                <span className="tooltip-text">
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
                                                                            30세부터,
                                                                            <br />
                                                                            30세
                                                                            이전에
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
                                                        <td className="general_result">
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
                                                                <td className="qualification">
                                                                    <span className="qualificationBox">
                                                                        <span className="qualificationIcon">
                                                                            <CaretRightOutlined />
                                                                        </span>
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
                                                                        <td className="qualification">
                                                                            <span className="qualificationBox">
                                                                                <span className="qualificationIcon">
                                                                                    <CaretRightOutlined />
                                                                                </span>
                                                                                세대주
                                                                                여부
                                                                            </span>
                                                                            <span className="info_tooltip">
                                                                                <InfoCircleOutlined />
                                                                                <span className="tooltip-text">
                                                                                    <p>
                                                                                        미성년자의
                                                                                        경우
                                                                                    </p>
                                                                                    반드시
                                                                                    세대주인
                                                                                    경우에만
                                                                                    청약
                                                                                    가능.
                                                                                </span>
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
                                                                                <td className="qualification">
                                                                                    <span className="qualificationBox">
                                                                                        <span className="qualificationIcon">
                                                                                            <CaretRightOutlined />
                                                                                        </span>
                                                                                        형제,
                                                                                        자매
                                                                                        부양
                                                                                        여부
                                                                                    </span>
                                                                                    <span className="info_tooltip">
                                                                                        <InfoCircleOutlined />
                                                                                        <span className="tooltip-text">
                                                                                            <p>
                                                                                                미성년자의
                                                                                                경우
                                                                                            </p>
                                                                                            자녀
                                                                                            양육
                                                                                            혹은
                                                                                            형제,
                                                                                            자매를
                                                                                            부양(직계존속의
                                                                                            사망,
                                                                                            실종선고
                                                                                            및
                                                                                            행방불명
                                                                                            등으로
                                                                                            인한)해야
                                                                                            함.{' '}
                                                                                            <br />
                                                                                            (단,
                                                                                            자녀
                                                                                            및
                                                                                            형제,
                                                                                            자매는
                                                                                            세대주인
                                                                                            미성년자와
                                                                                            같은
                                                                                            세대별
                                                                                            주민등록표등본에
                                                                                            등재되어
                                                                                            있어야
                                                                                            함.)
                                                                                        </span>
                                                                                    </span>
                                                                                </td>
                                                                                <td className="general_result">
                                                                                    <span className="general_result_input">
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="supportYn"
                                                                                            onChange={
                                                                                                handleChangeSupportYn
                                                                                            }
                                                                                            value="y"
                                                                                            checked={
                                                                                                supportYn ===
                                                                                                'y'
                                                                                                    ? true
                                                                                                    : false
                                                                                            }
                                                                                        />
                                                                                        <span className="InputText">
                                                                                            예
                                                                                        </span>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="supportYn"
                                                                                            onChange={
                                                                                                handleChangeSupportYn
                                                                                            }
                                                                                            value="n"
                                                                                            checked={
                                                                                                supportYn ===
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
                                                                                        {supportYn ===
                                                                                        'y' ? (
                                                                                            <span className="progress">
                                                                                                <CheckCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}
                                                                                        {supportYn ===
                                                                                        'n' ? (
                                                                                            <span className="pause_tooltip">
                                                                                                <CloseCircleOutlined />
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
                                                                        <td className="qualification">
                                                                            <span className="qualificationBox">
                                                                                <span className="qualificationIcon">
                                                                                    <CaretRightOutlined />
                                                                                </span>
                                                                                소득이
                                                                                있으면서
                                                                                독립적으로
                                                                                생계
                                                                                유지가
                                                                                가능한가?
                                                                            </span>
                                                                            <span className="info_tooltip">
                                                                                <InfoCircleOutlined />
                                                                                <span className="tooltip-text">
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
                                                                                        handleChangeLifeYn
                                                                                    }
                                                                                    value="y"
                                                                                    checked={
                                                                                        lifeYn ===
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
                                                                                        handleChangeLifeYn
                                                                                    }
                                                                                    value="n"
                                                                                    checked={
                                                                                        lifeYn ===
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
                                                                                {lifeYn ===
                                                                                'y' ? (
                                                                                    <span className="progress">
                                                                                        <CheckCircleOutlined />
                                                                                    </span>
                                                                                ) : null}
                                                                                {lifeYn ===
                                                                                'n' ? (
                                                                                    <span className="pause_tooltip">
                                                                                        <CloseCircleOutlined />
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
                                                                supportYn ===
                                                                    'y') ||
                                                            (data?.americanAge >=
                                                                20 &&
                                                                data?.americanAge <
                                                                    30 &&
                                                                lifeYn ===
                                                                    'y') ||
                                                            data?.americanAge >=
                                                                30 ? (
                                                                <>
                                                                    <tr className="general_phase">
                                                                        <td className="qualification">
                                                                            <span className="qualificationBox">
                                                                                <span className="qualificationIcon">
                                                                                    <CaretRightOutlined />
                                                                                </span>
                                                                                전세대원의
                                                                                재당첨
                                                                                제한
                                                                                여부
                                                                            </span>
                                                                            <span className="info_tooltip">
                                                                                <InfoCircleOutlined />
                                                                                <span className="tooltip-text">
                                                                                    <p>
                                                                                        국민주택의
                                                                                        경우
                                                                                    </p>
                                                                                    재당첨
                                                                                    제한이
                                                                                    있을
                                                                                    경우
                                                                                    청약을
                                                                                    진행할
                                                                                    수
                                                                                    없음.
                                                                                </span>
                                                                            </span>
                                                                        </td>
                                                                        <td className="general_result">
                                                                            <input
                                                                                className="generalAptInfoSelect"
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
                                                                                                <td className="qualification">
                                                                                                    <span className="qualificationBox">
                                                                                                        <span className="qualificationIcon">
                                                                                                            <CaretRightOutlined />
                                                                                                        </span>
                                                                                                        세대주
                                                                                                        여부
                                                                                                    </span>
                                                                                                    <span className="info_tooltip">
                                                                                                        <InfoCircleOutlined />
                                                                                                        <span className="tooltip-text">
                                                                                                            <p>
                                                                                                                <strong>
                                                                                                                    1순위
                                                                                                                    제한자
                                                                                                                </strong>
                                                                                                            </p>
                                                                                                            규제지역(투기과열지구
                                                                                                            및
                                                                                                            청약과열지역)
                                                                                                            내
                                                                                                            국민
                                                                                                            주택에
                                                                                                            청약하는
                                                                                                            경우,
                                                                                                            세대주가
                                                                                                            아닌자
                                                                                                        </span>
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
                                                                                                <td className="qualification">
                                                                                                    <span className="qualificationBox">
                                                                                                        <span className="qualificationIcon">
                                                                                                            <CaretRightOutlined />
                                                                                                        </span>

                                                                                                        전
                                                                                                        세대원의
                                                                                                        5년
                                                                                                        이내
                                                                                                        청약
                                                                                                        당첨이력
                                                                                                        전무
                                                                                                        여부
                                                                                                    </span>
                                                                                                    <span className="info_tooltip">
                                                                                                        <InfoCircleOutlined />
                                                                                                        <span className="tooltip-text">
                                                                                                            <p>
                                                                                                                <strong>
                                                                                                                    1순위
                                                                                                                    제한자
                                                                                                                </strong>
                                                                                                            </p>
                                                                                                            규제지역(투기과열지구
                                                                                                            및
                                                                                                            청약과열지역)
                                                                                                            내
                                                                                                            국민
                                                                                                            주택에
                                                                                                            청약하는
                                                                                                            경우,
                                                                                                            <br />
                                                                                                            과거
                                                                                                            5년
                                                                                                            이내에
                                                                                                            다른
                                                                                                            주택에
                                                                                                            당첨된
                                                                                                            자가
                                                                                                            속해있는
                                                                                                            무주택
                                                                                                            세대구성원
                                                                                                        </span>
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
                                                                                            <td className="qualification">
                                                                                                <span className="qualificationBox">
                                                                                                    <span className="qualificationIcon">
                                                                                                        <CaretRightOutlined />
                                                                                                    </span>
                                                                                                    청약통장
                                                                                                    가입기간
                                                                                                    충족여부
                                                                                                </span>
                                                                                                <span className="info_tooltip">
                                                                                                    <InfoCircleOutlined />
                                                                                                    <span className="tooltip-text">
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
                                                                                                                    <br />
                                                                                                                    (필요한
                                                                                                                    경우,
                                                                                                                    24개월까지
                                                                                                                    연장가능)
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    6개월
                                                                                                                    <br />
                                                                                                                    (필요한
                                                                                                                    경우,
                                                                                                                    12개월까지
                                                                                                                    연장가능)
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
                                                                                                    <td className="qualification">
                                                                                                        <span className="qualificationBox">
                                                                                                            <span className="qualificationIcon">
                                                                                                                <CaretRightOutlined />
                                                                                                            </span>
                                                                                                            건설지역
                                                                                                            별
                                                                                                            납입횟수
                                                                                                            충족
                                                                                                            여부
                                                                                                        </span>
                                                                                                        <span className="info_tooltip">
                                                                                                            <InfoCircleOutlined />
                                                                                                            <span className="tooltip-text">
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
                                                                                                                            납입횟수
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            24회
                                                                                                                            이상
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            1회
                                                                                                                            이상
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            12회
                                                                                                                            이상
                                                                                                                            <br />
                                                                                                                            (필요한
                                                                                                                            경우,
                                                                                                                            24회까지
                                                                                                                            연장가능)
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            6회
                                                                                                                            이상
                                                                                                                            <br />
                                                                                                                            (필요한
                                                                                                                            경우,
                                                                                                                            12회까지
                                                                                                                            연장가능)
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </table>

                                                                                                                *
                                                                                                                단,
                                                                                                                월납입금을
                                                                                                                연체하여
                                                                                                                납입한
                                                                                                                경우
                                                                                                                주택
                                                                                                                공급에
                                                                                                                관한
                                                                                                                규칙
                                                                                                                제10조제3항에
                                                                                                                따라
                                                                                                                순위
                                                                                                                발생일이
                                                                                                                순연됨.
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

                                {/* 순위에 따른 페이지 이동 */}
                                {/* 1, 2순위 */}
                                {form.generalKookminRes === '일순위' ||
                                form.generalKookminRes === '이순위' ? (
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
