import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecords } from '../../store/actions/recordAction';
import './Record.css';
import RecordTr from './RecordTr';

const RecordMain = () => {
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
        dispatch(getAllRecords());
    }, []);

    const refreshData = () => {
        const allRecords = recordsStore.getAllRecords.data;
        const genKook = allRecords?.verificationOfGeneralKookminResponseDtos;
        const genMin = allRecords?.verificationOfGeneralMinyeongResponseDtos;

        const speKookPubFirLif =
            allRecords?.verificationOfSpecialKookminPublicFirstLifeResponseDtos;
        const speKookPubMulChi =
            allRecords?.verificationOfSpecialKookminPublicMultiChildResponseDtos;
        const speKookPubNewMar =
            allRecords?.verificationOfSpecialKookminPublicNewlyMarriedResponseDtos;
        const speKookPubOldPar =
            allRecords?.verificationOfSpecialKookminPublicOldParentResponseDtos;
        const speMinFirLif =
            allRecords?.verificationOfSpecialMinyeongFirstLifeResponseDtos;
        const speMinMulChi =
            allRecords?.verificationOfSpecialMinyeongMultiChildResponseDtos;
        const speMinNewMar =
            allRecords?.verificationOfSpecialMinyeongNewlyMarriedResponseDtos;
        const speMinOldPar =
            allRecords?.verificationOfSpecialMinyeongOldParentResponseDtos;

        if (allRecords) {
            if (genKook) {
                genKook.map((content, i) => {
                    // console.log(JSON.stringify(content));

                    if (content.ranking)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '??????',
                                subSupply: '',
                                housingType: '??????',
                                ranking: content.ranking,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (genMin) {
                genMin.map((content, i) => {
                    // console.log(JSON.stringify(content));

                    if (content.ranking)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '??????',
                                subSupply: '',
                                housingType: '??????',
                                ranking: content.ranking,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (speKookPubFirLif) {
                speKookPubFirLif.map((content, i) => {
                    // console.log(JSON.stringify(content));

                    if (content.ranking)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '??????',
                                subSupply: '????????????',
                                housingType: '??????',
                                ranking: content.ranking,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (speKookPubMulChi) {
                speKookPubMulChi.map((content, i) => {
                    // console.log(JSON.stringify(content));

                    if (content.ranking)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '??????',
                                subSupply: '?????????',
                                housingType: '??????',
                                ranking: content.ranking,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (speKookPubNewMar) {
                speKookPubNewMar.map((content, i) => {
                    // console.log(JSON.stringify(content));

                    if (content.ranking)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '??????',
                                subSupply: '????????????',
                                housingType: '??????',
                                ranking: content.ranking,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (speKookPubOldPar) {
                speKookPubOldPar.map((content, i) => {
                    // console.log(JSON.stringify(content));

                    if (content.ranking)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '??????',
                                subSupply: '?????????',
                                housingType: '??????',
                                ranking: content.ranking,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (speMinFirLif) {
                speMinFirLif.map((content, i) => {
                    // console.log(JSON.stringify(content));

                    if (content.ranking)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '??????',
                                subSupply: '????????????',
                                housingType: '??????',
                                ranking: content.ranking,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (speMinMulChi) {
                speMinMulChi.map((content, i) => {
                    // console.log(JSON.stringify(content));

                    if (content.ranking)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '??????',
                                subSupply: '?????????',
                                housingType: '??????',
                                ranking: content.ranking,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (speMinNewMar) {
                speMinNewMar.map((content, i) => {
                    // console.log(JSON.stringify(content));

                    if (content.ranking)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '??????',
                                subSupply: '????????????',
                                housingType: '??????',
                                ranking: content.ranking,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }

            if (speMinOldPar) {
                speMinOldPar.map((content, i) => {
                    // console.log(JSON.stringify(content));

                    if (content.ranking)
                        result = [
                            ...result,
                            {
                                id: content.id,
                                supply: '??????',
                                subSupply: '?????????',
                                housingType: '??????',
                                ranking: content.ranking,
                                modifiedDate: content.modifiedDate,
                            },
                        ];

                    setData(result);
                });
            }
        }
    };

    // ????????? ??????
    useEffect(() => {
        refreshData();
    }, [recordsStore.getAllRecords]);

    // ??????
    useEffect(() => {
        if (category.supply === '??????' && category.housingType === '??????') {
            const result = data.filter(
                (item) => item.supply === '??????' && item.housingType === '??????'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '??????' &&
            category.housingType === '??????'
        ) {
            const result = data.filter(
                (item) => item.supply === '??????' && item.housingType === '??????'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '??????' &&
            category.subSupply === '????????????' &&
            category.housingType === '??????'
        ) {
            const result = data.filter(
                (item) =>
                    item.supply === '??????' &&
                    item.subSupply === '????????????' &&
                    item.housingType === '??????'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '??????' &&
            category.subSupply === '????????????' &&
            category.housingType === '??????'
        ) {
            const result = data.filter(
                (item) =>
                    item.supply === '??????' &&
                    item.subSupply === '????????????' &&
                    item.housingType === '??????'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '??????' &&
            category.subSupply === '????????????' &&
            category.housingType === '??????'
        ) {
            const result = data.filter(
                (item) =>
                    item.supply === '??????' &&
                    item.subSupply === '????????????' &&
                    item.housingType === '??????'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '??????' &&
            category.subSupply === '????????????' &&
            category.housingType === '??????'
        ) {
            const result = data.filter(
                (item) =>
                    item.supply === '??????' &&
                    item.subSupply === '????????????' &&
                    item.housingType === '??????'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '??????' &&
            category.subSupply === '?????????' &&
            category.housingType === '??????'
        ) {
            const result = data.filter(
                (item) =>
                    item.supply === '??????' &&
                    item.subSupply === '?????????' &&
                    item.housingType === '??????'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '??????' &&
            category.subSupply === '?????????' &&
            category.housingType === '??????'
        ) {
            const result = data.filter(
                (item) =>
                    item.supply === '??????' &&
                    item.subSupply === '?????????' &&
                    item.housingType === '??????'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '??????' &&
            category.subSupply === '?????????' &&
            category.housingType === '??????'
        ) {
            const result = data.filter(
                (item) =>
                    item.supply === '??????' &&
                    item.subSupply === '?????????' &&
                    item.housingType === '??????'
            );

            setPage({ ...page, item: result });
        } else if (
            category.supply === '??????' &&
            category.subSupply === '?????????' &&
            category.housingType === '??????'
        ) {
            const result = data.filter(
                (item) =>
                    item.supply === '??????' &&
                    item.subSupply === '?????????' &&
                    item.housingType === '??????'
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
                } else {
                    setPages([i]);
                }
            }
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
        <div className="recordsInfo">
            <div className="recordsInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">??????????????????</span>
            </div>
            <br />

            <div className="recordsInfoSelectContainer">
                {/* ?????? ?????? */}
                <select
                    name="supply"
                    onChange={onCategoryChange}
                    className="recordsInfoSelect"
                >
                    <option value="">--??????--</option>
                    <option value="??????">????????????</option>
                    <option value="??????">????????????</option>
                </select>
                {category.supply === '??????' ? (
                    <select
                        name="subSupply"
                        onChange={onCategoryChange}
                        className="recordsInfoSelect"
                    >
                        <option value="">--??????--</option>
                        <option value="????????????">????????????</option>
                        <option value="????????????">????????????</option>
                        <option value="?????????">?????????</option>
                        <option value="?????????">?????????</option>
                    </select>
                ) : (
                    <></>
                )}
                {/* ?????? ?????? */}
                <select
                    name="housingType"
                    onChange={onCategoryChange}
                    className="recordsInfoSelect"
                >
                    <option value="">--??????--</option>
                    <option value="??????">????????????</option>
                    <option value="??????">????????????</option>
                </select>
            </div>

            {/* ?????? ?????? ????????? */}
            <table className="recordsInfoTable">
                <thead className="recordsInfoTableThead">
                    <tr className="recordsInfoTableTheadTr">
                        <td className="recordsInfoTableTheadTrTd">??????</td>
                        <td className="recordsInfoTableTheadTrTd">??????</td>
                        <td className="recordsInfoTableTheadTrTd">??????</td>
                        <td className="recordsInfoTableTheadTrTd">
                            ???????????????
                        </td>
                    </tr>
                </thead>
                <tbody className="recordsInfoTableTbody">
                    {page.item ? <RecordTr records={page.item} /> : <></>}
                </tbody>
            </table>

            {/* ?????????????????? */}
            <div className="recordsInfoPaginationContainer">
                {Object.keys(pages).length > 0 ? (
                    pages.map((num, i) => (
                        <div className="recordsInfoPaginationDiv">
                            {num === page.pointer ? (
                                <span
                                    className="recordsInfoPaginationSpanSame"
                                    onClick={() =>
                                        setPage({ ...page, pointer: num })
                                    }
                                >
                                    {num}
                                </span>
                            ) : (
                                <span
                                    className="recordsInfoPaginationSpan"
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
                        className="recordsInfoPaginationSpanSame"
                        onClick={() => setPage({ ...page, pointer: 1 })}
                    >
                        1
                    </span>
                )}
            </div>
        </div>
    );
};

export default RecordMain;
