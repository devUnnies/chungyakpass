import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import './ExtraPoint.css';

function ExtraPointTable() {
    return (
        <>
            <div className="pointTableContainer">
                <div className="pointCheck">
                    <span className="point-table-icon">
                        <CheckOutlined /> {''}
                    </span>
                    <span>
                        총 가점: 무주택기간(점/32점) + 부양가족수(점/35점) +
                        입주자저축 가입기간(점/17점)
                    </span>
                </div>
                <div className="pointCheck">
                    <span className="point-table-icon">
                        <CheckOutlined /> {''}
                    </span>
                    <span>
                        가점계산 결과를 확인하시기 전에 가점표를 확인해주시기
                        바랍니다.
                    </span>
                </div>

                <table border="1" className="pointTable">
                    <tr>
                        <td className="point-table-header">가점항목</td>
                        <td className="point-table-header">가점상한</td>
                        <td className="point-table-header">가점구분</td>
                        <td className="point-table-header">점수</td>
                        <td className="point-table-header">가점구분</td>
                        <td className="point-table-header">점수</td>
                    </tr>
                    <tr>
                        <td rowSpan="8" className="point-text-align">
                            무주택
                            <br />
                            기간
                        </td>
                        <td rowSpan="8" className="point-text-align">
                            32
                        </td>
                        <td className="point-text-align">1년 미만</td>
                        <td className="point-text-align">2</td>
                        <td className="point-text-align">
                            8년 이상 ~ 9년 미만
                        </td>
                        <td className="point-text-align">18</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            1년 이상 ~ 2년 미만
                        </td>
                        <td className="point-text-align">4</td>
                        <td className="point-text-align">
                            9년 이상 ~ 10년 미만
                        </td>
                        <td className="point-text-align">20</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            2년 이상 ~ 3년 미만
                        </td>
                        <td className="point-text-align">6</td>
                        <td className="point-text-align">
                            10년 이상 ~ 11년 미만
                        </td>
                        <td className="point-text-align">22</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            3년 이상 ~ 4년 미만
                        </td>
                        <td className="point-text-align">8</td>
                        <td className="point-text-align">
                            11년 이상 ~ 12년 미만
                        </td>
                        <td className="point-text-align">24</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            4년 이상 ~ 5년 미만
                        </td>
                        <td className="point-text-align">10</td>
                        <td className="point-text-align">
                            12년 이상 ~ 13년 미만
                        </td>
                        <td className="point-text-align">26</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            5년 이상 ~ 6년 미만
                        </td>
                        <td className="point-text-align">12</td>
                        <td className="point-text-align">
                            13년 이상 ~ 14년 미만
                        </td>
                        <td className="point-text-align">28</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            6년 이상 ~ 7년 미만
                        </td>
                        <td className="point-text-align">14</td>
                        <td className="point-text-align">
                            14년 이상 ~ 15년 미만
                        </td>
                        <td className="point-text-align">30</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            7년 이상 ~ 8년 미만
                        </td>
                        <td className="point-text-align">16</td>
                        <td className="point-text-align">15년 이상</td>
                        <td className="point-text-align">32</td>
                    </tr>
                    <tr>
                        <td rowSpan="4" className="point-text-align">
                            부양가족 <br />수
                        </td>
                        <td rowSpan="4" className="point-text-align">
                            35
                        </td>
                        <td className="point-text-align">0명</td>
                        <td className="point-text-align">5</td>
                        <td className="point-text-align">4명</td>
                        <td className="point-text-align">25</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">1명</td>
                        <td className="point-text-align">10</td>
                        <td className="point-text-align">5명</td>
                        <td className="point-text-align">30</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">2명</td>
                        <td className="point-text-align">15</td>
                        <td className="point-text-align">6명 이상</td>
                        <td className="point-text-align">35</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">3명</td>
                        <td className="point-text-align">20</td>
                        <td className="point-text-align">X</td>
                        <td className="point-text-align">X</td>
                    </tr>
                    <tr>
                        <td rowSpan="9" className="point-text-align">
                            입주자 <br />
                            저축 <br /> 가입기간
                        </td>
                        <td rowSpan="9" className="point-text-align">
                            17
                        </td>
                        <td className="point-text-align">6개월 미만</td>
                        <td className="point-text-align">1</td>
                        <td className="point-text-align">
                            8년 이상 ~ 9년 미만
                        </td>
                        <td className="point-text-align">10</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            6개월 이상 ~ 1년 미만
                        </td>
                        <td className="point-text-align">2</td>
                        <td className="point-text-align">
                            9년 이상 ~ 10년 미만
                        </td>
                        <td className="point-text-align">11</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            1년 이상 ~ 2년 미만
                        </td>
                        <td className="point-text-align">3</td>
                        <td className="point-text-align">
                            10년 이상 ~ 11년 미만
                        </td>
                        <td className="point-text-align">12</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            2년 이상 ~ 3년 미만
                        </td>
                        <td className="point-text-align">4</td>
                        <td className="point-text-align">
                            11년 이상 ~ 12년 미만
                        </td>
                        <td className="point-text-align">13</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            3년 이상 ~ 4년 미만
                        </td>
                        <td className="point-text-align">5</td>
                        <td className="point-text-align">
                            12년 이상 ~ 13년 미만
                        </td>
                        <td className="point-text-align">14</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            4년 이상 ~ 5년 미만
                        </td>
                        <td className="point-text-align">6</td>
                        <td className="point-text-align">
                            13년 이상 ~ 14년 미만
                        </td>
                        <td className="point-text-align">15</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            5년 이상 ~ 6년 미만
                        </td>
                        <td className="point-text-align">7</td>
                        <td className="point-text-align">
                            14년 이상 ~ 15년 미만
                        </td>
                        <td className="point-text-align">16</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            6년 이상 ~ 7년 미만
                        </td>
                        <td className="point-text-align">8</td>
                        <td className="point-text-align">15년 이상</td>
                        <td className="point-text-align">17</td>
                    </tr>
                    <tr>
                        <td className="point-text-align">
                            7년 이상 ~ 8년 미만
                        </td>
                        <td className="point-text-align">9</td>
                        <td className="point-text-align">X</td>
                        <td className="point-text-align">X</td>
                    </tr>
                </table>
            </div>
        </>
    );
}

export default ExtraPointTable;
