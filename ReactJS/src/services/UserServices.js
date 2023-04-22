import axios from "./axiosInterceptor";
export const loginUser = async (data) => {
  const res = await axios.post(`api/auth/users/login`, data);
  return res.data;
};
export const registerUser = async (data) => {
  const res = await axios.post(`api/auth/users/register`, data);
  return res.data;
};
export const forgetPassword = async (data) => {
  const res = await axios.post(`api/auth/forget-password`, data);
  return res.data;
};
export const newPasswordForget = async (data) => {
  const res = await axios.post(`api/auth/forget-password/:id/:token`, data);
  return res.data;
};
export const verifyGmail = async (data) => {
  const res = await axios.post(`api/auth/verify/:token`, data);
  return res.data;
};
export const updateUser = async (data, id) => {
  const res = await axios.put(`api/user/update-user/${id}`, data);
  return res.data;
};
export const deleteUser = async (data, id) => {
  const res = await axios.delete(`api/user/delete-user/${id}`);
  return res.data;
};

export const getAllUser = async () => {
  const res = await axios.get(`api/user/get-all`);
  return res.data;
};

export const getDetailUser = async (id) => {
  const res = await axios.get(`api/user/get-details/${id}`);
  return res.data;
};
