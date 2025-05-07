import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";
import "./Details.css";

const CourseDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const course = courses.find((course) => course.id === id);

  const days = [
    t("Sunday"),
    t("Monday"),
    t("Tuesday"),
    t("Wednesday"),
    t("Thursday"),
    t("Friday"),
    t("Saturday"),
  ];

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return formattedDate.toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: "0.3" }}
    >
      <Loading loading={!course}>
        <div className="container mb-1">
          <div className="title mb-1">
            <h1>
              {course?.title &&
                course.title
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
            </h1>
            <span>({t("Course")})</span>
          </div>
          {course?.image && (
            <img
              src={course.image}
              alt={course?.title}
              className="img-style mb-3"
            />
          )}
          <div className="description">
            <div className="description-txt pb-1">
              <p>{course?.description}</p>
            </div>
            {course?.startDate && course?.endDate && (
              <div className="date-range mt-3 mb-8">
                {t("Start Date")}: {formatDate(course.startDate)}
                {"   "}
                {t("End Date")}: {formatDate(course.endDate)}
              </div>
            )}
            {course?.price && (
              <div className="price">
                {t("Price")}: ${course.price}
              </div>
            )}
          </div>
        </div>
      </Loading>
    </motion.div>
  );
};

export default CourseDetails;
