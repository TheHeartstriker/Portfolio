"use client";
import { Context } from "../forStyle/animations/animationContext";
import {
  winterTheme,
  summerTheme,
  springTheme,
  autumnTheme,
} from "@/components/forStyle/themeGen/themes";
import { applyTheme } from "../forStyle/themeGen/theme";
import { useContext } from "react";
import PropTypes from "prop-types";

export default function ThemeButton({ theme, key }) {
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
    <button
      key={key}
      className={`footer-blue-pill footer-blue-pill-${theme.toLowerCase()}`}
      onClick={() => {
        handleThemeChange(theme);
      }}
    >
      <h5>{theme}</h5>
    </button>
  );
}

ThemeButton.propTypes = {
  theme: PropTypes.string.isRequired,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
