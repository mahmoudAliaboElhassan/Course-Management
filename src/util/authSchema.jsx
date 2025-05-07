import * as Yup from "yup";

export const authSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username Field is required")
    .max(20, "Maximum Number of characters is Twenty characters"),

  email: Yup.string().email().required("Email Field is required"),

  password: Yup.string()
    .required("Password Field is required")
    .matches(/^[a-zA-Z].*/, "Password must start with a character")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      "Password must contain at least one letter and one number"
    )
    .min(10, "Minimum Number of Chars is 10"),
});
