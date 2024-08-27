import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://react-component-base-api-production.up.railway.app" + "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default instance;
