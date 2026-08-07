"use client";
import { createContext } from "react";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
export const Context = createContext();

export function Provider({ children }) {
  const pathname = usePathname();
  //
  // //Decides if the opening should play only happens once on visit to /
  // const [opening, setOpening] = useState(pathname === "/");
  // //
  // // Decides the current theme
  // const [currTheme, setCurrTheme] = useState(winterTheme);

  return <Context.Provider value={{}}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
