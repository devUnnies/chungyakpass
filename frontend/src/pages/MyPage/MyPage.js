import React from 'react';
import { useHistory } from 'react-router';
import MainButton from '../../components/Button/MainButton';
import './MyPage.css';

const MyPage = () => {
    const history = useHistory();

    return (
        <div className="mypage">
            <div className="mypageContainer">
                <MainButton
                    width="200"
                    height="50"
                    fontSize="17"
                    type="readBankbook"
                    onClick={() => {
                        history.push('/bankbook');
                    }}
                >
                    청약통장 조회
                </MainButton>

                <MainButton
                    width="200"
                    height="50"
                    fontSize="17"
                    type="readHouse"
                    onClick={() => {
                        history.push('/house');
                    }}
                >
                    세대 조회
                </MainButton>

                <MainButton
                    width="200"
                    height="50"
                    fontSize="17"
                    type="readRecords"
                    onClick={() => {
                        history.push('/records');
                    }}
                >
                    자격판단이력 조회
                </MainButton>

                <MainButton
                    width="200"
                    height="50"
                    fontSize="17"
                    type="readPointRecords"
                    onClick={() => {
                        history.push('/pointRecords');
                    }}
                >
                    가배점계산이력 조회
                </MainButton>
            </div>
        </div>
    );
};

export default MyPage;
