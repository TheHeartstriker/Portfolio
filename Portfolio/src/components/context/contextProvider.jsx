"use client";
import { createContext, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
export const Context = createContext();
import { winterTheme } from "@/components/forStyle/themeGen/themes";

export function Provider({ children }) {
  const pathname = usePathname();
  //
  //Decides if the opening should play only happens once on visit to /
  const [opening, setOpening] = useState(pathname === "/");
  //
  // Decides the current theme
  const [currTheme, setCurrTheme] = useState(winterTheme);

  return (
    <Context.Provider
      value={{
        currTheme: currTheme,
        setCurrTheme: setCurrTheme,
        opening: opening,
        setOpening: setOpening,
      }}
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
