import "./Loader.css";
import { useTranslation } from "react-i18next";
const Loader = () => {
  const { t } = useTranslation();

  return (
    <div id="container">
      <label className="loading-title">{t("loading")}</label>
      <span className="loading-circle sp1">
        <span className="loading-circle sp2">
          <span className="loading-circle sp3"></span>
        </span>
      </span>
    </div>
  );
};

export default Loader;
