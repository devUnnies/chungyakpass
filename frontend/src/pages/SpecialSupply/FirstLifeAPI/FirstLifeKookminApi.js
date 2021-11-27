import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
    postFirstInLifeKookminAptNum,
    patchFirstLifeKookminRank,
    getFirstLifeKookminRank,
} from '../../../store/actions/firstInLifeKookminAction';
import {
    CheckOutlined,
    CaretRightOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';
import MainButton from '../../../components/Button/MainButton';
import '../SpecialSupply.css';
import useInputState from '../../../components/Input/useInputState';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/loading';

const FirstLifeKookminApi = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const firstLifeKookminStore = useSelector(
        (state) => state.firstInLifeKookmin
    );
    const [form, setForm] = useState({
        name: '',
        firstLifeKookminRes: '',
    });
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();
    // 생애최초 국민 순위 patch
    const [firstLifeKookminType, setFirstLifeKookminType] = useState(
        location?.state?.firstLifeKookminType
    );
    const [firstRankHistoryYn, setFirstRankHistoryYn] = useState(
        location?.state?.firstRankHistoryYn
    );
    const [supportYn, setSupportYn, handleChangeSupportYn] =
        useInputState(null);
    const [firstLifeKookminRank, setFirstLifeKookminRank] = useState('');
    const [taxOver5yearsYn, setTaxOver5yearsYn, handleChangeTaxOver5yearsYn] =
        useInputState(null);

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
        if (firstLifeKookminStore?.postFirstInLifeKookminAptNum?.data) {
            const data =
                firstLifeKookminStore.postFirstInLifeKookminAptNum.data;
            console.log(JSON.stringify(data));
        }
    }, [firstLifeKookminStore?.postFirstInLifeKookminAptNum]);

    const data = firstLifeKookminStore?.postFirstInLifeKookminAptNum?.data; // 생애최초 국민 로직 접근 변수

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
        if (form?.firstLifeKookminRes === '일순위') {
            dispatch(
                patchFirstLifeKookminRank({
                    verificationRecordSpecialKookminFirstLifeId: data.id,
                    firstLifeKookminRank: form.firstLifeKookminRes,
                    firstRankHistoryYn,
                    firstLifeKookminType,
                    supportYn,
                    taxOver5yearsYn,
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

    const fail = async () => {
        if (form?.firstLifeKookminRes === '탈락') {
            alert('자격 조건을 만족하지 못하는 항목이 있습니다.');

            dispatch(
                patchFirstLifeKookminRank({
                    verificationRecordSpecialKookminFirstLifeId: data.id,
                    firstLifeKookminRank: form.firstLifeKookminRes,
                    firstRankHistoryYn,
                    firstLifeKookminType,
                    supportYn,
                    taxOver5yearsYn,
                })
            );
        }
    };

    // 순위 로직
    if (
        data?.accountTf === true &&
        data?.meetLivingInSurroundAreaTf === true &&
        ((data?.americanAge < 20 &&
            supportYn === 'y' &&
            data?.householderTf === true) ||
            data?.americanAge >= 20) &&
        data?.meetRecipientTf === true &&
        data?.meetHomelessHouseholdMembersTf === true &&
        (data?.meetMonthlyAverageIncomePriorityTf === true ||
            data?.meetMonthlyAverageIncomeGeneralTf === true) &&
        ((firstLifeKookminType === '공공주택특별법적용' &&
            data?.meetPropertyTf === true) ||
            firstLifeKookminType !== '공공주택특별법적용') &&
        ((data?.restrictedAreaTf === true &&
            data?.householderTf === true &&
            data?.meetAllHouseMemberNotWinningIn5yearsTf === true) ||
            data?.restrictedAreaTf === false) &&
        data?.meetAllHouseMemberRewinningRestrictionTf === true &&
        data?.meetBankbookJoinPeriodTf === true &&
        taxOver5yearsYn === true &&
        data?.meetNumberOfPaymentsTf === true
    ) {
        form.firstLifeKookminRes = '1순위';
    } else {
        form.firstLifeKookminRes = '탈락';
    }

    const handleSubmit = (e) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        e.preventDefault();
        onSaveData(form);
        setForm({
            firstLifeKookminRes: '',
        });

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(
            patchFirstLifeKookminRank({
                verificationRecordSpecialKookminFirstLifeId: data.id,
                firstLifeKookminRank: form.firstLifeKookminRes,
                firstRankHistoryYn,
                firstLifeKookminType,
                supportYn,
                taxOver5yearsYn,
            })
        );
    };

    console.log(firstRankHistoryYn);
    console.log(firstLifeKookminType);
    console.log(supportYn);
    console.log(taxOver5yearsYn);

    return (
        <>
            {loading ? ( // 로딩 상태 2s
                <>
                    <Loading />
                    <p className="loading_msg1">Please wait ...</p>
                    <p className="loading_msg2">
                        회원님의{' '}
                        <strong className="text_highlight">
                            특별공급 생애최초 국민주택 유형
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
                                  ) +
                                  history.push('specialFirstLifeKookminAptNum')
                                : alert(
                                      '자격 확인을 진행할 수 없습니다' +
                                          '\n' +
                                          '사유: ' +
                                          data?.message
                                  ) + history.goBack(-1)}
                        </>
                    ) : (
                        <>
                            <div className="special_title">
                                <strong className="special_mainTitle">
                                    특별공급{' '}
                                </strong>
                                <span className="special_subTitle">
                                    | 생애최초 국민주택
                                </span>
                                <div className="special_subPlusTitle">
                                    <span className="checkRedIcon">
                                        <CheckOutlined />
                                    </span>
                                    청약 자격 확인
                                </div>
                            </div>

                            <form
                                className="specialSupply_form"
                                onSubmit={handleSubmit}
                            >
                                <table className="special_table">
                                    <p
                                        className="foreignWarning"
                                        style={{ color: 'red' }}
                                    >
                                        * 외국인을 세대주 혹은 세대원으로
                                        포함시킬 경우 부적격 판정이 날 수 있음을
                                        알려드립니다.
                                    </p>

                                    {data !== null ? (
                                        <>
                                            {/* 국민주택 유형 */}
                                            <tr className="special_phase">
                                                <td className="qualification">
                                                    <span className="qualificationBox">
                                                        <span className="qualificationIcon">
                                                            <CaretRightOutlined />
                                                        </span>
                                                        선택한 국민 주택 유형
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span className="tooltip-text">
                                                            선택한 국민 주택
                                                            유형에 따라 자격
                                                            조건이 다릅니다.
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="special_result">
                                                    <input
                                                        className="typeInfoSelect"
                                                        value={
                                                            firstLifeKookminType
                                                        }
                                                        readOnly={true}
                                                    />
                                                    <span>
                                                        {firstLifeKookminType !==
                                                        '' ? (
                                                            <span className="progress">
                                                                <CheckCircleOutlined />
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {firstLifeKookminType ===
                                                        '' ? (
                                                            <span className="pause_tooltip">
                                                                <CloseCircleOutlined />
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>

                                            {/* 규제지역 판단. (규제지역 로직 결과값 넣기.)*/}
                                            <tr className="special_phase">
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
                                                <td className="special_result">
                                                    <input
                                                        className="aptInfoSelect"
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
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.restrictedAreaTf ===
                                                        '' ? (
                                                            <span className="pause_tooltip">
                                                                <CloseCircleOutlined />
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>

                                            {/* 청약통장 조건 충족 여부 */}
                                            <tr className="special_phase">
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
                                                                ※ 국민주택의
                                                                경우
                                                            </p>
                                                            주택청약종합저축
                                                            혹은 청약저축인
                                                            경우에만 청약통장
                                                            조건 만족.
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="special_result">
                                                    <input
                                                        className="aptInfoSelect"
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
                                            <tr className="special_phase">
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
                                                <td className="special_result">
                                                    <input
                                                        className="aptInfoSelect"
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

                                            {data?.meetLivingInSurroundAreaTf ===
                                            true ? (
                                                <>
                                                    {/* 만 나이 로직 결과 출력*/}
                                                    <tr className="special_phase">
                                                        <td className="qualification">
                                                            <span className="qualificationBox">
                                                                <span className="qualificationIcon">
                                                                    <CaretRightOutlined />
                                                                </span>
                                                                나이
                                                            </span>
                                                        </td>
                                                        <td className="special_result">
                                                            <input
                                                                className="aptInfoSelect"
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
                                                                '' ? (
                                                                    <span className="pause_tooltip">
                                                                        <CloseCircleOutlined />
                                                                    </span>
                                                                ) : null}
                                                            </span>
                                                        </td>
                                                    </tr>

                                                    {/* 미성년자인 경우 형제, 자매 부양 조건 충족 */}
                                                    {data?.americanAge < 20 ? (
                                                        <>
                                                            {/* 세대주 여부 판단 */}
                                                            <tr className="special_phase">
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
                                                                <td className="special_result">
                                                                    <input
                                                                        className="aptInfoSelect"
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

                                                            {data?.householderTf ===
                                                            true ? (
                                                                <>
                                                                    <tr className="special_phase">
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
                                                                        <td className="special_result">
                                                                            <span className="special_result_input">
                                                                                <input
                                                                                    className="isSupportInput"
                                                                                    type="radio"
                                                                                    name="supportYn"
                                                                                    onChange={
                                                                                        onChange
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
                                                                                    className="isSupportInput"
                                                                                    type="radio"
                                                                                    name="supportYn"
                                                                                    onChange={
                                                                                        onChange
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

                                                    {data?.americanAge >= 20 ||
                                                    (data?.americanAge < 20 &&
                                                        data?.householderTf ===
                                                            true &&
                                                        supportYn === 'y') ? (
                                                        <>
                                                            {/* 생애최초 대상자 여부 판단 */}
                                                            <tr className="special_phase">
                                                                <td className="qualification">
                                                                    <span className="qualificationBox">
                                                                        <span className="qualificationIcon">
                                                                            <CaretRightOutlined />
                                                                        </span>
                                                                        생애최초
                                                                        대상자
                                                                        여부
                                                                    </span>
                                                                    <span className="info_tooltip">
                                                                        <InfoCircleOutlined />
                                                                        <span className="tooltip-text">
                                                                            <p>
                                                                                *
                                                                                생애최초
                                                                                대상자
                                                                            </p>
                                                                            입주자모집공고일
                                                                            현재
                                                                            혼인
                                                                            중이거나
                                                                            미혼인
                                                                            자녀{' '}
                                                                            <br />
                                                                            (입양을
                                                                            포함,
                                                                            혼인
                                                                            중이
                                                                            아닌
                                                                            경우에는
                                                                            동일한
                                                                            주민등록표
                                                                            등본에
                                                                            올라
                                                                            있는
                                                                            자녀를
                                                                            말함)가
                                                                            있는
                                                                            분
                                                                        </span>
                                                                    </span>
                                                                </td>
                                                                <td className="special_result">
                                                                    <input
                                                                        className="aptInfoSelect"
                                                                        value={
                                                                            data?.meetRecipientTf
                                                                                ? '충족'
                                                                                : '미충족'
                                                                        }
                                                                        readOnly={
                                                                            true
                                                                        }
                                                                    />
                                                                    <span>
                                                                        {data?.meetRecipientTf ===
                                                                        true ? (
                                                                            <span className="progress">
                                                                                <CheckCircleOutlined />
                                                                            </span>
                                                                        ) : null}

                                                                        {data?.meetRecipientTf ===
                                                                        false ? (
                                                                            <span className="pause_tooltip">
                                                                                <CloseCircleOutlined />
                                                                            </span>
                                                                        ) : null}
                                                                    </span>
                                                                </td>
                                                            </tr>

                                                            {data?.meetRecipientTf ===
                                                            true ? (
                                                                <>
                                                                    {/* 세대구성원 무주택 판별 */}
                                                                    <tr className="special_phase">
                                                                        <td className="qualification">
                                                                            <span className="qualificationBox">
                                                                                <span className="qualificationIcon">
                                                                                    <CaretRightOutlined />
                                                                                </span>
                                                                                전세대구성원의
                                                                                무주택
                                                                                여부
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
                                                                        <td className="special_result">
                                                                            <input
                                                                                className="aptInfoSelect"
                                                                                value={
                                                                                    data?.meetHomelessHouseholdMembersTf
                                                                                        ? '충족'
                                                                                        : '미충족'
                                                                                }
                                                                                readOnly={
                                                                                    true
                                                                                }
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

                                                                    {data?.meetHomelessHouseholdMembersTf ===
                                                                    true ? (
                                                                        <>
                                                                            {/* 월평균 소득 기준 충족 여부 */}
                                                                            <tr className="special_phase">
                                                                                <td className="qualification">
                                                                                    <span className="qualificationBox">
                                                                                        <span className="qualificationIcon">
                                                                                            <CaretRightOutlined />
                                                                                        </span>
                                                                                        월평균
                                                                                        소득
                                                                                        기준
                                                                                        충족
                                                                                        여부
                                                                                    </span>
                                                                                    <span className="info_tooltip">
                                                                                        <InfoCircleOutlined />
                                                                                        <span className="tooltip-text">
                                                                                            <p>
                                                                                                *
                                                                                                생애최초
                                                                                                월평균
                                                                                                기준
                                                                                                소득
                                                                                            </p>
                                                                                            해당
                                                                                            세대의
                                                                                            월평균
                                                                                            소득이
                                                                                            전년도
                                                                                            도시근로자
                                                                                            가구당
                                                                                            월평균
                                                                                            소득의
                                                                                            100%이하인
                                                                                            분
                                                                                            <br />
                                                                                            (21.2.2.
                                                                                            공급승인신청분부터
                                                                                            ‘130%
                                                                                            이하인
                                                                                            분’)
                                                                                        </span>
                                                                                    </span>
                                                                                </td>
                                                                                <td className="special_result">
                                                                                    <input
                                                                                        className="aptInfoSelect"
                                                                                        value={
                                                                                            data?.meetMonthlyAverageIncomePriorityTf ||
                                                                                            data?.meetMonthlyAverageIncomeGeneralTf
                                                                                                ? '충족'
                                                                                                : '미충족'
                                                                                        }
                                                                                        readOnly={
                                                                                            true
                                                                                        }
                                                                                    />
                                                                                    <span>
                                                                                        {data?.meetMonthlyAverageIncomePriorityTf ===
                                                                                            true ||
                                                                                        data?.meetMonthlyAverageIncomeGeneralTf ===
                                                                                            true ? (
                                                                                            <span className="progress">
                                                                                                <CheckCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}
                                                                                        {data?.meetMonthlyAverageIncomePriorityTf ===
                                                                                            false &&
                                                                                        data?.meetMonthlyAverageIncomeGeneralTf ===
                                                                                            false ? (
                                                                                            <span className="pause_tooltip">
                                                                                                <CloseCircleOutlined />
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>

                                                                            {/* 자산 기준 충족 여부*/}
                                                                            {/* 공공주택특별법 적용인 경우에만 적용 */}
                                                                            {firstLifeKookminType ===
                                                                            '공공주택특별법적용' ? (
                                                                                <>
                                                                                    <tr className="special_phase">
                                                                                        <td className="qualification">
                                                                                            <span className="qualificationBox">
                                                                                                <span className="qualificationIcon">
                                                                                                    <CaretRightOutlined />
                                                                                                </span>
                                                                                                자산
                                                                                                기준
                                                                                                충족
                                                                                                여부
                                                                                            </span>
                                                                                            <span className="info_tooltip">
                                                                                                <InfoCircleOutlined />
                                                                                                <span className="tooltip-text">
                                                                                                    <p>
                                                                                                        *
                                                                                                        공공주택
                                                                                                        특별법이
                                                                                                        적용되는
                                                                                                        국민주택의
                                                                                                        경우에만
                                                                                                        해당
                                                                                                    </p>
                                                                                                    세부
                                                                                                    자산
                                                                                                    보유
                                                                                                    기준에
                                                                                                    대한
                                                                                                    자격
                                                                                                    조건은
                                                                                                    회원님이
                                                                                                    입력하신
                                                                                                    기초
                                                                                                    정보에
                                                                                                    따라,{' '}
                                                                                                    <br />
                                                                                                    자산
                                                                                                    정보를
                                                                                                    계산하여
                                                                                                    충족
                                                                                                    여부를
                                                                                                    판단해드립니다.
                                                                                                </span>
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className="special_result">
                                                                                            {data && (
                                                                                                <input
                                                                                                    className="aptInfoSelect"
                                                                                                    value={
                                                                                                        data?.meetPropertyTf
                                                                                                            ? '충족'
                                                                                                            : '미충족'
                                                                                                    }
                                                                                                    readOnly={
                                                                                                        true
                                                                                                    }
                                                                                                />
                                                                                            )}
                                                                                            <span>
                                                                                                {data?.meetPropertyTf ===
                                                                                                true ? (
                                                                                                    <span className="progress">
                                                                                                        <CheckCircleOutlined />
                                                                                                    </span>
                                                                                                ) : null}
                                                                                                {data?.meetPropertyTf ===
                                                                                                false ? (
                                                                                                    <span className="pause_tooltip">
                                                                                                        <CloseCircleOutlined />
                                                                                                    </span>
                                                                                                ) : null}
                                                                                            </span>
                                                                                        </td>
                                                                                    </tr>
                                                                                </>
                                                                            ) : null}

                                                                            {/* 규제 지역인 경우에만 보이도록 */}
                                                                            {(data?.meetMonthlyAverageIncomePriorityTf ===
                                                                                true ||
                                                                                data?.meetMonthlyAverageIncomeGeneralTf ===
                                                                                    true) &&
                                                                            (firstLifeKookminType !==
                                                                                '공공주택특별법적용' ||
                                                                                (firstLifeKookminType ===
                                                                                    '공공주택특별법적용' &&
                                                                                    data?.meetPropertyTf ===
                                                                                        true)) ? (
                                                                                <>
                                                                                    {data?.restrictedAreaTf ===
                                                                                    true ? (
                                                                                        <>
                                                                                            {/* 세대주 여부 판단 */}
                                                                                            {data?.americanAge >=
                                                                                            20 ? (
                                                                                                <>
                                                                                                    <tr className="special_phase">
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
                                                                                                                    국민
                                                                                                                    주택에
                                                                                                                    청약하는
                                                                                                                    경우,{' '}
                                                                                                                    <br />
                                                                                                                    세대주가
                                                                                                                    아닌자는
                                                                                                                    청약
                                                                                                                    진행할
                                                                                                                    수
                                                                                                                    없음.
                                                                                                                </span>
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td className="special_result">
                                                                                                            <input
                                                                                                                className="aptInfoSelect"
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
                                                                                                </>
                                                                                            ) : null}

                                                                                            {data?.householderTf ===
                                                                                            true ? (
                                                                                                <>
                                                                                                    {/* 세대원 청약 당첨 이력 */}
                                                                                                    <tr className="special_phase">
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
                                                                                                                    세대구성원의
                                                                                                                    경우
                                                                                                                    청약
                                                                                                                    진행할
                                                                                                                    수
                                                                                                                    없음.
                                                                                                                </span>
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td className="special_result">
                                                                                                            <input
                                                                                                                className="aptInfoSelect"
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

                                                                                    {(data?.restrictedAreaTf ===
                                                                                        true &&
                                                                                        data?.householderTf ===
                                                                                            true &&
                                                                                        data?.meetAllHouseMemberNotWinningIn5yearsTf ===
                                                                                            true) ||
                                                                                    data?.restrictedAreaTf ===
                                                                                        false ? (
                                                                                        <>
                                                                                            {/* 전세대원 재당첨 제한 여부 */}
                                                                                            <tr className="special_phase">
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
                                                                                                            </span>
                                                                                                        ) : null}
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>

                                                                                            {data?.meetAllHouseMemberRewinningRestrictionTf ===
                                                                                            true ? (
                                                                                                <>
                                                                                                    {/* 현재 근로자 또는 자영업자로서 5년 이상 소득세를 납부여부 */}
                                                                                                    <tr className="special_phase">
                                                                                                        <td className="qualification">
                                                                                                            <span className="qualificationBox">
                                                                                                                <span className="qualificationIcon">
                                                                                                                    <CaretRightOutlined />
                                                                                                                </span>
                                                                                                                근로자
                                                                                                                혹은
                                                                                                                자영업자로
                                                                                                                5년
                                                                                                                이상
                                                                                                                소득세를
                                                                                                                납부
                                                                                                                여부
                                                                                                            </span>
                                                                                                            <span className="info_tooltip">
                                                                                                                <InfoCircleOutlined />
                                                                                                                <span className="tooltip-text"></span>
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td className="special_result">
                                                                                                            <span className="special_result_input">
                                                                                                                <input
                                                                                                                    className="isSupportInput"
                                                                                                                    type="radio"
                                                                                                                    name="taxOver5yearsYn"
                                                                                                                    onChange={
                                                                                                                        onChange
                                                                                                                    }
                                                                                                                    value="y"
                                                                                                                    checked={
                                                                                                                        taxOver5yearsYn ===
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
                                                                                                                    name="taxOver5yearsYn"
                                                                                                                    onChange={
                                                                                                                        onChange
                                                                                                                    }
                                                                                                                    value="n"
                                                                                                                    checked={
                                                                                                                        taxOver5yearsYn ===
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
                                                                                                                {taxOver5yearsYn ===
                                                                                                                'y' ? (
                                                                                                                    <span className="progress">
                                                                                                                        <CheckCircleOutlined />
                                                                                                                    </span>
                                                                                                                ) : null}
                                                                                                                {taxOver5yearsYn ===
                                                                                                                'n' ? (
                                                                                                                    <span className="pause_tooltip">
                                                                                                                        <CloseCircleOutlined />
                                                                                                                    </span>
                                                                                                                ) : null}
                                                                                                            </span>
                                                                                                        </td>
                                                                                                    </tr>

                                                                                                    {taxOver5yearsYn ===
                                                                                                    true ? (
                                                                                                        <>
                                                                                                            {/* 청약통장 가입기간 충족 여부 */}
                                                                                                            <tr className="special_phase">
                                                                                                                <td className="qualification">
                                                                                                                    <span className="qualificationBox">
                                                                                                                        <span className="qualificationIcon">
                                                                                                                            <CaretRightOutlined />
                                                                                                                        </span>
                                                                                                                        청약통장
                                                                                                                        가입기간
                                                                                                                        충족
                                                                                                                        여부
                                                                                                                    </span>
                                                                                                                    <span className="info_tooltip">
                                                                                                                        <InfoCircleOutlined />
                                                                                                                        <span className="tooltip-text">
                                                                                                                            <p>
                                                                                                                                주택별
                                                                                                                                청약
                                                                                                                                가능한
                                                                                                                                청약통장에
                                                                                                                                가입한지
                                                                                                                                24개월(지역
                                                                                                                                및
                                                                                                                                주택에
                                                                                                                                따라
                                                                                                                                6~24개월)이
                                                                                                                                경과하여야
                                                                                                                                함.
                                                                                                                            </p>
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
                                                                                                                                        위축
                                                                                                                                        지역
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
                                                                                                                                        가입
                                                                                                                                        기간
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
                                                                                                                <td className="special_result">
                                                                                                                    <input
                                                                                                                        className="aptInfoSelect"
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
                                                                                                                            <span className="pause_tooltip">
                                                                                                                                <CloseCircleOutlined />
                                                                                                                            </span>
                                                                                                                        ) : null}
                                                                                                                    </span>
                                                                                                                </td>
                                                                                                            </tr>

                                                                                                            {/* 건설지역 별 납입횟수 충족 여부 */}
                                                                                                            {data?.meetBankbookJoinPeriodTf ===
                                                                                                            true ? (
                                                                                                                <>
                                                                                                                    <tr className="special_phase">
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
                                                                                                                        <td className="special_result">
                                                                                                                            <input
                                                                                                                                className="aptInfoSelect"
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
                                                                                                                                {data?.meetNumberOfPaymentsTf ===
                                                                                                                                true ? (
                                                                                                                                    <span className="progress">
                                                                                                                                        <CheckCircleOutlined />
                                                                                                                                        {/* 1순위 */}
                                                                                                                                    </span>
                                                                                                                                ) : null}
                                                                                                                                {data?.meetNumberOfPaymentsTf ===
                                                                                                                                false ? (
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
                                                        </>
                                                    ) : null}
                                                </>
                                            ) : null}
                                        </>
                                    ) : null}
                                </table>

                                {/* 순위에 따른 페이지 이동 */}
                                {/* 1순위 */}
                                {form.firstLifeKookminRes === '일순위' ? (
                                    <div className="specialRankButton">
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
                                {form.firstLifeKookminRes === '탈락' ? (
                                    <div className="specialRankButton">
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

export default FirstLifeKookminApi;
