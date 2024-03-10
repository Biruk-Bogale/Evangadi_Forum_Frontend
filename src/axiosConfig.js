import axios from "axios";
const axiosBase = axios.create({
  baseURL: "https://itchy-erin-mittens.cyclic.app/api",
});
export default axiosBase;
// baseURL: "http://localhost:2024/api",
