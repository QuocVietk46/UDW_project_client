import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 ||
      error.response.data.message === "Invalid Token" ||
      error.response.data.message === "jwt expired"
    ) {
      alert(
        "Phiên đăng nhập hết hạn hoặc bạn chưa đưa đăng nhập, vui lòng đăng nhập",
      );
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

const getDataAPI = async ({ url, query, token }) => {
  const res = await api.get(`/${url}`, {
    params: { ...query },
    headers: { Authorization: token },
  });
  return res;
};

const postDataMultipartAPI = async ({ url, data, token }) => {
  const res = await api.post(`/${url}`, data, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

const postDataAPI = async ({ url, data, token }) => {
  const res = await api.post(`/${url}`, data, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

const patchDataMultipartAPI = async ({ url, data, token }) => {
  const res = await api.patch(`/${url}`, data, {
    headers: { Authorization: token },
    "Content-Type": "multipart/form-data",
  });
  return res;
};

const patchDataAPI = async ({ url, data, token }) => {
  const res = await api.patch(`/${url}`, data, {
    headers: { Authorization: token },
  });
  return res;
};

const deleteDataAPI = async ({ url, token }) => {
  const res = await api.delete(`/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export {
  postDataAPI,
  postDataMultipartAPI,
  patchDataAPI,
  patchDataMultipartAPI,
  deleteDataAPI,
  getDataAPI,
};
