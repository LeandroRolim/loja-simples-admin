import axios from "axios";
axios.defaults.withCredentials = true;
const http = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://apidev.leandrorolim.com.br/"
      : "http://localhost",
});
export default http;
