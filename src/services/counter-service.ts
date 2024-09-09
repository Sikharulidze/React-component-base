import axios from "./axios";

export const copyClickCounter = (name: string) => {
  return axios.post("/svg-components", { componentName: name });
};
