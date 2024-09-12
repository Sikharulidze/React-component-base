import { FeedbackType } from "../types";
import axios from "./axios";

export const sendFeedback = (data: FeedbackType) => {
  return axios.post("/feedback", data);
};
