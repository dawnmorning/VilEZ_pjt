import { authJsonAxios } from "./instance";

// GET

async function getAppointmentsByUserId(userId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/my/appointlist/${userId}`);
    if (data.flag === "success") return data.data;
    else console.log("일치하는 약속이 없습니다.");
  } catch (error) {
    console.log(error);
  }
}

async function getPointListByUserId(userId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/my/point?userId=${userId}`);

    if (data.flag === "success") return data.data;
    else console.log("포인트 내역이 존재하지 않습니다.");
  } catch (error) {
    console.log(error);
  }
}

async function getShareDate(boardId, notShareUserId, shareUserId, type) {
  try {
    const { data } = await authJsonAxios.get(
      `/appointments/set/check?boardId=${boardId}&notShareUserId=${notShareUserId}&shareUserId=${shareUserId}&type=${type}`
    );

    if (data.flag === "success") return data.data;
    else console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getShareListByUserId(userId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/my/give/${userId}`);

    if (data.flag === "success") return data.data[0].state;
    else console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getNotShareListByUserId(userId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/my/${userId}`);

    if (data.flag === "success") return data.data[0].state;
    else console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getCheckShareCancelRequest(roomId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/request/cancel/${roomId}`);

    if (data.flag === "success") return data.data[0];
    else console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getAppointmentDate(boardId, notShareUserId, shareUserId, type) {
  try {
    const { data } = await authJsonAxios.get(
      `/appointments/date?boardId=${boardId}&notShareUserId=${notShareUserId}&shareUserId=${shareUserId}&type=${type}`
    );

    if (data.flag === "success") return data.data[0];
    else console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getAppointmentsWithinAWeek(userId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/my/date/${userId}`);
    if (data.flag === "success") return data.data[0];
    else console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getMyShareAppointments(userId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/my/give/${userId}`);

    if (data.flag === "success") return data.data[0];
    else console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getMyRentAppointments(userId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/my/${userId}`);

    if (data.flag === "success") return data.data[0];
    else console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getLatestMapLocation(chatRoomId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/map/${chatRoomId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getChatHistory(chatRoomId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/room/enter/${chatRoomId}`);

    if (data.flag === "success") return data.data;
    else console.log("일치하는 채팅 내역이 없습니다. 😅");
  } catch (error) {
    console.log(error);
  }
}

async function getAppointmentsByBoardId(boardId, type) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/${boardId}/${type}`);

    if (data.flag === "success") return data.data;
    else console.log("일치하는 게시글이 없습니다. 😅");
  } catch (error) {
    console.log(error);
  }
}

async function getLatestChattingListByUserId(userId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/room/${userId}`);

    if (data.flag === "success") return data.data;
    else console.log("일치하는 회원이 없습니다. 😅");
  } catch (error) {
    console.log(error);
  }
}

async function getBoardIdByRoomId(roomId) {
  try {
    const { data } = await authJsonAxios.get(`/appointments/room/board/${roomId}`);

    if (data.flag === "success") return data.data;
    else console.log("일치하는 채팅방이 없습니다. 😅");
  } catch (error) {
    console.log(error);
  }
}

async function getCheckMyRoom(boardId, type, userId) {
  try {
    const { data } = await authJsonAxios.get(
      `/appointments/board/checkroom?boardId=${boardId}&type=${type}&userId=${userId}`
    );

    if (data.flag === "success") return data.data; // 채팅방 이미 존재
    else return false; // 채팅방 미존재
  } catch (error) {
    console.log(error);
  }
}

// POST

async function postShareDate(body) {
  try {
    const { data } = await authJsonAxios.post(`/appointments/set/period`, body);

    if (data.flag === "success") return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function postShareCancelRequest(body) {
  try {
    const { data } = await authJsonAxios.post(`/appointments/request/cancel`, body);

    if (data.flag === "success") return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function postChatRoom(body) {
  try {
    const { data } = await authJsonAxios.post(`/appointments/room`, body);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function postAppointment(body) {
  try {
    const { data } = await authJsonAxios.post(`/appointments`, body);

    if (data.flag === "success") return true;
    else alert("약속 정보 저장에 실패했어요. 😅");
  } catch (error) {
    console.log(error);
  }
}

// PUT

async function putShareDate(body) {
  try {
    const { data } = await authJsonAxios.put(`/appointments/set/period`, body);

    if (data.flag === "success") return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

// DELETE

async function deleteAppointment(reason, roomId) {
  try {
    const { data } = await authJsonAxios.delete(`/appointments?reason=${reason}&roomId=${roomId}`);

    if (data.flag === "success") return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function deleteChatRoom(roomId, userId) {
  try {
    const { data } = await authJsonAxios.delete(`/appointments/chat?roomId=${roomId}&userId=${userId}`);

    if (data.flag === "success") return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

export {
  getAppointmentsByUserId,
  getPointListByUserId,
  getShareDate,
  getShareListByUserId,
  getNotShareListByUserId,
  getCheckShareCancelRequest,
  getAppointmentDate,
  getAppointmentsWithinAWeek,
  getMyShareAppointments,
  getMyRentAppointments,
  postShareDate,
  postShareCancelRequest,
  putShareDate,
  deleteAppointment,
  getLatestMapLocation,
  getChatHistory,
  getAppointmentsByBoardId,
  getLatestChattingListByUserId,
  getBoardIdByRoomId,
  getCheckMyRoom,
  postChatRoom,
  postAppointment,
  deleteChatRoom,
};
