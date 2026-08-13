"use client";
import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const Context = createContext();

function Provider({ children }) {
  //
  // Decides true if we are currently transitioning page's and animating as such
  const [transition, setTransition] = useState(true);
  //
  // Decides weather the nav bar is open or not
  const [navOpen, setNavOpen] = useState(false);
  //
  // Decides what page when need to nav to when transitioning
  const [navPage, setNavPage] = useState("/");

  return (
    <Context.Provider
      value={{
        transition: transition,
        setTransition: setTransition,
        navOpen: navOpen,
        setNavOpen: setNavOpen,
        navPage: navPage,
        setNavPage: setNavPage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
