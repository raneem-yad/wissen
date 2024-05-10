// import axios from "axios";

// axios.defaults.baseURL = "https://wissen-api-61cc6e37e2b8.herokuapp.com/";
// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// axios.defaults.withCredentials = true;


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://wissen-api-61cc6e37e2b8.herokuapp.com/",
});

axiosInstance.defaults.headers.post["Content-Type"] = "multipart/form-data";
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;