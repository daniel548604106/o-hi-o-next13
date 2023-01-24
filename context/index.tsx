import React, { useState } from "react";
import { User } from "@/interfaces";
import Cookies from "@/lib/cookies";
import { addAxiosToken } from "@/axios";
type State = {
  auth: {
    isLoggedIn: boolean;
    user: User | null;
  };
};

type Action = {
  type: string;
  payload: User | null;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  auth: {
    isLoggedIn: false,
    user:
      typeof window !== "undefined"
        ? localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user") || "")
          : null
        : null,
  },
};

type StateContextProviderProps = { children: React.ReactNode };

const StateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const stateReducer = (state: State, action: Action) => {
  console.log(state, action, "trigger");
  switch (action.type) {
    case "LOGIN": {
      const { accessToken, refreshToken, user } = action.payload || {};
      localStorage.setItem("user", JSON.stringify(user));

      addAxiosToken(accessToken);
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);

      return {
        ...state,
        auth: {
          isLoggedIn: true,
          user,
        },
      };
    }
    case "VALIDATE_TOKEN": {
      const { accessToken, refreshToken } = action.payload;
      // check token , if available , then set login , if not , then refresh token
      console.log(accessToken, "token");

      return {
        ...state,
        auth: { isLoggedIn: true },
      };
    }
    default: {
      return state;
      throw new Error(`Unhandled action type`);
    }
  }
};

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);
  const [theme, setTheme] = useState("light");
  const value = { state, dispatch, theme, setTheme };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

const useStateContext = () => {
  const context = React.useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

export { StateContextProvider, StateContext, useStateContext };
