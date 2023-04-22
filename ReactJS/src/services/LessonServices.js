import axios from "./axiosInterceptor";
export const addLesson = async (data, id) => {
  const res = await axios.put(`api/lesson/add-lesson/${id}`, data);
  return res.data;
};
export const getDetailsLesson = async (id) => {
  const res = await axios.get(`api/lesson/get-details/${id}`);
  return res.data;
};
export const getAllLesson = async () => {
  const res = await axios.get(`api/lesson/get-all`);
  return res.data;
};
