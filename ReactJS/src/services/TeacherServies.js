import axios from "./axiosInterceptor";
export const loginTeacher = async (data) => {
  const res = await axios.post(`api/auth/teachers/login`, data);
  return res.data;
};
export const registerTeacher = async (data) => {
  const res = await axios.post(`api/auth/teachers/register`, data);
  return res.data;
};
export const updateTeacher = async (data, id) => {
  const res = await axios.put(`api/teacher/update-teacher/${id}`, data);
  return res.data;
};
export const deleteTeacherupdateTeacher = async (data, id) => {
  const res = await axios.delete(`api/teacher/delete-teacher/${id}`);
  return res.data;
};
