import React from 'react';
import { useHistory } from 'react-router';
import {
    CheckOutlined,
    SwapRightOutlined,
    NotificationOutlined,
} from '@ant-design/icons';
import MainButton from '../../../components/Button/MainButton';
import '../SpecialSupply.css';

const NewlyMarriedTypeSelect = () => {
    const history = useHistory();

    return (
        <div className="specialTypeSelect">
            <div className="specialType_title">
                <span className="specialType_mainTitle">
                    특별공급
                    <div className="specialType_subTitle">
                        <span className="checkRedIcon">
                            <CheckOutlined />
                        </span>{' '}
                        신혼부부 유형 선택
                    </div>
                </span>
            </div>

            <div className="typeInfo">
                <div className="typeInfos1">
                    <span className="typeInfoIcon1">
                        <NotificationOutlined />
                    </span>{' '}
                    자격 점검 전 확인사항
                    <br />
                </div>
                <div className="typeInfos">
                    <span className="typeInfoIcon">
                        <SwapRightOutlined />
                    </span>{' '}
                    예외 대상주택: 투기과열지구 내 분양가 9억 초과 주택(모델)
                </div>
                <div className="typeInfos">
                    <span className="typeInfoIcon">
                        <SwapRightOutlined />
                    </span>{' '}
                    공급 물량
                    <li className="typeInfo_li">
                        국민주택, 민영주택 : 건설량의 20% 내
                    </li>
                    <li className="typeInfo_li">
                        공공주택 특별법 적용 국민주택 : 건설량의 30%
                    </li>
                </div>
                <div className="typeInfos">
                    <span className="typeInfoIcon">
                        <SwapRightOutlined />
                    </span>{' '}
                    대상
                    <ul>
                        {' '}
                        i) 민영주택, 국민주택, 공공주택 특별법 적용 국민주택
                        모두 해당
                    </ul>
                    <li className="typeInfo_li">
                        신혼부부: 입주자모집공고일 현재 혼인기간이 7년 이내인 분
                    </li>
                    <ul>
                        {' '}
                        ii) <strong>공공주택 특별법 적용</strong> 국민주택만
                        해당
                    </ul>
                    <li className="typeInfo_li">
                        한부모가족: 입주자모집공고일 현재 만6세 이하의 자녀(태아
                        포함)를 둔 한부모가족
                    </li>
                    <li className="typeInfo_li">
                        예비신혼부부: 혼인을 계획 중이며 입주 전까지 혼인사실을
                        증명할 수 있는 예비신혼부부
                    </li>
                </div>
            </div>

            <div className="typeContainer">
                <MainButton
                    type="button"
                    width="90"
                    height="40"
                    fontSize="13"
                    onClick={() => {
                        history.push(
                            '/specialNewlyMarriedKookminSpecialAptNum'
                        );
                    }}
                >
                    공특법 적용 <br />
                    국민주택
                </MainButton>

                <MainButton
                    type="button"
                    width="90"
                    height="40"
                    fontSize="15"
                    onClick={() => {
                        history.push('/specialNewlyMarriedKookminAptNum');
                    }}
                >
                    국민주택
                </MainButton>

                <MainButton
                    type="button"
                    width="90"
                    height="40"
                    fontSize="15"
                    onClick={() => {
                        history.push('/specialNewlyMarriedMinyeongAptNum');
                    }}
                >
                    민영주택
                </MainButton>
            </div>
        </div>
    );
};

export default NewlyMarriedTypeSelect;
