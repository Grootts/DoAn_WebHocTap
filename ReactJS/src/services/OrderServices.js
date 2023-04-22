import axios from "./axiosInterceptor";
export const createOrder = async (data) => {
  const res = await axios.post(`api/order/create`, data);
  return res.data;
};
export const getOrderById = async (data, id) => {
  const res = await axios.put(`api/order/get-all-order/${id}`);
  return res.data;
};
export const getDetailsOrder = async (id) => {
  const res = await axios.get(`api/order/get-details-order/${id}`);
  return res.data;
};
export const deleteOrder = async (id) => {
  const res = await axios.delete(`api/order/cancel-order/${id}`);
  return res.data;
};
export const getAllOrder = async () => {
  const res = await axios.get(`api/order/get-all-order`);
  return res.data;
};
export const getDetailsOneOrder = async (data) => {
  const res = await axios.post(`api/order/get-one-order`, data);
  return res.data;
};
