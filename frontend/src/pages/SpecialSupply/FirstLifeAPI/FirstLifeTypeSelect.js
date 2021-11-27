import React from 'react';
import { useHistory } from 'react-router';
import {
    CheckOutlined,
    SwapRightOutlined,
    NotificationOutlined,
} from '@ant-design/icons';
import MainButton from '../../../components/Button/MainButton';

const FirstLifeTypeSelect = () => {
    const history = useHistory();

    return (
        <div className="specialTypeSelect">
            <div className="specialType_title">
                <span className="specialType_mainTitle">특별공급</span>
                <div className="specialType_subTitle">
                    <span className="checkRedIcon">
                        <CheckOutlined />
                    </span>{' '}
                    생애최초 유형 선택
                </div>
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
                    <li className="typeInfo_li">국민주택 : 건설량의 25% 내</li>
                    <li className="typeInfo_li">
                        민영주택 : 건설량의 7% (공공택지 : 15%) 내
                    </li>
                </div>
                <div className="typeInfos">
                    <span className="typeInfoIcon">
                        <SwapRightOutlined />
                    </span>{' '}
                    대상: 무주택 세대의 일반공급 1순위 당첨자
                </div>
            </div>

            <div className="typeContainer">
                <MainButton
                    type="button"
                    width="80"
                    height="40"
                    fontSize="15"
                    onClick={() => {
                        history.push('/specialFirstLifeKookminAptNum');
                    }}
                >
                    국민주택
                </MainButton>

                <MainButton
                    type="button"
                    width="80"
                    height="40"
                    fontSize="15"
                    onClick={() => {
                        history.push('/specialFirstLifeMinyeongAptNum');
                    }}
                >
                    민영주택
                </MainButton>
            </div>
        </div>
    );
};

export default FirstLifeTypeSelect;
