import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
    postGeneralMinyeongAptNum,
    patchGeneralMinyeongRank,
    getGeneralMinyeongRank,
} from '../../store/actions/generalMinyeongAction';
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

const GeneralMinyeongApi = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const generalMinyeongStore = useSelector((state) => state.generalMinyeong); // 일반민영 api
    const [form, setForm] = useState({
        name: '',
        generalMinyeongRes: '',
    });
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const history = useHistory();
    // 일반 민영 순위 patch
    const [supportYn, setSupportYn, handleChangeSupportYn] =
        useInputState(null);
    const [generalMinyeongRank, setGeneralMinyeongRank] = useState('');

    // info_tooltip animation 추가
    const [mount, setMount] = useState(false);
    const [effect, setEffect] = useState('mount2');

    // 로딩 상태 적용
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, []);

    useEffect(() => {
        if (generalMinyeongStore.postGeneralMinyeongAptNum.data) {
            const data = generalMinyeongStore.postGeneralMinyeongAptNum?.data;
            console.log(JSON.stringify(data));
        }
    }, [generalMinyeongStore.postGeneralMinyeongAptNum]);

    const data = generalMinyeongStore?.postGeneralMinyeongAptNum?.data; // 일반 민영 로직 접근 변수

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
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    // 결과가 1, 2순위일 경우 순위확인 페이지로 연결
    const rankSuccess = async () => {
        if (
            form?.generalMinyeongRes === '일순위' ||
            form?.generalMinyeongRes === '이순위'
        ) {
            dispatch(
                patchGeneralMinyeongRank({
                    verificationRecordGeneralMinyeongId: data.id,
                    generalMinyeongRank: form.generalMinyeongRes,
                    supportYn,
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
        if (form?.generalMinyeongRes === '탈락') {
            alert('자격 조건을 만족하지 못하는 항목이 있습니다.');
            dispatch(
                patchGeneralMinyeongRank({
                    verificationRecordGeneralMinyeongId: data.id,
                    generalMinyeongRank: form.generalMinyeongRes,
                    supportYn,
                })
            );
        }
    };

    // 일반 민영 순위 로직
    if (
        data?.accountTf === true &&
        data?.meetLivingInSurroundAreaTf === true &&
        ((data?.americanAge < 20 &&
            supportYn === 'y' &&
            data?.householderTf === true) ||
            data?.americanAge >= 20) &&
        data?.priorityApt === true &&
        ((data?.restrictedAreaTf === true &&
            data?.meetAllHouseMemberRewinningRestrictionTf === true &&
            data?.meetHouseHavingLessThan2AptTf === true &&
            data?.householderTf === true &&
            data?.meetAllHouseMemberNotWinningIn5yearsTf === true) ||
            data?.restrictedAreaTf === false) &&
        data?.meetBankbookJoinPeriodTf === true &&
        data?.meetDepositTf === true
    ) {
        form.generalMinyeongRes = '일순위';
    } else if (
        data?.accountTf === true &&
        data?.meetLivingInSurroundAreaTf === true &&
        ((data?.americanAge < 20 &&
            supportYn === 'y' &&
            data?.householderTf === true) ||
            data?.americanAge >= 20) &&
        ((data?.restrictedAreaTf === true && // 규제지역
            data?.meetAllHouseMemberRewinningRestrictionTf === true &&
            ((data?.americanAge >= 20 && data?.householderTf === false) ||
                data?.priorityApt === false ||
                data?.meetAllHouseMemberNotWinningIn5yearsTf === false ||
                data?.meetBankbookJoinPeriodTf === false ||
                data?.meetDepositTf === false)) ||
            // 비규제지역
            (data?.restrictedAreaTf === false &&
                (data?.meetBankbookJoinPeriodTf === false ||
                    data?.meetDepositTf === false ||
                    data?.priorityApt === false)))
    ) {
        form.generalMinyeongRes = '이순위';
    } else if (
        data?.accountTf === false ||
        data?.meetLivingInSurroundAreaTf === false ||
        (data?.americanAge < 20 &&
            (supportYn !== 'y' || data?.householderTf === false)) ||
        (data?.restrictedAreaTf === true &&
            data?.meetAllHouseMemberRewinningRestrictionTf === false)
    ) {
        form.generalMinyeongRes = '탈락';
    } else {
        form.generalMinyeongRes = '';
    }

    const handleSubmit = (e) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        e.preventDefault();
        onSaveData(form);
        setForm({
            generalMinyeongRes: '',
        });

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            patchGeneralMinyeongRank({
                verificationRecordGeneralMinyeongId: data?.id,
                generalMinyeongRank: form.generalMinyeongRes,
                supportYn,
            })
        );
    };

    console.log(form.generalMinyeongRes);
    console.log(supportYn);
    console.log(data?.ranking);

    return (
        <>
            {loading ? ( // 로딩 상태 2s
                <>
                    <Loading />
                    <p className="loading_msg1">Please wait ...</p>
                    <p className="loading_msg2">
                        회원님의{' '}
                        <strong className="text_highlight">
                            일반공급 민영주택 유형
                        </strong>{' '}
                        자격 확인 중입니다. <br />
                        잠시만 기다려주세요.
                    </p>
                </>
            ) : (
                <>
                    {/* 공통 정보 입력 오류 값에 의한 error 발생 시(data.error 값이 null이 아닌 경우) alert 창으로 접근 막음.
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
                                  ) + history.push('generalMinyeongAptNum')
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
                                    | 민영주택
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
                                                                ※ 민영주택의
                                                                경우
                                                            </p>
                                                            주택청약종합저축
                                                            혹은 청약예금,
                                                            청약부금(85제곱미터이하)인
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
                                                            일순위 조건 충족자는
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

                                            {/* 만 나이 로직 결과 출력*/}
                                            {data?.meetLivingInSurroundAreaTf ===
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
                                                                readOnly={true}
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
                                                    {data?.americanAge < 20 ? (
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
                                                                                    value={
                                                                                        supportYn
                                                                                    }
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
                                                                                    value={
                                                                                        supportYn
                                                                                    }
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

                                                    {/* 이후 조건 충족 시 다음 인풋 보이도록. */}
                                                    {(data?.americanAge < 20 &&
                                                        data?.householderTf ===
                                                            true &&
                                                        supportYn === 'y') ||
                                                    data?.americanAge >= 20 ? (
                                                        <>
                                                            {/* 순위 판별 시작 */}
                                                            {/* 주거전용 85㎡ 기준 충족*/}
                                                            <tr className="general_phase">
                                                                <td className="qualification">
                                                                    <span className="qualificationBox">
                                                                        <span className="qualificationIcon">
                                                                            <CaretRightOutlined />
                                                                        </span>
                                                                        주거전용
                                                                        85㎡
                                                                        초과공공건설임대주택,{' '}
                                                                        <br />
                                                                        수도권에
                                                                        지정된
                                                                        공공주택지구에서
                                                                        공급하는
                                                                        민영주택에
                                                                        청약하는가?
                                                                    </span>
                                                                </td>
                                                                <td className="general_result">
                                                                    <input
                                                                        className="generalAptInfoSelect"
                                                                        value={
                                                                            data?.priorityApt
                                                                                ? '예'
                                                                                : '아니오'
                                                                        }
                                                                        readOnly={
                                                                            true
                                                                        }
                                                                    />
                                                                    <span>
                                                                        {data?.priorityApt ===
                                                                        true ? (
                                                                            <span
                                                                                className="progress"
                                                                                readOnly={
                                                                                    true
                                                                                }
                                                                            >
                                                                                <CheckCircleOutlined />
                                                                            </span>
                                                                        ) : null}
                                                                        {data?.priorityApt ===
                                                                        false ? (
                                                                            <span className="secondRankTootip">
                                                                                <PauseCircleOutlined />
                                                                            </span>
                                                                        ) : null}
                                                                    </span>
                                                                </td>
                                                            </tr>

                                                            {/* 전세대원 재당첨 제한 여부 */}
                                                            {data?.priorityApt ===
                                                            true ? (
                                                                <>
                                                                    {data?.restrictedAreaTf ===
                                                                    true ? (
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
                                                                                    </span>{' '}
                                                                                    <span className="info_tooltip">
                                                                                        <InfoCircleOutlined />
                                                                                        <span className="tooltip-text">
                                                                                            <p>
                                                                                                민영주택의
                                                                                                경우
                                                                                            </p>
                                                                                            <strong>
                                                                                                규제지역
                                                                                            </strong>

                                                                                            인
                                                                                            경우에만,
                                                                                            재당첨
                                                                                            제한이
                                                                                            적용됨.{' '}
                                                                                            <br />
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
                                                                                    {/* 위 조건이 만족하면서 2주택 미만 여부를 만족해야함. */}
                                                                                    {/* 2주택 미만 소유 여부*/}
                                                                                    <tr className="general_phase">
                                                                                        <td className="qualification">
                                                                                            <span className="qualificationBox">
                                                                                                <span className="qualificationIcon">
                                                                                                    <CaretRightOutlined />
                                                                                                </span>
                                                                                                2주택
                                                                                                미만
                                                                                                소유
                                                                                                여부
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className="general_result">
                                                                                            <input
                                                                                                className="generalAptInfoSelect"
                                                                                                value={
                                                                                                    data?.meetHouseHavingLessThan2AptTf
                                                                                                        ? '충족'
                                                                                                        : '미충족'
                                                                                                }
                                                                                                readOnly={
                                                                                                    true
                                                                                                }
                                                                                            />
                                                                                            <span>
                                                                                                {data?.meetHouseHavingLessThan2AptTf ===
                                                                                                true ? (
                                                                                                    <span
                                                                                                        className="progress"
                                                                                                        readOnly={
                                                                                                            true
                                                                                                        }
                                                                                                    >
                                                                                                        <CheckCircleOutlined />
                                                                                                    </span>
                                                                                                ) : null}
                                                                                                {data?.meetHouseHavingLessThan2AptTf ===
                                                                                                false ? (
                                                                                                    <span className="secondRankTootip">
                                                                                                        <PauseCircleOutlined />
                                                                                                    </span>
                                                                                                ) : null}
                                                                                            </span>
                                                                                        </td>
                                                                                    </tr>

                                                                                    {/* 규제 지역인 경우에만 보이도록 */}
                                                                                    {/* 세대주 여부 (미성년자 제외) */}
                                                                                    {data?.meetHouseHavingLessThan2AptTf ===
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
                                                                                                                    규제지역
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
                                                                                                                    규제지역
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
                                                                                true &&
                                                                            data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                                                true &&
                                                                            data?.meetHouseHavingLessThan2Apt ===
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
                                                                                                            12개월{' '}
                                                                                                            <br />
                                                                                                            (필요한
                                                                                                            경우,{' '}
                                                                                                            <br />
                                                                                                            24개월까지
                                                                                                            연장)
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            6개월{' '}
                                                                                                            <br />
                                                                                                            (필요한
                                                                                                            경우,{' '}
                                                                                                            <br />
                                                                                                            12개월까지
                                                                                                            연장)
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
                                                                                {data?.meetBankbookJoinPeriodTf ===
                                                                                true ? (
                                                                                    <>
                                                                                        <tr className="general_phase">
                                                                                            <td className="qualification">
                                                                                                <span className="qualificationBox">
                                                                                                    <span className="qualificationIcon">
                                                                                                        <CaretRightOutlined />
                                                                                                    </span>
                                                                                                    예치금액
                                                                                                    충족여부
                                                                                                </span>
                                                                                                <span className="info_tooltip">
                                                                                                    <InfoCircleOutlined />
                                                                                                    <span className="tooltip-text">
                                                                                                        <div color="red">
                                                                                                            청약부금
                                                                                                            가입자는
                                                                                                            85㎡
                                                                                                            이하
                                                                                                            민영주택에만
                                                                                                            청약
                                                                                                            신청
                                                                                                            가능합니다.
                                                                                                        </div>
                                                                                                        <p>
                                                                                                            지역/전용
                                                                                                            면적별
                                                                                                            예치금액
                                                                                                        </p>
                                                                                                        <table
                                                                                                            border="1"
                                                                                                            className="tootipeTable"
                                                                                                        >
                                                                                                            <tr>
                                                                                                                <td>
                                                                                                                    구분
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    서울/부산
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    기타
                                                                                                                    광역시
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    기타
                                                                                                                    시/군
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td>
                                                                                                                    85㎡
                                                                                                                    이하
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    300만원
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    250만원
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    200만원
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td>
                                                                                                                    102㎡
                                                                                                                    이하
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    600만원
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    400만원
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    300만원
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td>
                                                                                                                    135㎡
                                                                                                                    이하
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    1000만원
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    700만원
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    400만원
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td>
                                                                                                                    모든면적
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    1500만원
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    1000만원
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    500만원
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
                                                                                                        data?.meetDepositTf
                                                                                                            ? '충족'
                                                                                                            : '미충족'
                                                                                                    }
                                                                                                    readOnly={
                                                                                                        true
                                                                                                    }
                                                                                                />
                                                                                                <span>
                                                                                                    {data?.meetDepositTf ===
                                                                                                    true ? (
                                                                                                        <span className="progress">
                                                                                                            <CheckCircleOutlined />
                                                                                                        </span>
                                                                                                    ) : null}
                                                                                                    {data?.meetDepositTf ===
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
                                </table>

                                {/* 순위에 따른 페이지 이동 */}
                                {/* 1, 2순위 */}
                                {form.generalMinyeongRes === '일순위' ||
                                form.generalMinyeongRes === '이순위' ? (
                                    <div className="generalRankButton">
                                        <MainButton
                                            onClick={rankSuccess}
                                            type="submit"
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
                                {form.generalMinyeongRes === '탈락' ? (
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

export default GeneralMinyeongApi;
