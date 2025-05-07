import { Fragment } from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <Fragment>
      <Header />
      <Container style={containerStyle}>
        <Outlet />
      </Container>
      <Footer />
    </Fragment>
  );
};

const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
};

export default RootLayout;
