import * as yup from "yup";

const feedbackSchema = yup.object().shape({
  email: yup.string().trim().email().optional(),
  text: yup.string().trim().min(10).required(),
});

export default feedbackSchema;
