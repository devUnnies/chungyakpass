// import { InfoCircleTwoTone } from '@ant-design/icons';
// import React from 'react';
// import SingleQuestion from './Question';
// import FAQ from './FAQ';

// // 키워드, 결과값들, 업데이트필드를 전달받는다
// const SearchBar = ({ keyword, results, updateField }) => {
//     //
//     const updateText = (text) => {
//         //console.log('update text', text);
//         updateField('keyword', text, false);
//         updateField('results', []);
//     };

//     var renderResults;
//     const arr = results['results'];
//     if (arr) {
//         // arr 에 검색어에 대한 결과가 담기면, SearchView 호출
//         renderResults = arr.map((item) => {
//             return (
//                 <SearchView
//                     updateText={updateText}
//                     id={item.id}
//                     name={item.name}
//                     info={item.info}
//                     key={item.id}
//                 />
//             );
//         });
//     }
//     // onChange를 사용하여 글자를 입력할때마다 updateField호출하고 renderResults를 그린다.
//     return (
//         <div className="auto">
//             <input
//                 className="search-bar"
//                 placeholder="Search"
//                 value={keyword || ''}
//                 onChange={(e) => updateField('keyword', e.target.value)}
//             />
//             <div className="search-results">{renderResults}</div>
//         </div>
//     );
// };

// // 검색된 아이템 "name" "info" 출력
// const SearchView = ({ id, name, info, index, updateText }) => {
//     //console.log('search view:', name);
//     return (
//         <div
//             // 결과값 클릭시 updateText를 호출해 input에 풀네임 표시
//             onClick={() => updateText(name)}
//             className={`search-preview ${index === 0 ? 'start' : ''}`}
//         >
//             <div className="first">
//                 <p>{name}</p>
//             </div>
//         </div>
//     );
// };

// export default SearchBar;
// 검색 기능 추가중.
