import { authJsonAxios } from "./instance";

// GET

async function getQrCode(userId) {
  try {
    const { data } = await authJsonAxios.post(`/qrcodes?userId=${userId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function deleteQrCode(imgUrl) {
  try {
    await authJsonAxios.delete(`/qrcodes?imgUrl=${imgUrl}`);
  } catch (error) {
    console.log(error);
  }
}

export { getQrCode, deleteQrCode };
