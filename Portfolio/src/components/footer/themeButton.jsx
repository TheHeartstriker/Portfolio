"use client";
import { Context } from "../../providers/context/contextProvider";
import {
  winterTheme,
  summerTheme,
  springTheme,
  autumnTheme,
} from "@/providers/themeGen/themes";
import { applyTheme } from "../../providers/themeGen/theme";
import { useContext } from "react";
import PropTypes from "prop-types";

export default function ThemeButton({ theme }) {
  const { setCurrTheme } = useContext(Context);

  function handleThemeChange(theme) {
    if (theme === "Autumn") {
      applyTheme(autumnTheme);
      setCurrTheme(autumnTheme);
    } else if (theme === "Spring") {
      applyTheme(springTheme);
      setCurrTheme(springTheme);
    } else if (theme === "Summer") {
      applyTheme(summerTheme);
      setCurrTheme(summerTheme);
    } else if (theme === "Winter") {
      applyTheme(winterTheme);
      setCurrTheme(winterTheme);
    }
  }
  return (
    <h5
      className="footer-links-item-theme"
      onClick={() => {
        handleThemeChange(theme);
      }}
    >
      {theme}
    </h5>
  );
}

ThemeButton.propTypes = {
  theme: PropTypes.string.isRequired,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
