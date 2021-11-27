import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postMultiChildPointAptNum } from '../../../store/actions/pointSpecialMultiChildAction';
import { Link } from 'react-router-dom';
import {
    CheckOutlined,
    CaretRightOutlined,
    InfoCircleOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import MainButton from '../../../components/Button/MainButton';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import '../../ExtraPoint/ExtraPoint.css';
import Loading from '../../../components/Loading/loading';

const MultiChildPoint = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const multiChildPointStore = useSelector((state) => state.multiChildPoint); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(true);
    const [notificationNumber, setNotificationNumber] = useState();
    const [multiChildHouseholdType, setMultiChildHouseholdType] = useState();
    const location = useLocation(); // aptNum 페이지의 props 불러오기
    const history = useHistory();
    const getParams = location.state.multiChildHouseholdType; // notificationNumber props 가져오기
    console.log(getParams); // aptNum 페이지에서 받은 multiChildHouseholdType console로 찍기.

    // info_tooltip animation 추가
    const [mount, setMount] = useState(false);
    const [effect, setEffect] = useState('mount2');

    const data = multiChildPointStore?.postMultiChildPointAptNum?.data; // 다자녀 가점 로직 접근 변수
    const multiChildPointSum =
        data?.numberOfChild +
        data?.numberOfChildUnder6Year +
        data?.bankbookJoinPeriod +
        data?.periodOfApplicableAreaResidence +
        data?.periodOfHomelessness +
        data?.generationComposition; // 다자녀 가점 총점 합산.
    console.log(multiChildPointSum);

    // 로딩 상태 적용
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, []);

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

    const [form, setForm] = useState({
        name: '',
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
        setForm({});
    };

    useEffect(() => {
        if (multiChildPointStore?.postMultiChildPointAptNum?.data) {
            const data = multiChildPointStore.postMultiChildPointAptNum.data;
            console.log(JSON.stringify(data));
        }
    }, [multiChildPointStore?.postMultiChildPointAptNum]);

    return (
        <>
            {loading ? ( // 로딩 상태 2s
                <>
                    <Loading />
                    <p className="loading_msg1">Please wait ...</p>
                    <p className="loading_msg2">
                        회원님의{' '}
                        <strong className="text_highlight">
                            특별공급 다자녀 유형
                        </strong>{' '}
                        가배점 결과 확인 중입니다. <br />
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
                                      '가배점을 확인할 수 없습니다' +
                                          '\n' +
                                          '사유: ' +
                                          data?.message
                                  ) + history.push('/point/multiChildAptNum')
                                : alert(
                                      '가배점을 확인할 수 없습니다' +
                                          '\n' +
                                          '사유: ' +
                                          data?.message
                                  ) + history.push('/')}
                        </>
                    ) : (
                        <>
                            {data?.numberOfChild === undefined ? (
                                alert(
                                    '가배점을 확인할 수 없습니다.' +
                                        '\n' +
                                        '사유: 가배점 항목 중 가배점을 확인할 수 있는 데이터가 존재하지 않습니다.'
                                ) + history.push('/point/multiChildAptNum')
                            ) : (
                                <>
                                    <div className="point_title">
                                        <strong className="point_mainTitle">
                                            특별공급{' '}
                                        </strong>
                                        <span className="point_subTitle">
                                            | 다자녀 유형
                                        </span>
                                        <div className="point_subPlusTitle">
                                            <span className="checkRedIcon">
                                                <CheckOutlined />
                                            </span>
                                            가배점 계산
                                        </div>
                                    </div>

                                    {/* 다자녀 가점 테이블 */}
                                    <form
                                        className="point_form"
                                        onSubmit={handleSubmit}
                                    >
                                        <table className="point_table">
                                            {/* 다자녀 유형 */}
                                            <tr className="point_phase">
                                                <td className="point_qualification">
                                                    <span className="qualificationIcon">
                                                        <CaretRightOutlined />
                                                    </span>
                                                    <span className="qualificationBox">
                                                        다자녀 유형
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span className="tooltip-text"></span>
                                                    </span>
                                                </td>
                                                <td className="point_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={getParams}
                                                        readOnly={true}
                                                    />
                                                </td>
                                            </tr>

                                            {/* 만 19세 미만 자녀수 */}
                                            <tr className="point_phase">
                                                <td className="point_qualification">
                                                    <span className="qualificationIcon">
                                                        <CaretRightOutlined />
                                                    </span>
                                                    <span className="qualificationBox">
                                                        만 19세 미만 자녀수 가점
                                                        결과
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span className="tooltip-text"></span>
                                                    </span>
                                                </td>
                                                <td className="point_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            JSON.stringify(
                                                                data?.numberOfChild
                                                            ) +
                                                            ' ' +
                                                            '점'
                                                        }
                                                        readOnly={true}
                                                    />
                                                </td>
                                            </tr>

                                            {/* 만 6세 미만 자녀수 */}
                                            <tr className="point_phase">
                                                <td className="point_qualification">
                                                    <span className="qualificationIcon">
                                                        <CaretRightOutlined />
                                                    </span>
                                                    <span className="qualificationBox">
                                                        만 6세 미만 자녀 수 가점
                                                        결과
                                                    </span>
                                                </td>
                                                <td className="point_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            JSON.stringify(
                                                                data?.numberOfChildUnder6Year
                                                            ) +
                                                            ' ' +
                                                            '점'
                                                        }
                                                        readOnly={true}
                                                    />
                                                </td>
                                            </tr>

                                            {/* 청약통장 가입기간 */}
                                            <tr className="point_phase">
                                                <td className="point_qualification">
                                                    <span className="qualificationIcon">
                                                        <CaretRightOutlined />
                                                    </span>
                                                    <span className="qualificationBox">
                                                        청약통장 가입기간 가점
                                                        결과
                                                    </span>
                                                </td>
                                                <td className="point_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            JSON.stringify(
                                                                data?.bankbookJoinPeriod
                                                            ) +
                                                            ' ' +
                                                            '점'
                                                        }
                                                        readOnly={true}
                                                    />
                                                </td>
                                            </tr>

                                            {/* 해당지역 거주기간 */}
                                            <tr className="point_phase">
                                                <td className="point_qualification">
                                                    <span className="qualificationIcon">
                                                        <CaretRightOutlined />
                                                    </span>
                                                    <span className="qualificationBox">
                                                        해당지역 거주기간 가점
                                                        결과
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span className="tooltip-text">
                                                            <p>
                                                                만 19세부터
                                                                계산.
                                                            </p>
                                                            수도권은 서울 인천
                                                            경기 합산하여 계산.
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="point_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            JSON.stringify(
                                                                data?.periodOfApplicableAreaResidence
                                                            ) +
                                                            ' ' +
                                                            '점'
                                                        }
                                                        readOnly={true}
                                                    />
                                                </td>
                                            </tr>

                                            {/* 무주택 기간 */}
                                            <tr className="point_phase">
                                                <td className="point_qualification">
                                                    <span className="qualificationIcon">
                                                        <CaretRightOutlined />
                                                    </span>
                                                    <span className="qualificationBox">
                                                        무주택 기간 가점 결과
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span className="tooltip-text">
                                                            <p>
                                                                만19세부터 계산.
                                                            </p>
                                                            신청자 본인과
                                                            배우자중 짧은
                                                            기간으로 산정하여
                                                            계산.
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="point_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            JSON.stringify(
                                                                data?.periodOfHomelessness
                                                            ) +
                                                            ' ' +
                                                            '점'
                                                        }
                                                        readOnly={true}
                                                    />
                                                </td>
                                            </tr>

                                            {/* 세대 구성 */}
                                            <tr className="point_phase">
                                                <td className="point_qualification">
                                                    <span className="qualificationIcon">
                                                        <CaretRightOutlined />
                                                    </span>
                                                    <span className="qualificationBox">
                                                        세대 구성 가점 결과
                                                    </span>
                                                </td>
                                                <td className="point_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            JSON.stringify(
                                                                data?.generationComposition
                                                            ) +
                                                            ' ' +
                                                            '점'
                                                        }
                                                        readOnly={true}
                                                    />
                                                </td>
                                            </tr>
                                        </table>

                                        <hr className="sum_hr" />

                                        {/* 총 다자녀 가점 */}
                                        <div className="pointRes">
                                            <span className="sumPlusIcon">
                                                <PlusOutlined />
                                            </span>
                                            <span className="sumRes">
                                                <span className="sum_text">
                                                    총
                                                </span>
                                                <span className="pointSum">
                                                    {multiChildPointSum < 10
                                                        ? '0' +
                                                          multiChildPointSum
                                                        : multiChildPointSum}
                                                </span>
                                                <span className="sum_text">
                                                    점
                                                </span>
                                            </span>
                                        </div>
                                    </form>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default MultiChildPoint;
