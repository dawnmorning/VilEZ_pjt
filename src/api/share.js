import { authJsonAxios, authFormDataAxios } from "./instance";

// GET

async function getShareArticleByBoardId(boardId) {
  try {
    const { data } = await authJsonAxios.get(`/shareboard/detail/${boardId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getBookmarkStateByUserId(boardId, userId) {
  try {
    const { data } = await authJsonAxios.get(`/shareboard/bookmark/${boardId}/${userId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getShareArticleList(areaLat, areaLng, category, cnt, high, low, userId, word) {
  try {
    const { data } = await authJsonAxios.get(
      `/shareboard?areaLat=${areaLat}&areaLng=${areaLng}&category=${category}&cnt=${cnt}&high=${high}&low=${low}&userId=${userId}&word=${word}`
    );

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getBookmarkListByBoardId(boardId) {
  try {
    const { data } = await authJsonAxios.get(`/shareboard/bookmark/${boardId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getMyShareArticle(userId) {
  try {
    const { data } = await authJsonAxios.get(`/shareboard/my/${userId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getRelatedShareArticle(boardId, category, userId) {
  try {
    const { data } = await authJsonAxios.get(`/shareboard/best/${boardId}/${category}/${userId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getUserShare(userId) {
  try {
    const { data } = await authJsonAxios.get(`/shareboard/my/${userId}`);

    if (data.flag === "success") return data.data[0];
    else return false;
  } catch (error) {
    console.log(error);
  }
}

async function getUserBookMark(userId) {
  try {
    const { data } = await authJsonAxios.get(`/shareboard/bookmark/my/${userId}`);

    if (data.flag === "success") return data.data;
    else return false;
  } catch (error) {
    console.log(error);
  }
}

// POST

async function postShareArticle(formData) {
  try {
    const { data } = await authFormDataAxios.post(`/shareboard`, formData);

    if (data.flag === "success") return data.data;
    else alert("공유 글 등록에 실패했어요 😥");
  } catch (error) {
    console.log(error);
  }
}

async function postBookmark(boardId, userId) {
  try {
    const { data } = await authJsonAxios.post(`/shareboard/bookmark`, { boardId, userId });

    if (data.flag === "success") alert("이 게시글을 관심 글로 남겨졌어요 😀");
    else alert("관심 글 등록에 실패했어요 😥");
  } catch (error) {
    console.log(error);
  }
}

// DELETE

async function deleteBookmark(boardId, userId) {
  try {
    const { data } = await authJsonAxios.delete(`/shareboard/bookmark/${boardId}/${userId}`);

    if (data.flag === "success") {
      alert("관심 글 등록을 취소했어요 😀");
    } else alert("관심 글 등록 취소에 실패했어요 😥");
  } catch (error) {
    console.log(error);
  }
}

async function deleteShareArticleByBoardId(boardId) {
  try {
    const { data } = await authJsonAxios.delete(`/shareboard/${boardId}`);

    if (data.flag === "success") return true;
    else alert("게시글 삭제에 실패했어요 😥");
  } catch (error) {
    console.log(error);
  }
}

// PUT

async function putShareArticle(formData) {
  try {
    const { data } = await authFormDataAxios.put(`/shareboard`, formData);

    if (data.flag === "success") {
      return data.data;
    } else alert("공유 글 수정에 실패했어요 😥");
  } catch (error) {
    console.log(error);
  }
}

export {
  getShareArticleByBoardId,
  getBookmarkStateByUserId,
  getShareArticleList,
  getBookmarkListByBoardId,
  getMyShareArticle,
  getRelatedShareArticle,
  getUserShare,
  getUserBookMark,
  postShareArticle,
  postBookmark,
  deleteBookmark,
  deleteShareArticleByBoardId,
  putShareArticle,
};
