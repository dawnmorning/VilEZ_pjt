import { authJsonAxios, authFormDataAxios } from "./instance";

// GET

async function getAskArticleList(areaLat, areaLng, category, cnt, high, low, userId, word) {
  try {
    const { data } = await authJsonAxios.get(
      `/askboard?areaLat=${areaLat}&areaLng=${areaLng}&category=${category}&cnt=${cnt}&high=${high}&low=${low}&userId=${userId}&word=${word}`
    );

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getAskArticleDetailByBoardId(boardId) {
  try {
    const { data } = await authJsonAxios.get(`/askboard/detail/${boardId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getMyAskArticle(userId) {
  try {
    const { data } = await authJsonAxios.get(`/askboard/my/${userId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getUserAsk(userId) {
  try {
    const { data } = await authJsonAxios.get(`/askboard/my/${userId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

// POST

async function postAskArticle(formData) {
  try {
    const { data } = await authFormDataAxios.post(`/askboard`, formData);

    if (data.flag === "success") return data.data;
    else alert("요청 글 등록에 실패했어요 😥");
  } catch (error) {
    console.log(error);
  }
}

// DELETE

async function deleteAskArticleByBoardId(boardId) {
  try {
    const { data } = await authJsonAxios.delete(`/askboard/${boardId}`);

    if (data.flag === "success") alert("요청글 삭제에 성공했어요. 또 이용해주세요 😀");
    else alert("요청 글 삭제에 실패했어요 😥");
  } catch (error) {
    console.log(error);
  }
}

// PUT

async function putAskArticle(formData) {
  try {
    const { data } = await authFormDataAxios.put(`/askboard`, formData);

    if (data.flag === "success") {
      alert("수정되었어요 😀");
      return data.data;
    } else alert("요청 글 수정에 실패했어요 😥");
  } catch (error) {
    console.log(error);
  }
}

export {
  getAskArticleList,
  getAskArticleDetailByBoardId,
  getMyAskArticle,
  getUserAsk,
  postAskArticle,
  deleteAskArticleByBoardId,
  putAskArticle,
};
