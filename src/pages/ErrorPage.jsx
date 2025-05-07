import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useRouteError } from "react-router-dom";
import errorImage from "../assets/12a3d1d4161d12c5febc9482509b15ef_w.jpeg";

const ErrorPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <Container>
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <div className="mt-5 text-center d-flex justify-content-center align-items-center flex-column">
            <h1>{t("ops")}</h1>
            <p>{t("error_message")} </p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
            <Button
              variant="link"
              onClick={() => {
                navigate("/");
              }}
            >
              {t("back")}
            </Button>
          </div>
          <img
            src={errorImage}
            alt="Confused Woman"
            className="mb-4 img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
