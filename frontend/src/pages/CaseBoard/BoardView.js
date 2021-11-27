import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostByNo } from './Data';
import './Board.css';

const BoardView = ({ history, location, match }) => {
    const [data, setData] = useState({});

    const { no } = match.params;

    useEffect(() => {
        setData(getPostByNo(no));
    }, []);

    return (
        <>
            <div className="board_title">
                <h3 className="board_mainTitle">
                    {' '}
                    부적격 사례{' '}
                    <span className="board_subTitle"> | 게시글 상세 </span>
                </h3>
            </div>
            <div className="postView_wrapper">
                {data ? (
                    <>
                        <div className="postView_row">
                            <label className="postName">제목</label>
                            <span className="inner">{data.title}</span>
                        </div>
                        <div className="postView_row">
                            <label className="postName">작성일</label>
                            <span className="inner">{data.createDate}</span>
                        </div>
                        <div className="postView_row">
                            <label className="postName">작성자</label>
                            <span className="inner">{data.writer}</span>
                        </div>
                        <div className="postView_row">
                            <label className="postName">내용</label>
                            <span className="inner">
                                {data.Link}
                                <br />
                                <br />
                                <a href={data.link} target="_blank">
                                    {data.link}
                                </a>
                                <br />더 보시려면 위 링크로 들어가주세요.
                            </span>
                        </div>
                    </>
                ) : (
                    '해당 게시글을 찾을 수 없습니다.'
                )}
                <button className="goList_btn" onClick={() => history.goBack()}>
                    목록
                </button>
            </div>
        </>
    );
};

export default BoardView;
