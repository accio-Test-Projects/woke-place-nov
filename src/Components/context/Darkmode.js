// import { createContext } from "react";

// const DarkModeContext = createContext();

// export default DarkModeContext;

import React, { useReducer, createContext } from "react";

export const DarkmodeContext = createContext();

const initialState = {
  darkMode: JSON.parse(localStorage.getItem('mode')) || false
}

const reducer = (state, action) => {
  switch (action.type) {
    case "Make_dark":
      localStorage.setItem('mode', true)
      return {
        darkMode: true,
      };
    case "Make_light":
      localStorage.setItem('mode', false)
      return {
        darkMode: false,
      };
    default:
      throw new Error();
  }
};

export const DarkModeContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DarkmodeContext.Provider value={[state, dispatch]}>
      {props.children}
    </DarkmodeContext.Provider>
  );
};