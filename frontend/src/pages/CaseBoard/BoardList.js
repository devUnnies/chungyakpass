import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonTable from '../../components/Table/CommonTable';
import CommonTableColumn from '../../components/Table/CommonTableColumn';
import CommonTableRow from '../../components/Table/CommonTableRow';
import { boardList } from './Data';
import './Board.css';
import { Users } from '../../components/User/Users';

const BoardList = (props) => {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        setDataList(boardList);
    }, []);

    const [users, setUsers] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    /*
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
      });
  });
  ]*/

    useEffect(() => {
        setFilteredUsers(
            () =>
                users.filter((user) =>
                    user.name.toLowerCase().includes(searchField.toLowerCase())
                ),
            users.filter((user) =>
                user.email.toLowerCase().includes(searchField.toLowerCase())
            )
        );
    }, [searchField, users]);

    return (
        <div className="boardContainer">
            <div className="caseBoardInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">부적격 사례</span>
            </div>
            {/* <div className="board_title">
                <h3 className="board_mainTitle"> 부적격 사례 </h3>
            </div> */}
            <div className="search_box">
                <select name="searchCate" className="searchCate">
                    <option value selected="selected">
                        제목+내용
                    </option>
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                </select>

                <input
                    type="search"
                    placeholder="Search"
                    onChange={(e) => setSearchField(e.target.value)}
                    className="search_text"
                ></input>
                <button type="button" className="search_btn">
                    {' '}
                    Search{' '}
                </button>

                <Users users={filteredUsers} />
            </div>
            <CommonTable headersName={['글번호', '제목', '등록일', '작성자']}>
                {dataList
                    ? dataList.map((item, index) => {
                          return (
                              <CommonTableRow key={index}>
                                  <CommonTableColumn>
                                      {item.no}
                                  </CommonTableColumn>
                                  <CommonTableColumn>
                                      <Link to={`/boardView/${item.no}`}>
                                          {item.title}
                                      </Link>
                                  </CommonTableColumn>
                                  <CommonTableColumn>
                                      {item.createDate}
                                  </CommonTableColumn>
                                  <CommonTableColumn>
                                      {item.writer}
                                  </CommonTableColumn>
                              </CommonTableRow>
                          );
                      })
                    : ''}
            </CommonTable>
        </div>
    );
};

export default BoardList;
