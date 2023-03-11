import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DivideLine from "../common/DivideLine";
import bookmark from "../../assets/images/bookmark.png";
import MiddleWideButton from "../button/MiddleWideButton";
import ProductDeatilHeader from "./ProductDeatilHeader";
import Map from "../common/Map";
import ImageSlide from "../common/ImageSlide";
import ProductDetailFooter from "./ProductDetailFooter";
import {
  getShareArticleByBoardId,
  getBookmarkStateByUserId,
  postBookmark,
  deleteBookmark,
  deleteShareArticleByBoardId,
} from "../../api/share";
import elapsedTime from "./ProductElapsedTime";
import bookmarkCancel from "../../assets/images/bookmarkCancel.png";
import { getUserDetail } from "../../api/user";
import MannerPoint from "../common/MannerPoint";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getAppointmentsByBoardId, postChatRoom } from "../../api/appointment";
import { deleteAskArticleByBoardId, getAskArticleDetailByBoardId } from "../../api/ask";
import { getCheckMyRoom } from "../../api/appointment";
import { useSetRecoilState } from "recoil";
import { boardState } from "../../recoil/atom";

const ProductDetail = () => {
  const navigate = useNavigate();
  const boardId = parseInt(useParams().boardId);
  const pathname = useLocation().pathname;
  const loginUserId = window.localStorage.getItem("id"); // 로그인유저 id
  const type = pathname.includes("share") ? 2 : 1;
  const [writerId, setWriterId] = useState(""); // 공유자 id
  const setBoardState = useSetRecoilState(boardState);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageList, setImageList] = useState([]);
  const [date, setDate] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [hopeAreaLat, setHopeAreaLat] = useState("");
  const [hopeAreaLng, setHopeAreaLng] = useState("");
  const [location, setLocation] = useState("");
  const [bookmarkCnt, setBookmarkCnt] = useState(0);
  const [writerProfile, setWriterProfile] = useState("");
  const [writerNickname, setWriterNickname] = useState("");
  const [writerManner, setWriterManner] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [level, setLevel] = useState(0);
  const [myPoint, setMyPoint] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [isAppointment, setIsAppointment] = useState(false);

  function checkSocialNickName() {
    const nickName = window.localStorage.getItem("nickName");
    if (nickName.slice(0, 1) === "#") {
      return true;
    }
    return false;
  }

  function onClickBookmark() {
    if (isBookmarked) {
      deleteBookmark(boardId, loginUserId);
      setIsBookmarked(false);
      setBookmarkCnt(bookmarkCnt - 1);
    } else {
      postBookmark(boardId, loginUserId);
      setIsBookmarked(true);
      setBookmarkCnt(bookmarkCnt + 1);
    }
  }

  function onClickMoveChat() {
    if (checkSocialNickName()) {
      alert("닉네임 변경을 진행해주세요.");
      navigate("/socialnickname", { state: { url: "/mybox" } });
      return;
    }

    // 공유받을 수 있는 포인트가 충분한지 확인
    if (myPoint < 30) {
      alert("공유를 진행하기에 포인트가 부족해요. 다른 사람에게 물건을 공유해주고 포인트를 얻어봐요 😀");
      return;
    }

    const type = pathname.includes("share") ? 2 : 1; // 요청글 = 1, 공유글 = 2

    getCheckMyRoom(boardId, type, loginUserId).then((res) => {
      // 채팅방이 이미 존재하면 해당 방으로 이동
      if (res) {
        navigate(`/product/chat/${res[0].id}`);
        window.location.reload();
      }
      // 채팅방이 없으면 채팅방 생성
      else {
        // 요청글이면 공유자 = 나, 피공유자 = 상대방
        // 공유글이면 공유자 = 상대방, 피공유자 = 나
        type === 1
          ? postChatRoom({
              type: type,
              boardId: boardId,
              shareUserId: loginUserId,
              notShareUserId: writerId,
            }).then((res) => {
              if (res) {
                navigate(`/product/chat/${res[0].id}`);
                window.location.reload();
              }
            })
          : postChatRoom({
              type: type,
              boardId: boardId,
              shareUserId: writerId,
              notShareUserId: loginUserId,
            }).then((res) => {
              if (res) {
                navigate(`/product/chat/${res[0].id}`);
                window.location.reload();
              }
            });
      }
    });
  }

  function calcMannerLevel(manner) {
    if (manner > 40) {
      return 5;
    } else {
      return parseInt((manner - 1) / 10) + 1;
    }
  }

  // 게시글 정보 얻어오기
  useEffect(() => {
    const type = pathname.includes("share") ? 2 : 1;

    type === 1
      ? getAskArticleDetailByBoardId(boardId).then((res) => {
          const data = res[0];

          setWriterId(data.userId);
          setTitle(data.title);
          setCategory(data.category);
          setDate(elapsedTime(data.date));
          setImageList(data.list);
          setContent(data.content);
          setStartDay(data.startDay);
          setEndDay(data.endDay);
          setHopeAreaLat(data.hopeAreaLat);
          setHopeAreaLng(data.hopeAreaLng);
          setBookmarkCnt(data.bookmarkCnt);
          setLocation(data.address);
        })
      : getShareArticleByBoardId(boardId).then((res) => {
          const data = res[0];

          setWriterId(data.userId);
          setTitle(data.title);
          setCategory(data.category);
          setDate(elapsedTime(data.date));
          setImageList(data.list);
          setContent(data.content);
          setStartDay(data.startDay);
          setEndDay(data.endDay);
          setHopeAreaLat(data.hopeAreaLat);
          setHopeAreaLng(data.hopeAreaLng);
          setBookmarkCnt(data.bookmarkCnt);
          setLocation(data.address);
        });
  }, []);

  // 작성자(공유자) 정보 얻어오기
  useEffect(() => {
    if (writerId) {
      getUserDetail(writerId)
        .then((res) => {
          setWriterProfile(res.profile_img);
          setWriterNickname(res.nickName);
          setWriterManner(MannerPoint(res.manner));
          setLevel(calcMannerLevel(res.manner));
        })
        .catch((error) => console.log(error));
    }
  }, [writerId]);

  useEffect(() => {
    if (loginUserId) {
      getUserDetail(loginUserId).then((res) => {
        setMyPoint(res.point);
      });
    }
  }, [loginUserId]);

  // 내가 이 게시글을 북마크했는지 여부 확인
  useEffect(() => {
    if (boardId && loginUserId) {
      getBookmarkStateByUserId(boardId, loginUserId)
        .then((res) => {
          const data = res[0];

          if (!data) setIsBookmarked(false);
          else setIsBookmarked(true);
        })
        .catch((error) => console.log(error));
    }
  }, [boardId, loginUserId]);

  useEffect(() => {
    getAppointmentsByBoardId(boardId, type).then((res) => {
      if (res[0].length === 1) {
        setIsAppointment(true);
      }
    });
  }, []);

  function onClickShowDelete() {
    setIsDelete(!isDelete);
  }

  function onClickDelete() {
    if (isAppointment === true) {
      alert("예약중인 글은 삭제할 수 없어요😱");
    } else {
      setBoardState([boardId, type]);
      type === 2
        ? deleteShareArticleByBoardId(boardId).then(() => {
            navigate(`/product/list/share`);
          })
        : deleteAskArticleByBoardId(boardId).then(() => {
            navigate(`/product/list/ask`);
          });
    }
  }
  return (
    <div css={wrapper}>
      {isDelete ? (
        <div css={DeleteTop}>
          <div css={DeleteWrap}>
            <div>글을 삭제하시겠어요?</div>
            <div css={buttonWrap}>
              <MiddleWideButton text="아니오" cancel={true} onclick={onClickShowDelete} />
              <MiddleWideButton text="네" onclick={onClickDelete} />
            </div>
          </div>
        </div>
      ) : null}

      <ProductDeatilHeader
        title={title}
        category={category}
        time={date}
        bookmarkCount={bookmarkCnt}
        isShowDelete={setIsDelete}
      />

      <DivideLine />

      <div css={contentsWrapper}>
        <ImageSlide imageSlideList={imageList} />
        <div css={nickNameAndChatWrapper}>
          <div css={nickNameWrapper}>
            <img src={writerProfile} alt="writerProfileImage" />
            <span>{writerNickname}</span>
            <span>Lv.{level}</span>
            <img src={writerManner} alt="writerMannerPoint" />
          </div>
          <div css={chatWrapper}>
            {type === 2 ? (
              isBookmarked ? (
                <img src={bookmark} alt="bookmark" onClick={onClickBookmark} />
              ) : (
                <img src={bookmarkCancel} alt="bookmarkCancel" onClick={onClickBookmark} />
              )
            ) : null}
            {loginUserId == writerId ? <></> : <MiddleWideButton text="채팅하기" onclick={onClickMoveChat} />}
          </div>
        </div>
        <div css={contentWrapper}>
          <h3>설명</h3>
          <textarea readOnly value={content}></textarea>
        </div>
        <div css={hopeDateWrapper}>
          <h3>희망 공유 기간</h3>
          <div>
            <span>
              {startDay} - {endDay}
            </span>
          </div>
        </div>
        <div css={hopeAreaWrapper}>
          <div>
            <h3>희망 공유 장소</h3>
            <span>{location}</span>
          </div>
          <Map readOnly={true} selectedLat={hopeAreaLat} selectedLng={hopeAreaLng} path={"detail"} />
        </div>
      </div>

      <DivideLine />

      <ProductDetailFooter />
    </div>
  );
};

