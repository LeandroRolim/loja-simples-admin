import axios from "axios";
axios.defaults.withCredentials = true;
const http = axios.create({
  baseURL: "http://localhost/",
});
export default http;
