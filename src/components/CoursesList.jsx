import { Fragment, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, ButtonGroup, Container, Table } from "react-bootstrap";
import swal from "sweetalert";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./CoursesList.css";
import { ReactComponent as Next } from "../assets/chevron-right.svg";
import { ReactComponent as Prev } from "../assets/chevron-left.svg";
import { ReactComponent as Last } from "../assets/chevrons-right.svg";
import { ReactComponent as First } from "../assets/chevrons-left.svg";

const PostList = () => {
  const { t } = useTranslation();

  const [filter, setFilter] = useState(localStorage.getItem("value") || "");
  const [pageNo, setPageNo] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );

  const [allRecords, setAllRecords] = useState([]);
  const [records, setRecords] = useState([]);

  const itemsPerPage = 5;

  const capitalizeFirstLetter = (str) => {
    return str
      ?.split(" ")
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleDelete = useCallback(
    (record) => {
      swal({
        title: t("suring"),
        text: t("info"),
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const updated = allRecords.filter((r) => r.id !== record.id);
          setAllRecords(updated);
          localStorage.setItem("courses", JSON.stringify(updated));
          if (records.length === 1 && pageNo > 1) {
            setPageNo(pageNo - 1);
          }
          swal(t("deleting_message"), { icon: "success" });
        } else {
          swal(t("Keeping_post_message"));
        }
      });
    },
    [allRecords, records, pageNo, t]
  );

  // Load courses from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("courses")) || [];
    setAllRecords(
      filter ? storedData.filter((item) => item.type === filter) : storedData
    );
  }, [filter]);

  // Update current page data
  useEffect(() => {
    const start = (pageNo - 1) * itemsPerPage;
    const paginated = allRecords.slice(start, start + itemsPerPage);
    setRecords(paginated);
    localStorage.setItem("currentPage", pageNo.toString());
  }, [allRecords, pageNo]);

  const No_of_pages = Math.ceil(allRecords.length / itemsPerPage);

  let post_num = (pageNo - 1) * itemsPerPage;

  const data = records.map((record) => (
    <tr key={record.id} style={{ height: "16vh" }}>
      <td className="body-color center-content">{++post_num}</td>
      <td className="center-content text-center">
        <Link
          to={`course/${record.id}`}
          title={t("details")}
          style={{ fontSize: "16px" }}
        >
          {capitalizeFirstLetter(record?.title)}
        </Link>
      </td>
      <td className="body-color">
        <div className="post-image">
          <img
            src={record.img}
            alt={`img for ${record?.title?.substring(0, 10)}`}
          />
        </div>
      </td>
      <td className="center-content text-center">
        <ButtonGroup aria-label="Basic example">
          <Link to={`course/${record.id}/edit`}>
            <Button variant="success">{t("edit")}</Button>
          </Link>
          <Button variant="danger" onClick={() => handleDelete(record)}>
            {t("delete")}
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: "0.3" }}
      exit={{ y: "-100vh" }}
    >
      <Container>
        <div style={{ overflowX: "auto", overflowY: "hidden" }}>
          <Table bordered style={{ position: "relative" }}>
            <thead>
              <tr>
                <th className="body-color">#</th>
                <th style={{ width: "10%" }} className="body-color">
                  {t("title")}
                </th>
                <th style={{ width: "40%" }} className="body-color">
                  {t("image")}
                </th>
                <th style={{ width: "30%" }} className="body-color">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              <Loading loading={false} error={null}>
                {data.length ? (
                  data
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-muted">
                      {t("no_data")}
                    </td>
                  </tr>
                )}
              </Loading>
            </tbody>
          </Table>
        </div>

        {records.length !== 0 && (
          <Fragment>
            <div className="count">
              {pageNo} {t("of")} {No_of_pages}
            </div>
            <div className="navigate-btns">
              <Button
                onClick={() => setPageNo(No_of_pages)}
                className="mx-2 navigate-btn"
              >
                <Last />
                <span> {t("last")}</span>
              </Button>
              <Button
                onClick={() => setPageNo(1)}
                className="mx-2 navigate-btn"
              >
                <First />
                <span> {t("first")}</span>
              </Button>
              <Button
                onClick={() => setPageNo(pageNo - 1)}
                disabled={pageNo === 1}
                className="mx-2 navigate-btn"
              >
                <Prev />
                <span> {t("prev")}</span>
              </Button>
              <Button
                onClick={() => setPageNo(pageNo + 1)}
                disabled={No_of_pages === pageNo}
                className="mx-2 navigate-btn"
              >
                <Next />
                <span> {t("next")}</span>
              </Button>
            </div>
          </Fragment>
        )}
      </Container>
    </motion.div>
  );
};

export default PostList;
