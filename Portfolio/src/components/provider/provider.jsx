"use client";
import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const Context = createContext();

function Provider({ children }) {
  //
  // Decides true if we are currently transitioning page's and animating as such
  const [transition, setTransition] = useState(true);

  //
  // Decides what page when need to nav to when transitioning
  const [navPage, setNavPage] = useState("/");

  return (
    <Context.Provider
      value={{
        transition: transition,
        setTransition: setTransition,
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
