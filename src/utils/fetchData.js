import axios from 'axios';
// import { useAlertStore } from '@/stores/alertStore';
// import { useUserStore } from '@/stores/userStore';

// const useAlert = useAlertStore();
// const useUser = useUserStore();

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// api.interceptors.request.use(
//   async function (config) {
//     const token = config.headers?.Authorization.split(' ')[1];
//     if (!token) {
//       return config;
//     }

//     const decoded = JSON.parse(atob(token.split('.')[1]));
//     if (decoded.exp * 1000 < Date.now()) {
//       useAlert.setAlert({
//         message: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại',
//         type: 'error',
//         isInvalidToken: true,
//       });
//       const accessToken = await useUser.refreshToken();
//       config.headers.Authorization = accessToken;
//       return config;
//     }
//     console.log(config.headers);

//     return config;
//   },
//   function (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 ||
      error.response.data.message === 'Invalid Token' ||
      error.response.data.message === 'jwt expired'
    ) {
      alert('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
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
      'Content-Type': 'multipart/form-data',
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
    'Content-Type': 'multipart/form-data',
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
