import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CalculatorOutlined } from '@ant-design/icons';
import { postOldParentPoint } from '../../../store/actions/pointSpecialOldParentAction';
import { useHistory } from 'react-router-dom';
import ExtraPointTable from '../ExtraPointTable';
import '../../ExtraPoint/ExtraPoint.css';

function OldParentPointPost(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const oldParentPointStore = useSelector((state) => state.oldParentPoint);

    // enter 키 누를 경우 onClick 함수 실행.
    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            onClick();
        }
    };

    const handleSubmit = (event) => {
        // 이전의 값을 가지고 와서 기본값으로 세팅
        event.preventDefault();

        // 연결해서 전체 저장소에 제대로 들어가는지 콘솔에서 확인하기
        dispatch(postOldParentPoint({}));
    };

    const onClick = async () => {
        dispatch(postOldParentPoint({})); // api 연결 요청.

        const data = oldParentPointStore?.postOldParentPoint?.data;
        console.log(JSON.stringify(data));
        history.push({
            pathname: '/point/oldParent',
            state: {},
        });
    };

    useEffect(() => {
        // 아파트 공고번호, 주택형 post 성공시 노부모 가배점 페이지로 이동.
        if (oldParentPointStore?.postOldParentPoint) {
            const data = oldParentPointStore.postOldParentPoint.data;
        }
    }, [oldParentPointStore?.postOldParentPoint]);

    return (
        <>
            <div className="numbersInfoHeaderContainer">
                <span className="apt_title">
                    <span className="apt_titleIcon">
                        <CalculatorOutlined />
                    </span>
                    <strong className="apt_mainTitle">특별공급 </strong>
                    <span className="apt_subTitle"> | 노부모부양 </span>
                </span>
            </div>

            <ExtraPointTable />

            <div className="specialAptNumForm">
                <div className="buttonContainer">
                    <span className="buttonPosition">
                        <button
                            className="aptBackButton"
                            type="back"
                            onClick={() => {
                                history.goBack(-1);
                            }}
                        >
                            이전
                        </button>
                    </span>
                    <span className="buttonPosition">
                        <button
                            className="aptNextButton"
                            type="button"
                            onClick={onClick}
                        >
                            다음
                        </button>
                    </span>
                </div>
            </div>
        </>
    );
}

export default OldParentPointPost;
