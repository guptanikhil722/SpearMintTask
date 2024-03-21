import axios from "axios";

const axiosMain = axios.create({
  baseURL: "https://retoolapi.dev/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosMain;
