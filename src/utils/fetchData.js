import axios from 'axios';

const getDataAPI = async (url, query, token) => {
  console.log({ url, query: { ...query }, token });
  const res = await axios.get(`http://localhost:3000/api/${url}`, {
    params: { ...query },
    headers: { Authorization: token },
  });
  return res;
};

const postDataAPI = async (url, data, token) => {
  const res = await axios.post(`http://localhost:3000/api/${url}`, data, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

const putDataAPI = async (url, data, token) => {
  const res = await axios.put(`http://localhost:3000/api/${url}`, data, {
    headers: { Authorization: token },
    'Content-Type': 'multipart/form-data',
  });
  return res;
};

const patchDataAPI = async (url, data, token) => {
  const res = await axios.patch(`http://localhost:3000/api/${url}`, data, {
    headers: { Authorization: token },
    'Content-Type': 'multipart/form-data',
  });
  return res;
};

const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`http://localhost:3000/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export { postDataAPI, putDataAPI, patchDataAPI, deleteDataAPI, getDataAPI };
