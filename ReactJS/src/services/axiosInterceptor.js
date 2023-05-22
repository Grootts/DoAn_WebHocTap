import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:8800/",
  baseURL: `${process.env.REACT_APP_DB_URL}`,
});

export default instance;
