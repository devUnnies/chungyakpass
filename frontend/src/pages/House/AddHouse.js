import React, { useCallback, useEffect, useState } from 'react';
import './House.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import MainButton from '../../components/Button/MainButton';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import NextButton from '../../components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { addHouse } from '../../store/actions/commonInfoAction';

const AddHouse = (props) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [fullAddress, setFullAddress] = useState();
    const [postcode, setPostcode] = useState('');

    const [address, setAddress] = useState({
        sido: '',
        sigungu: '',
        detail: '',
        postcode: '',
    });

    const history = useHistory();
    const dispatch = useDispatch();
    const commonInfoStore = useSelector((state) => state.commonInfo);
    const location = useLocation();

    // 본인 세대인지 배우자 분리 세대인지 전달받은 값을 저장 (history.push에서 전달받음)
    const houseState = location.state.houseState;

    const openPostCode = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const closePostCode = () => {
        setIsPopupOpen(false);
    };

    const onPostChange = (e) => {
        setPostcode(e.target.value);
    };

    const onFullChange = (e) => {
        setFullAddress(e.target.value);
    };

    useEffect(() => {
        // 세대 등록 성공시
        const data = commonInfoStore.addHouse.data;
        if (data) {
            // 세대가 이미 있다면 얼럿 띄우기
            if (data.status === 409) {
                alert(data.message);
            } else {
                history.push('/members', { houseState: houseState });
            }
        }
    }, [commonInfoStore.addHouse]);

    // 세대 등록하는 api 연결
    const handleSubmit = (event) => {
        const userForm = {
            spouseHouseYn: houseState === 'my' ? 'n' : 'y',
            addressLevel1: address?.sido.slice(0, 2),
            addressLevel2: address?.sigungu,
            addressDetail: address?.detail,
            zipcode: address?.postcode,
        };

        // console.log(JSON.stringify(userForm));
        dispatch(addHouse(userForm));

        return false;
    };

    useEffect(() => {
        setAddress({
            ...address,
            sido: fullAddress?.split(' ')[0],
            sigungu:
                fullAddress?.split(' ')[0] === '세종특별자치시'
                    ? fullAddress?.split(' ')[0]
                    : fullAddress?.split(' ')[1],
            detail:
                // 제주도 일 경우
                fullAddress?.split(' ')[0] === '제주특별자치도'
                    ? // 제주도인데 서귀포시 일 경우
                      fullAddress?.split(' ')[1].length === 4
                        ? fullAddress?.substring(13)
                        : // 제주도인데 제주시 일 경우
                        fullAddress?.split(' ')[1].length === 3
                        ? fullAddress?.substring(12)
                        : null
                    : // 세종특별자치시 일 경우
                    fullAddress?.split(' ')[0] === '세종특별자치시'
                    ? fullAddress?.substring(8)
                    : fullAddress?.split(' ')[1].length === 2
                    ? fullAddress?.substring(6)
                    : fullAddress?.split(' ')[1].length === 3
                    ? fullAddress?.substring(7)
                    : fullAddress?.split(' ')[1].length === 4
                    ? fullAddress?.substring(8)
                    : null,
        });
    }, [fullAddress]);

    useEffect(() => {
        setAddress({
            ...address,
            postcode: postcode,
        });
    }, [postcode]);

    return (
        <div className="addHouseView">
            <div className="addHouseHeaderContainer">
                <div className="heightBar"></div>
                <span className="addAddressTitle">세대등록</span>
            </div>

            <br />
            <div className="findAddressButtonWrapper">
                <MainButton
                    width={80}
                    height={30}
                    paddingLeft={10}
                    onClick={() => openPostCode()}
                >
                    주소 찾기
                </MainButton>
            </div>
            <div id="popupDom" className="popupDomContainer">
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode
                            address={fullAddress}
                            setAddress={setFullAddress}
                            postcode={postcode}
                            setPostcode={setPostcode}
                            onClose={closePostCode}
                        />
                    </PopupDom>
                )}
            </div>
            <div name="addHouseAddress" className="addHouseContainer">
                <div className="addressFormContainer">
                    <table className="addressFormTable">
                        <tbody>
                            <tr>
                                <td className="addressFormLabel">
                                    <label className="addressFormLabel">
                                        우편번호
                                    </label>
                                </td>
                                <td className="addressFormInputPostcode">
                                    <input
                                        className="addressFormInputPostcode"
                                        type="number"
                                        value={postcode}
                                        onChange={onPostChange}
                                        required
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="addressFormLabel">
                                    <label className="addressFormLabel">
                                        주소
                                    </label>
                                </td>
                                <td className="addressFormInputAddress">
                                    <input
                                        className="addressFormInputAddress"
                                        type="text"
                                        value={fullAddress}
                                        onChange={onFullChange}
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 구성원 목록으로 가는 버튼 추가 */}
                <div className="submitButtonWrapper">
                    <NextButton
                        width={50}
                        height={50}
                        className="addAddressButton"
                        type="addAddress"
                        fontSize={150}
                        onClick={() => handleSubmit()}
                    />

                    {/* <MainButton
                        type="submit"
                        width="60"
                        height="30"
                        onClick={handleSubmit}
                    >
                        등록
                    </MainButton> */}
                </div>
            </div>
        </div>
    );
};

export default AddHouse;
