// import { createContext } from "react";

// const DarkModeContext = createContext();

// export default DarkModeContext;

import React, { useReducer, createContext } from "react";

export const UserContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        user: action.payload,
      };
    case "SET_USER_INFO":
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};