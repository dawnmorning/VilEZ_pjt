import { atom } from "recoil";

const isLoginState = atom({
  key: "isLoginState",
  default: false,
});

const loginUserState = atom({
  key: "loginUserState",
  default: {
    id: 0,
    nickName: "",
    manner: 0,
    point: 0,
    profileImg: "",
    areaLng: "",
    areaLat: "",
  },
});

const shareDataState = atom({
  key: "shareDataState",
  default: {
    boardId: null,
    boardType: null,
    appointmentStart: "",
    appointmentEnd: "",
    shareUserId: null,
    notShareUserId: null,
  },
});

const modalOpenState = atom({
  key: "modalOpenState",
  default: false,
});

const enterChatRoomState = atom({
  key: "enterChatRoomState",
  default: 0,
});

const checkShareDateState = atom({
  key: "checkShareDateState",
  default: false,
});

const checkAppointmentState = atom({
  key: "checkAppointmentState",
  default: false,
});

const checkShareCancelAskState = atom({
  key: "checkShareCancelAskState",
  default: false,
});

const checkShareCancelState = atom({
  key: "checkShareCancelState",
  default: false,
});

const checkShareReturnState = atom({
  key: "checkShareReturnState",
  default: false,
});

const checkUserLeaveState = atom({
  key: "checkUserLeaveState",
  default: false,
});

const goCntZero = atom({
  key: "goCntZero",
  default: 0,
});

const mainSearchTextState = atom({
  key: "mainSearchTextState",
  default: "",
});

const chatListState = atom({
  key: "chatListState",
  default: [],
});

const stompState = atom({
  key: "stompState",
  default: [],
});

const boardState = atom({
  key: "boardState",
  default: [],
});

export {
  isLoginState,
  loginUserState,
  shareDataState,
  modalOpenState,
  enterChatRoomState,
  checkShareDateState,
  checkAppointmentState,
  checkShareCancelAskState,
  checkShareCancelState,
  checkShareReturnState,
  checkUserLeaveState,
  goCntZero,
  mainSearchTextState,
  chatListState,
  stompState,
  boardState,
};
