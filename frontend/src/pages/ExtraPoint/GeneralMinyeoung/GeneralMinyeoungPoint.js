import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postGeneralMinyeongPoint } from '../../../store/actions/pointGeneralMinyeongAction';
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

const GeneralMinyeoungPoint = ({ onSaveData }) => {
    const [getList, setGetList] = useState();
    const dispatch = useDispatch(); // api 연결 데이터 가져오기 위함.
    const generalMinyeongPointStore = useSelector(
        (state) => state.generalMinyeongPoint
    ); // dispatch 로 가져온 값을 redux로 화면에 뿌려줌.
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // aptNum 페이지의 props 불러오기
    const history = useHistory();

    // info_tooltip animation 추가
    const [mount, setMount] = useState(false);
    const [effect, setEffect] = useState('mount2');

    const data = generalMinyeongPointStore?.postGeneralMinyeongPoint?.data; // 일반 민영 가점 로직 접근 변수
    const generalMinyeongPointSum =
        data?.periodOfHomelessness +
        data?.bankbookJoinPeriod +
        data?.numberOfDependents; // 일반 민영 가점 총점 합산.
    console.log(generalMinyeongPointSum);

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
        if (generalMinyeongPointStore?.postGeneralMinyeongPoint?.data) {
            const data =
                generalMinyeongPointStore.postGeneralMinyeongPoint.data;
            console.log(JSON.stringify(data));
        }
    }, [generalMinyeongPointStore?.postGeneralMinyeongPoint]);

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
                                  ) +
                                  history.push('/point/generalMinyeoungPost')
                                : alert(
                                      '가배점을 확인할 수 없습니다' +
                                          '\n' +
                                          '사유: ' +
                                          data?.message
                                  ) + history.push('/')}
                        </>
                    ) : (
                        <>
                            {data?.periodOfHomelessness === undefined ? (
                                alert(
                                    '가배점을 확인할 수 없습니다.' +
                                        '\n' +
                                        '사유: 가배점 항목 중 가배점을 확인할 수 있는 데이터가 존재하지 않습니다.'
                                ) + history.push('/point/generalMinyeoungPost')
                            ) : (
                                <>
                                    <div className="point_title">
                                        <strong className="point_mainTitle">
                                            일반공급{' '}
                                        </strong>
                                        <span className="point_subTitle">
                                            | 민영주택 유형
                                        </span>
                                        <div className="point_subPlusTitle">
                                            <span className="checkRedIcon">
                                                <CheckOutlined />
                                            </span>
                                            가배점 계산
                                        </div>
                                    </div>

                                    {/* 일반공급 민영 가점 테이블 */}
                                    <form
                                        className="point_form"
                                        onSubmit={handleSubmit}
                                    >
                                        <table className="point_table">
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

                                            {/* 부양 가족 */}
                                            <tr className="point_phase">
                                                <td className="point_qualification">
                                                    <span className="qualificationIcon">
                                                        <CaretRightOutlined />
                                                    </span>
                                                    <span className="qualificationBox">
                                                        부양 가족 가점 결과
                                                    </span>
                                                    <span className="info_tooltip">
                                                        <InfoCircleOutlined />
                                                        <span className="tooltip-text">
                                                            <p>
                                                                <strong>
                                                                    부양 가족
                                                                    계산
                                                                </strong>
                                                            </p>
                                                            <ul>본인 제외</ul>
                                                            <ul>배우자 포함</ul>
                                                            <ul>
                                                                본인(혹은
                                                                배우자)이(가)
                                                                세대주일 경우,
                                                                무주택 직계존속
                                                                산정.
                                                            </ul>
                                                            <ul>
                                                                무주택
                                                                직계존속(외국인x)
                                                            </ul>
                                                            <li>
                                                                입주자모집공고일
                                                                현재, 청약통장
                                                                가입자가
                                                                세대주로서 최근
                                                                3년 이상
                                                                계속하여 동일
                                                                주민등록표상에
                                                                등재되어 있는
                                                                무주택
                                                                직계존속을
                                                                부양가족으로
                                                                인정.
                                                            </li>
                                                            <li>
                                                                부모중
                                                                한사람이라도
                                                                유주택자인 경우
                                                                그 배우자또한
                                                                부양가족으로
                                                                산정하지 않음.
                                                            </li>
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="point_result">
                                                    <input
                                                        className="aptInfoSelect"
                                                        value={
                                                            JSON.stringify(
                                                                data?.numberOfDependents
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

                                        {/* 총 일반공급 민영 가점 */}
                                        <div className="pointRes">
                                            <span className="sumPlusIcon">
                                                <PlusOutlined />
                                            </span>
                                            <span className="sumRes">
                                                <span className="sum_text">
                                                    총
                                                </span>
                                                <span className="pointSum">
                                                    {generalMinyeongPointSum <
                                                    10
                                                        ? '0' +
                                                          generalMinyeongPointSum
                                                        : generalMinyeongPointSum}
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

export default GeneralMinyeoungPoint;
