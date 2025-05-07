import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ReactComponent as Add } from "../assets/plus-square.svg";
import "react-toastify/dist/ReactToastify.css";
import styles from "./buttons.module.css";
import "./course.css";

const courseSchema = Yup.object({
  title: Yup.string().required("Course title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .min(0, "Price must be a positive number")
    .required("Price is required"),
});

const AddCourse = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login"); // Adjust route as needed
    }
  }, [navigate]);
  const [previewImage, setPreviewImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: null,
      startDate: "",
      endDate: "",
      price: "",
    },
    validationSchema: courseSchema,
    onSubmit: (values) => {
      const reader = new FileReader();
      if (values.image) {
        reader.readAsDataURL(values.image);
        reader.onloadend = () => {
          saveCourse({ ...values, image: reader.result });
        };
      } else {
        saveCourse(values);
      }
    },
  });

  const saveCourse = (course) => {
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const newCourse = { ...course, id: Date.now().toString() };
    localStorage.setItem("courses", JSON.stringify([...courses, newCourse]));
    toast.success("Course added successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Form
        onSubmit={formik.handleSubmit}
        style={{ width: "90%", margin: "auto" }}
        encType="multipart/form-data"
      >
        <ToastContainer />

        <Form.Group className="mb-3">
          <Form.Label>Course Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            isInvalid={!!formik.errors.title && formik.touched.title}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            isInvalid={
              !!formik.errors.description && formik.touched.description
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image Upload</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            isInvalid={!!formik.errors.image && formik.touched.image}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: "200px", marginTop: "10px" }}
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            onChange={formik.handleChange}
            value={formik.values.startDate}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            onChange={formik.handleChange}
            value={formik.values.endDate}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            isInvalid={!!formik.errors.price && formik.touched.price}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.price}
          </Form.Control.Feedback>
        </Form.Group>

        <button className={styles.btnShine} type="submit">
          <Add />
          <span className="mx-1">Add Course</span>
        </button>
      </Form>
    </motion.div>
  );
};

export default AddCourse;
