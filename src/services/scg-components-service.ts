import axios from "./axios";

export const getAllSvg = () => {
  return axios.get("/svg-components");
};
