import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { authSchema } from "../util/authSchema";
import swal from "sweetalert";
import "./formStyle.css";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseTheme from "../hooks/use-theme";

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = UseTheme();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      try {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        const isUserExists = existingUsers.some(
          (user) => user.email === values.email
        );
        if (isUserExists) {
          swal({
            icon: "error",
            title: t("error"),
            text: t("user-already-exists"),
          });
          return;
        }

        const newUser = {
          username: values.username,
          email: values.email,
          password: values.password,
        };

        localStorage.setItem(
          "users",
          JSON.stringify([...existingUsers, newUser])
        );

        toast.success(t("sign-success"), {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme,
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (err) {
        swal({
          icon: "error",
          title: t("error"),
          text: t("something-went-wrong"),
        });
      }
    },

    validationSchema: authSchema,
  });
  return (
    <div className="form-container">
      <Form
        onSubmit={formik.handleSubmit}
        className="form-style form-style-auth"
      >
        <Form.Group className="mb-4">
          <Form.Label className="label-color" htmlFor="username-field">
            {t("username")}
          </Form.Label>
          <ToastContainer />
          <Form.Control
            type="text"
            placeholder={t("person")}
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            isInvalid={!!formik.errors.username}
            id="username-field"
          />
          {formik.touched.username && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="label-color" htmlFor="email-field">
            {t("email")}
          </Form.Label>
          <Form.Control
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
            Show Password
          </Form.Label>
        </Form.Group>
        <button type="submit" class="my-2 btn btn-primary">
          {t("loading")}
        </button>
        <div>
          {t("have-account")} <Link to={"/login"}>{t("login")}</Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
