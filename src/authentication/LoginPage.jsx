import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./formStyle.css";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseTheme from "../hooks/use-theme";

const authSchema = Yup.object().shape({
  email: Yup.string().email().required("Email Field is required"),
  password: Yup.string()
    .required("Password Field is required")
    .matches(/^[a-zA-Z].*/, "Password must start with a character")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      "Password must be of Chars and Numbers"
    )
    .min(10, "Minimum Number of Chars is 10"),
});

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = UseTheme();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: authSchema,
    onSubmit: (values) => {
      console.log("values", values);
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      console.log("storedUsers", storedUsers);

      const matchedUser = storedUsers.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (matchedUser) {
        toast.success(t("login-success"), {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme,
        });
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        swal({
          icon: "error",
          title: t("error"),
          text: t("login-error"),
        });
      }
    },
  });

  return (
    <div className="form-container">
      <Form
        onSubmit={formik.handleSubmit}
        className="form-style form-style-auth"
      >
        <Form.Group className="mb-4">
          <Form.Label className="label-color" htmlFor="email-field">
            {t("email")}
          </Form.Label>
          <ToastContainer />
          <Form.Control
            className="input-field"
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            isInvalid={!!formik.errors.email}
            id="email-field"
          />
          {formik.touched.email && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="label-color" htmlFor="password-field">
            {t("password")}
          </Form.Label>
          <Form.Control
            className="input-field"
            type={showPassword ? "text" : "password"}
            placeholder={t("password-here")}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={!!formik.errors.password}
            id="password-field"
          />
          {formik.touched.password && (
            <Form.Control.Feedback type="invalid" className="position-relative">
              {formik.errors.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group>
          <input
            type="checkbox"
            className="password-toggle-btn"
            onChange={togglePasswordVisibility}
            id="show-password"
          />
          <Form.Label className="label-color" htmlFor="show-password">
            {t("show-password")}
          </Form.Label>
        </Form.Group>
        <button type="submit" class="my-2 btn btn-primary">
          {t("login")}
        </button>
        <div>
          {t("no-account")} <Link to={"/signup"}>{t("signup")}</Link>
        </div>{" "}
      </Form>
    </div>
  );
};

export default LoginPage;
