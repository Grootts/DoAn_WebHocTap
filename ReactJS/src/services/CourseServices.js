import axios from "./axiosInterceptor";
export const createCourse = async (data) => {
  const res = await axios.put(`api/course/create`, data);
  return res.data;
};
export const updateCourse = async (data, id) => {
  const res = await axios.put(`api/course/update/${id}`, data);
  return res.data;
};
export const getDetailsCourse = async (id) => {
  const res = await axios.get(`api/course/get-details/${id}`);
  return res.data;
};
export const deleteCourse = async (id) => {
  const res = await axios.delete(`api/course/delete/${id}`);
  return res.data;
};
export const getAllCourse = async () => {
  const res = await axios.get(`api/course/get-all`);
  return res.data;
};
