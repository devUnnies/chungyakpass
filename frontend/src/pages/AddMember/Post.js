import React, { useState } from "react";
import MainButton from "../../components/Button/MainButton";
import "./Addmember.css";

const Post = ({ onSaveData }) => {
  const [form, setForm] = useState({
    name: "",
    birth: "",
    nationality: "",
    relationship: "",
    owner: "",
    marriage: "",
    income: "",
    asset: "",
    history: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveData(form);
    console.log(form);
    setForm({
      name: "",
      birth: "",
      nationality: "",
      relationship: "",
      owner: "",
      marriage: "",
      income: "",
      asset: "",
      history: "",
    });
  };

  return (
    <>
      <div id="addMember" className="text-x1 font-bold mt-5 mb-2 text-center">
        <h3> 구성원 추가하기 </h3>
      </div>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="flex flex-col md:flex-row mb-1">
          이름
          <hr className="Line" />
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />{" "}
          <br />
          생년월일
          <hr className="Line" />
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="date"
            name="birth"
            value={form.birth}
            onChange={onChange}
            required
          />{" "}
          <br />
          내/외국인
          <hr className="Line" />
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="radio"
            name="nationality"
            onChange={onChange}
            value="local"
            checked={form.nationality === "local" ? true : false}
            required
          />{" "}
          내국인 <br />
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="radio"
            name="nationality"
            onChange={onChange}
            value="foreigner"
            checked={form.nationality === "foreigner" ? true : false}
            required
          />{" "}
          외국인 <br />
          신청자와의 관계
          <hr className="Line" />
          <select
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            name="relationship"
            value={form.relationship}
            onChange={onChange}
            required
          >
            <option value=""> ---선택--- </option>
            <option value="본인">본인</option>
            <option value="배우자">배우자</option>
            <option value="부모">부모</option>
            <option value="자녀">자녀</option>
            <option value="배우자의 부모">배우자의 부모</option>
            <option value="자녀의 배우자">자녀의 배우자</option>
            <option value="조부모">조부모</option>
            <option value="손자녀">손자녀</option>
            <option value="배우자의 조부모">배우자의 조부모</option>
            <option value="손자녀의 배우자">손자녀의 배우자</option>
          </select>{" "}
          <br />
          세대주 여부
          <hr className="Line" />
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="radio"
            name="owner"
            onChange={onChange}
            value="owner"
            checked={form.owner === "owner" ? true : false}
            required
          />{" "}
          세대주 이다 <br />
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="radio"
            name="owner"
            onChange={onChange}
            value="noneOwner"
            checked={form.owner === "noneOwner" ? true : false}
            required
          />{" "}
          세대주가 아니다 <br />
          혼인 여부
          <hr className="Line" />
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="radio"
            name="marriage"
            onChange={onChange}
            value="noneMarried"
            checked={form.marriage === "noneMarried" ? true : false}
            required
          />{" "}
          미혼
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="radio"
            name="marriage"
            onChange={onChange}
            value="married"
            checked={form.marriage === "married" ? true : false}
            required
          />{" "}
          기혼 <br />
          월 평균 소득
          <hr className="Line" />
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="number"
            name="income"
            onChange={onChange}
            value={form.income}
            required
          />{" "}
          원 <br />
          자산
          <hr className="Line" />
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="number"
            name="asset"
            onChange={onChange}
            value={form.asset}
            required
          />{" "}
          ㎡ <br />
          청약 당첨 이력
          <hr className="Line" />
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="radio"
            name="history"
            onChange={onChange}
            value="exist"
            checked={form.history === "exist" ? true : false}
            required
          />{" "}
          당첨 이력 존재
          <input
            className="w-full py-3 px-1 mt-1 text-gray-800 appearance-none border-2 border-gray-100 focus: text-gray-500 focus: outline-none focus: border-gray-200"
            type="radio"
            name="history"
            onChange={onChange}
            value="none"
            checked={form.history === "none" ? true : false}
            required
          />{" "}
          당첨 이력 전무 <br />
        </div>

        <div>
          <MainButton type="submit" className="save" width="80" height="30">
            저장
          </MainButton>
        </div>
      </form>
    </>
  );
};

export default Post;
