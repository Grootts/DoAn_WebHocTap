import axios from "./axiosInterceptor";

export const getConfig = async () => {
  const res = await axios.get("api/payment/config");
  return res.data;
};
