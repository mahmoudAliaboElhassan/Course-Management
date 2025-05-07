import { Fragment } from "react";
import "./Header.css";
import "./Footer.css";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { useTranslation } from "react-i18next";

function Footer() {
  const date = new Date();
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="bg-header-footer footer-style">
        <div>
          &copy; {t("made-with")}{" "}
          <span style={{ color: "red" }}>
            <Heart />
          </span>{" "}
          {t("by")} <span className="name">{t("mahmoud")}</span>
          {""} {date.getFullYear()}
        </div>
      </div>
    </Fragment>
  );
}

export default Footer;
