import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPointAllRecords } from '../../store/actions/recordAction';
import './Record.css';
import RecordTr from './RecordTr';

const RecordPointMain = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState({
        supply: '',
        subSupply: '',
        housingType: '',
    });
    let result = [];
    const [data, setData] = useState();
    const [page, setPage] = useState({ pointer: 1, item: null });
    const [pages, setPages] = useState([]);
    const [sliceNum, setSliceNum] = useState(5);
    const [pageLastNumber, setPageLastNumber] = useState();
    const recordsStore = useSelector((state) => state.records);

    const onCategoryChange = (e) => {
        const { name, value } = e.target;

        setCategory({
            ...category,
            [name]: value,
        });
    };

    useEffect(() => {
        dispatch(getPointAllRecords());
    }, []);

    const refreshData = () => {
        const allRecords = recordsStore.getPointAllRecords.data;
        const genMin = allRecords?.pointOfGeneralMinyeongResponseDtos;

        const speMulChi =
            allRecords?.pointOfSpecialMinyeongMultiChildResponseDtos;
        const speNewMar =
            allRecords?.pointOfSpecialMinyeongNewlyMarriedResponseDtos;
        const speSinPar =
            allRecords?.pointOfSpecialMinyeongSingleParentsResponseDtos;
        const speOldPar =
            allRecords?.pointOfSpecialMinyeongOldParentResponseDtos;

        if (allRecords) {
            if (genMin) {
                genMin.map((content, i) => {
                    if (content.total)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '일반',
                                subSupply: '',
                                housingType: '민영',
                                total: content.total,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (speMulChi) {
                speMulChi.map((content, i) => {
                    if (content.total)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '특별',
                                subSupply: '다자녀',
                                housingType: '민영',
                                total: content.total,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }
            if (speSinPar) {
                speSinPar.map((content, i) => {
                    if (content.total)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '특별',
                                subSupply: '한부모',
                                housingType: '민영',
                                total: content.total,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (speNewMar) {
                speNewMar.map((content, i) => {
                    if (content.total)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '특별',
                                subSupply: '신혼부부',
                                housingType: '민영',
                                total: content.total,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (speOldPar) {
                speOldPar.map((content, i) => {
                    if (content.total)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '특별',
                                subSupply: '노부모',
                                housingType: '민영',
                                total: content.total,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }
        }
    };

    // 데이터 가공
    useEffect(() => {
        refreshData();
    }, [recordsStore.getPointAllRecords]);

    // 필터
    useEffect(() => {
        if (category.supply === '일반' && category.housingType === '민영') {
            const result = data.filter(
                (item) => item.supply === '일반' && item.housingType === '민영'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '특별' &&
            category.subSupply === '생애최초'
        ) {
            const result = data.filter(
                (item) =>
                    item.supply === '특별' && item.subSupply === '생애최초'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '특별' &&
            category.subSupply === '신혼부부'
        ) {
            const result = data.filter(
                (item) =>
                    item.supply === '특별' && item.subSupply === '신혼부부'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '특별' &&
            category.subSupply === '다자녀'
        ) {
            const result = data.filter(
                (item) => item.supply === '특별' && item.subSupply === '다자녀'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '특별' &&
            category.subSupply === '노부모'
        ) {
            const result = data.filter(
                (item) => item.supply === '특별' && item.subSupply === '노부모'
            );

            setPage({ ...page, item: result });
        } else {
            refreshData();
        }
    }, [category.supply, category.subSupply, category.housingType]);

    useEffect(() => {
        if (pageLastNumber > 2) {
            for (let i = 1; i < pageLastNumber; i++) {
                if (pages) {
                    setPages([...pages, i]);
                } else if (!pages) {
                    setPages([i]);
                }
            }
        } else {
            setPages();
        }
    }, [pageLastNumber]);

    useEffect(() => {
        if (data) {
            if (Object.keys(data).length > 5) {
                setPageLastNumber(
                    Math.ceil(Object.keys(data).length / sliceNum)
                );
                setPage({
                    ...page,
                    item: data.splice(
                        page.pointer - 1 + 0,
                        page.pointer - 1 + 9
                    ),
                });
            } else {
                setPage({
                    ...page,
                    item: data,
                });
            }
        }
    }, [data]);

    const pageCal = () => {
        let temp = [];
        if (data)
            for (let i = page.pointer - 1 + 0; i < page.pointer - 1 + 9; i++) {
                temp.push(data[i]);
            }

        return temp;
    };

    useEffect(() => {
        if (page.pointer) {
            if (data)
                if (Object.entries(data).length > 5) {
                    const result = pageCal();
                    setPage({
                        ...page,
                        item: result,
                    });
                }
        }
    }, [page.pointer]);

    return (
        <div className="recordsPointInfo">
            <div className="recordsPointInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">가배점결과이력조회</span>
            </div>
            <br />

            <div className="recordsInfoSelectContainer">
                {/* 공급 선택 */}
                <select
                    name="supply"
                    onChange={onCategoryChange}
                    className="recordsPointInfoSelect"
                >
                    <option value="">--선택--</option>
                    <option value="일반">일반공급</option>
                    <option value="특별">특별공급</option>
                </select>
                {category.supply === '특별' ? (
                    <select
                        name="subSupply"
                        onChange={onCategoryChange}
                        className="recordsPointInfoSelect"
                    >
                        <option value="">--선택--</option>
                        <option value="생애최초">생애최초</option>
                        <option value="신혼부부">신혼부부</option>
                        <option value="다자녀">다자녀</option>
                        <option value="노부모">노부모</option>
                    </select>
                ) : (
                    <></>
                )}
                {/* 주택 선택 */}
                {category.supply === '일반' ? (
                    <select
                        name="housingType"
                        onChange={onCategoryChange}
                        className="recordsPointInfoSelect"
                    >
                        <option value="">--선택--</option>
                        <option value="민영">민영주택</option>
                    </select>
                ) : (
                    <></>
                )}
            </div>

            {/* 전체 이력 테이블 */}
            <table className="recordsPointInfoTable">
                <thead className="recordsPointInfoTableThead">
                    <tr className="recordsPointInfoTableTheadTr">
                        <td className="recordsPointInfoTableTheadTrTd">공급</td>
                        <td className="recordsPointInfoTableTheadTrTd">주택</td>
                        <td className="recordsPointInfoTableTheadTrTd">총점</td>
                        <td className="recordsPointInfoTableTheadTrTd">
                            자격확인일
                        </td>
                    </tr>
                </thead>
                <tbody className="recordsPointInfoTableTbody">
                    {page.item ? <RecordTr records={page.item} /> : <></>}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="recordsPointInfoPaginationContainer">
                {console.log('페이지 !!! ' + JSON.stringify(pages))}
                {pages ? (
                    pages?.map((num, i) => (
                        <div className="recordsInfoPaginationDiv">
                            {num === page.pointer ? (
                                <span
                                    className="recordsPointInfoPaginationSpanSame"
                                    onClick={() =>
                                        setPage({ ...page, pointer: num })
                                    }
                                >
                                    {num}
                                </span>
                            ) : (
                                <span
                                    className="recordsPointInfoPaginationSpan"
                                    onClick={() =>
                                        setPage({ ...page, pointer: num })
                                    }
                                >
                                    {num}
                                </span>
                            )}
                        </div>
                    ))
                ) : (
                    <span
                        className="recordsPointInfoPaginationSpanSame"
                        onClick={() => setPage({ ...page, pointer: 1 })}
                    >
                        1
                    </span>
                )}
            </div>
        </div>
    );
};

export default RecordPointMain;
