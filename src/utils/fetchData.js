import axios from 'axios';
import { useAlertStore } from '@/stores/alertStore';

const checkInvalidToken = (res) => {
  const alertStore = useAlertStore();
  if (res.data.error === 'Invalid token') {
    alertStore.setInvalidToken(true);
  }
};

const getDataAPI = async (url, query, token) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/${url}`, {
      params: { ...query },
      headers: { Authorization: token },
    });
    return res;
  } catch (error) {
    checkInvalidToken(error.response);
    console.error(error);
  }
};

const postDataMultipartAPI = async (url, data, token) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/${url}`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (error) {
    checkInvalidToken(error.response);
    console.error(error);
  }
};

const postDataAPI = async (url, data, token) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/${url}`, data, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    checkInvalidToken(error.response);
    console.error(error);
  }
};

const patchDataMultipartAPI = async (url, data, token) => {
  try {
    const res = await axios.patch(`http://localhost:3000/api/${url}`, data, {
      headers: { Authorization: token },
      'Content-Type': 'multipart/form-data',
    });
    return res;
  } catch (error) {
    checkInvalidToken(error.response);
    console.error(error);
  }
};

const patchDataAPI = async (url, data, token) => {
  try {
    const res = await axios.patch(`http://localhost:3000/api/${url}`, data, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error) {
    checkInvalidToken(error.response);
    console.error(error);
  }
};

const deleteDataAPI = async (url, token) => {
  try {
    const res = await axios.delete(`http://localhost:3000/api/${url}`, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error) {
    checkInvalidToken(error.response);
    console.error(error);
  }
};

export {
  postDataAPI,
  postDataMultipartAPI,
  patchDataAPI,
  patchDataMultipartAPI,
  deleteDataAPI,
  getDataAPI,
};
