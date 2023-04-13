import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8800/",
  timeout: 60000,
});

export default instance;
