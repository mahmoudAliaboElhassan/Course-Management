import { ReactComponent as Sun } from "../assets/Sun.svg";
import { ReactComponent as Moon } from "../assets/Moon.svg";
import "./DarkMode.css";

const DarkMode = () => {
  const setDarkMode = () => {
    document.body.setAttribute("data-theme", "dark");
    window.localStorage.setItem("selectedTheme", "dark");
  };
  const setLightMode = () => {
    document.body.setAttribute("data-theme", "light");
    window.localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = window.localStorage.getItem("selectedTheme");
  selectedTheme === "dark" ? setDarkMode() : setLightMode();
  const toggleTheme = (e) => {
    e.target.checked ? setDarkMode() : setLightMode();
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === "dark"}
      />
      <label
        className="dark_mode_label"
        for="darkmode-toggle"
        style={{ marginBottom: "5px" }}
      >
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
