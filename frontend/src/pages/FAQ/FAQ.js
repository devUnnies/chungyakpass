import React, { useState } from 'react';
import Data from './Data';
import SearchBar from './SearchBar';
import SingleQuestion from './Question';
import './FAQ.css';

const FAQ = () => {
    const [questions, setQuestions] = useState(Data);

    //검색에 필요한 원천 데이타, 검색어, 결과값
    const [keyword, setKeyword] = useState();
    const [results, setResult] = useState([]);

    const updateField = (field, value, update = true) => {
        if (update) onSearch(value);
        if (field === 'keyword') {
            setKeyword(value);
        }
        if (field === 'results') {
            setResult(value);
        }
    };

    // 입력된 텍스트로 data 배열에서 찾아 매칭되는 결과들을 저장
    const onSearch = (text) => {
        var results = questions.filter(
            (item) => true === matchName(item.name, text)
        );
        setResult({ results });
    };

    // 검색해야할 문자열을 키워드와 비교하여 매칭이 되는지 체크
    const matchName = (name, keyword) => {
        var keyLen = keyword.length;
        name = name.toLowerCase().substring(0, keyLen);
        if (keyword === '') return false;
        return name === keyword.toString().toLowerCase();
    };

    return (
        <div className="faq_container">
            <div className="faqInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">자주 묻는 질문</span>
            </div>
            {/* <div className="faq_title">
                <h3 className="faq_mainTitle">
                    {' '}
                    FAQ <span className="faq_subTitle">
                        {' '}
                        | 자주 묻는 질문{' '}
                    </span>{' '}
                </h3>
            </div> */}
            {/* <div className="searchBar">
                <SearchBar
                    keyword={keyword}
                    results={results}
                    updateField={updateField}
                    placeholder={'Search...'}
                ></SearchBar>
            </div> */}
            <div className="info">
                {questions.map((question) => (
                    <SingleQuestion key={question.id} {...question} />
                ))}
            </div>
        </div>
    );
};

export default FAQ;
