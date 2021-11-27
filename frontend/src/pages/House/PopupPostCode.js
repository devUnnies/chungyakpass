import React from 'react';
import './House.css';
import DaumPostcode from 'react-daum-postcode';
import { CloseOutlined } from '@ant-design/icons';

const PopupPostCode = (props) => {
    const address = props.address;
    const setAddress = props.setAddress;
    const postcode = props.postcode;
    const setPostcode = props.setPostcode;

    // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress +=
                    extraAddress !== ''
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setAddress(fullAddress);
        setPostcode(data.zonecode);
        props.onClose();
    };

    const postCodeStyle = {
        display: 'block',
        top: '10%',
        width: '600px',
        height: '600px',
        padding: '7px',
    };

    return (
        <div className="popupPostCodeView">
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
        </div>
    );
};

export default PopupPostCode;
