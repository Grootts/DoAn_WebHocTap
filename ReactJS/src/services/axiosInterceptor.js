import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8800/",
  timeout: 2000,
});

export default instance;
