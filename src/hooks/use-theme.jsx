const UseTheme = () => {
  const selectedTheme = window.localStorage.getItem("selectedTheme");
  const theme = selectedTheme === "light" ? "light" : "dark";
  return { theme };
};

export default UseTheme;
