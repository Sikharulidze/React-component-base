import * as yup from "yup";

const feedbackSchema = yup.object().shape({
  email: yup.string().email().optional(),
  text: yup.string().min(10).required(),
});

export default feedbackSchema;
