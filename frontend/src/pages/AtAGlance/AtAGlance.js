import React, { useEffect } from 'react';
import './AtAGlance.css';
import { useDispatch, useSelector } from 'react-redux';
import storage from '../../services/store';
import { getRank } from '../../store/actions/rankAction';

const AtAGlance = () => {
    const token = storage.get('user-token');
    const dispatch = useDispatch();
    const rankStore = useSelector((state) => state.rank);
    let data = {};

    useEffect(() => {
        dispatch(getRank(token));
    }, []);

    useEffect(() => {
        if (rankStore.getRank.data) {
            data = data;
        }
    }, [rankStore.getRank.data]);

    return (
        <div className="atAGlanceContainer">
            <div className="atAGlanceNormalTitleContainer">
                <span className="atAGlanceNormalTitle">한눈에 보기</span>
            </div>
            <div className="atAGlanceTableContainer">
                <table className="atAGlanceTable">
                    <thead className="atAGlanceTableThead">
                        <tr className="atAGlanceTableTheadTr">
                            <th className="atAGlanceTableTheadTrTh">유형</th>
                            <th className="atAGlanceTableTheadTrTh">결과</th>
                        </tr>
                    </thead>
                    <tbody className="atAGlanceTableTbody">
                        <tr className="atAGlanceTableTbodyTr">
                            <td className="atAGlanceTableTbodyTrTdSubTitle">
                                일반공급 국민주택
                            </td>
                            <td className="atAGlanceTableTbodyTrTdResult">
                                {data[0] ? data[0] : '이력없음'}
                            </td>
                        </tr>
                        <tr className="atAGlanceTableTbodyTr">
                            <td className="atAGlanceTableTbodyTrTdSubTitle">
                                일반공급 민영주택
                            </td>
                            <td className="atAGlanceTableTbodyTrTdResult">
                                {data[1] ? data[1] : '이력없음'}
                            </td>
                        </tr>
                        <tr className="atAGlanceTableTbodyTr">
                            <td className="atAGlanceTableTbodyTrTdSubTitle">
                                특별공급 신혼부부
                            </td>
                            <td className="atAGlanceTableTbodyTrTdResult">
                                {data[2] ? data[2] : '이력없음'}
                            </td>
                        </tr>
                        <tr className="atAGlanceTableTbodyTr">
                            <td className="atAGlanceTableTbodyTrTdSubTitle">
                                특별공급 다자녀
                            </td>
                            <td className="atAGlanceTableTbodyTrTdResult">
                                {data[3] ? data[3] : '이력없음'}
                            </td>
                        </tr>
                        <tr className="atAGlanceTableTbodyTr">
                            <td className="atAGlanceTableTbodyTrTdSubTitle">
                                특별공급 생애최초
                            </td>
                            <td className="atAGlanceTableTbodyTrTdResult">
                                {data[4] ? data[4] : '이력없음'}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AtAGlance;
