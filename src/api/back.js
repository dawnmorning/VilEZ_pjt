import { authJsonAxios } from "./instance";

// GET

async function getChattingRoomState(roomId) {
  try {
    const { data } = await authJsonAxios.get(`/returns/${roomId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getShareState(roomId) {
  try {
    const { data } = await authJsonAxios.get(`/returns/state?roomId=${roomId}`);

    if (data.flag === "success") return data.data[0];
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getShareReturnState(roomId) {
  try {
    const { data } = await authJsonAxios.get(`/returns?roomId=${roomId}`);

    if (data.flag === "success") return data.data[0].state;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

// POST

async function postShareReturnState(roomId) {
  try {
    const { data } = await authJsonAxios.post(`/returns`, { roomId });

    if (data.flag === "success") return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

export { getChattingRoomState, getShareState, getShareReturnState, postShareReturnState };
