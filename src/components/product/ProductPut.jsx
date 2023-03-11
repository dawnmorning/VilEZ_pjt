import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getShareArticleByBoardId, putShareArticle } from "../../api/share";
import { getAskArticleDetailByBoardId, putAskArticle } from "../../api/ask";
import DivideLine from "../common/DivideLine";
import InputBox from "../common/InputBox";
import PutProductCalendar from "./PutProductCalendar";
import MiddleWideButton from "../button/MiddleWideButton";
import PutProductCategory from "./PutProductCategory";
import PutProductImageSelect from "./PutProductImageSelect";
import ProductRegistType from "./ProductRegistType";
import Map from "../common/Map";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const { kakao } = window;

const ProductPut = () => {
  const navigate = useNavigate();
  const boardId = parseInt(useParams().boardId);
  const [registType, setRegistType] = useState();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [location, setLocation] = useState("");
  const [hopeAreaLat, setHopeAreaLat] = useState("");
  const [hopeAreaLng, setHopeAreaLng] = useState("");
  const [imageList, setImageList] = useState([]);
  const pathname = useLocation().pathname;
  const type = pathname.includes("share") ? 2 : 1;
  const [tempSday, setTempSday] = useState("");
  const [tempEday, setTempEday] = useState("");

  useEffect(() => {
    type === 2
      ? getShareArticleByBoardId(boardId).then((res) => {
          const data = res[0];
          setTitle(data.title);
          setCategory(data.category);

          setContent(data.content);
          setStartDay(data.startDay);
          setEndDay(data.endDay);
          setHopeAreaLat(data.hopeAreaLat);
          setHopeAreaLng(data.hopeAreaLng);
          setLocation(data.address);
        })
      : getAskArticleDetailByBoardId(boardId).then((res) => {
          const data = res[0];
          setTitle(data.title);
          setCategory(data.category);

          setContent(data.content);
          setStartDay(data.startDay);
          setEndDay(data.endDay);
          setHopeAreaLat(data.hopeAreaLat);
          setHopeAreaLng(data.hopeAreaLng);
          setLocation(data.address);
        });
  }, []);

  function isValidDate(dateStr) {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }

  useEffect(() => {
    if (!isValidDate(startDay) || !isValidDate(endDay)) {
      return;
    }
    const startDayStr = new Date(startDay).toISOString();
    const endDayStr = new Date(endDay).toISOString();
    setTempSday(new Date(startDayStr));
    setTempEday(new Date(endDayStr));
  }, [startDay, endDay]);

  function receiveRegistType(registType) {
    setRegistType(registType);
  }

  function onChangeTitle(value) {
    if (title.length > 30) {
      alert("제목은 최대 30자 등록 가능해요 😥");
    } else setTitle(value);
  }

  function receiveCategory(category) {
    setCategory(category);
  }

  function receiveImageList(imageList) {
    setImageList(imageList);
  }

  function receiveStartDate(startDate) {
    const utcStartDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
    const startDateResult = JSON.stringify(utcStartDate);

    setStartDay(startDateResult.substring(1, 11));
    setEndDay(""); // 시작일만 설정했을 경우의 이슈를 막기 위해 시작일이 바뀔 때마다 종료일 리셋
  }

  function receiveEndDate(endDate) {
    const utcEndDate = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));
    const endDateResult = JSON.stringify(utcEndDate);

    setEndDay(endDateResult.substring(1, 11));
  }

  function receiveLocation(location, lat, lng, zoomLevel, isMarker) {
    if (isMarker) {
      setHopeAreaLat(lat);
      setHopeAreaLng(lng);
      searchDetailAddrFromCoords(lat, lng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setLocation(result[0].address.address_name);
        }
      });
    }
  }

  function searchDetailAddrFromCoords(lat, lng, callback) {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, callback);
  }

  function onClickRegistButton() {
    // 유효성 검사
    if (registType === "선택해주세요.") {
      alert("글 등록 타입을 선택해주세요.");
      return;
    }

    if (
      category === "카테고리" ||
      !category ||
      !content ||
      !endDay ||
      !hopeAreaLat ||
      !hopeAreaLng ||
      !startDay ||
      !title
    ) {
      alert("필수 항목을 모두 채워주세요.");
      return;
    }

    if (content.length > 300) {
      alert("물품에 대한 설명은 최대 300자 입력 가능해요.");
      return;
    }
    if (imageList.length === 0) {
      alert("사진을 첨부해주시겠어요? 빌리지는 사진첨부가 필수에요");
      return;
    }

    setContent(content.replaceAll("<br>", "\r\n")); // 개행 처리

    const formData = new FormData();

    imageList.forEach((image) => {
      formData.append("image", image);
    });

    formData.append(
      "board",
      new Blob(
        [
          JSON.stringify({
            id: boardId,
            category: category,
            content: content,
            endDay: endDay,
            hopeAreaLat: hopeAreaLat,
            hopeAreaLng: hopeAreaLng,
            startDay: startDay,
            title: title,
            address: location,
          }),
        ],
        { type: "application/json" }
      )
    );

    // API 요청
    if (registType === "물품 공유 등록") {
      putShareArticle(formData)
        .then((res) => {
          res = res[0];
          navigate(`/product/detail/share/${res.id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (registType === "물품 요청 등록") {
      putAskArticle(formData)
        .then((res) => {
          navigate(`/product/detail/ask/${res[0].id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div css={wrapper}>
      <ProductRegistType sendRegistType={receiveRegistType} type={registType} path={"modify"} />
      <DivideLine />
      <div css={titleWrapper}>
        <h3>
          제목 <b>*</b>
        </h3>
        <InputBox value={title} useMainList={false} placeholder="제목을 입력해주세요." onChangeValue={onChangeTitle} />
      </div>
      <div css={categoryWrapper}>
        <h3>
          카테고리 <b>*</b>
        </h3>
        <PutProductCategory isMain={true} sendCategory={receiveCategory} defaultCategory={category} />
      </div>
      <div css={contentWrapper}>
        <h3>
          설명 <b>*</b>
          <small>(최대 300자)</small>
        </h3>
        <textarea
          placeholder="물품에 대한 상세한 설명을 해주면 좋아요."
          onChange={(e) => setContent(e.target.value)}
          id="textarea"
          value={content}
        >
          {content}
        </textarea>
      </div>
      <div css={imageWrapper}>
        <h3>
          물품 사진 <b>*</b>
          <small>(최대 8개)</small>
        </h3>
        <small>물품에 대한 사진을 보여주면, 찾는 사람이 정확하게 볼 수 있어요.</small>
        <PutProductImageSelect sendImageList={receiveImageList} defaultImageList={imageList} />
      </div>
      <div css={hopeDateWrapper}>
        <h3>
          희망 공유 기간 <b>*</b>
        </h3>
        <small>희망 공유기간을 적어주세요. 기간은 대화를 통해 수정할 수 있어요.</small>
        <PutProductCalendar
          sendStartDate={receiveStartDate}
          sendEndDate={receiveEndDate}
          defaultStartDay={tempSday}
          defaultEndDay={tempEday}
        />
      </div>
      <div css={hopeAreaWrapper}>
        <div css={hopeAreaHeaderWrapper}>
          <h3>
            희망 공유 장소 <b>*</b>
          </h3>
          <span>{location}</span>
        </div>
        <Map
          readOnly={false}
          sendLocation={receiveLocation}
          path={"modify"}
          hopeAreaLat={hopeAreaLat}
          hopeAreaLng={hopeAreaLng}
        />
      </div>
      <div css={registButtonWrapper}>
        <div>
          <MiddleWideButton text="수정하기" onclick={onClickRegistButton} />
        </div>
      </div>
    </div>
  );
};

const wrapper = css`
  padding: 90px 200px;
  display: flex;
  flex-direction: column;
`;

const titleWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;

  & > h3 {
    margin-bottom: 15px;

    & b {
      color: red;
    }
  }
`;

const categoryWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;

  & > h3 {
    margin-bottom: 15px;

    & b {
      color: red;
    }
  }
`;

const contentWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;

  & > h3 {
    margin-bottom: 15px;

    & b {
      color: red;
    }
  }

  & > textarea {
    max-width: 100%;
    height: 176px;
    background: #ffffff;
    border: 1px solid #e1e2e3;
    border-radius: 5px;
    outline: none;
    resize: none;
    font-size: 18px;
    padding: 20px;
  }
`;

const imageWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;

  & > h3 {
    margin-bottom: 15px;

    & b {
      color: red;
    }
  }

  & > small {
    color: #847a7a;
  }
`;

const hopeDateWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;

  & > h3 {
    margin-bottom: 15px;

    & b {
      color: red;
    }
  }

  & > small {
    color: #847a7a;
    margin-bottom: 15px;
  }
`;

const hopeAreaWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;

  & > div:nth-of-type(2) {
    width: 100%;
    height: 479px;
  }
`;

const hopeAreaHeaderWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  & > h3 b {
    color: red;
  }

  & > span {
    color: #8a8a8a;
  }
`;

const registButtonWrapper = css`
  width: 100%;
  margin-top: 90px;
  display: flex;
  justify-content: center;

  & > div {
    width: 165px;
  }
`;

export default ProductPut;