const wrapper = css`
  padding: 90px 200px;
  position: relative;
`;

const DeleteTop = css`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const DeleteWrap = css`
  position: fixed;
  width: 450px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const buttonWrap = css`
  display: flex;
  width: 350px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;

  & > button {
    width: 170px;
  }
`;

const contentsWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 60px 20px;

  & > div {
    margin-bottom: 60px;
  }
`;

const nickNameAndChatWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const nickNameWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > img:nth-of-type(1) {
    width: 90px;
    height: 90px;
    margin-right: 20px;
    border-radius: 100%;
    object-fit: cover;
  }

  & > span {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  }

  & > img:nth-of-type(2) {
    width: 40px;
    height: 40px;
  }
`;

const chatWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;

  & img {
    width: 35px;
    height: 30px;
    margin-right: 20px;
    cursor: pointer;
  }

  & button {
    margin-top: 0;
  }
`;

const contentWrapper = css`
  display: flex;
  flex-direction: column;

  & textarea {
    margin-top: 20px;
    max-width: 100%;
    height: 246px;
    border: 1px solid #e1e2e3;
    border-radius: 5px;
    padding: 30px;
    font-size: 18px;
    resize: none;
    outline: none;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      height: 30%;
      background: #c4c4c4;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: none;
    }
  }
`;

const hopeDateWrapper = css`
  & div {
    margin-top: 20px;
    width: 260px;
    height: 54px;
    background: #ffffff;
    border: 1px solid #e1e2e3;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const hopeAreaWrapper = css`
  display: flex;
  flex-direction: column;

  & > div:nth-of-type(1) {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 20px;

    & span {
      color: #8a8a8a;
    }
  }

  & > div:nth-of-type(2) {
    width: 100%;
    height: 479px;
  }
`;

export default ProductDetail;
