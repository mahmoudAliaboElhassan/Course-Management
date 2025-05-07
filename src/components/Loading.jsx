import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Loading = ({ loading, error, children }) => {
  const { t } = useTranslation();
  const isButton = children.type === "button";
  const renderHandler = () => {
    if (isButton) {
      const cloneButton = React.cloneElement(
        children,
        { disabled: true },
        t("loading")
      );
      return (
        <>
          {loading ? (
            cloneButton
          ) : error ? (
            <>
              {children}
              <Button variant="danger" style={{ marginLeft: "10px" }}>
                {error}
              </Button>
            </>
          ) : (
            children
          )}
        </>
      );
    } else {
      // If the child is not a button
      return (
        <>
          {loading ? (
            <p>{t("loading_message")}</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            children
          )}
        </>
      );
    }
  };

  return renderHandler();
};

export default Loading;
