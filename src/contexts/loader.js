import { createContext } from "react";
import { SHOW, HIDE } from "../constants";

const initialLoader = {
  visible: false,
  message: "",
  show: (message = "") => {},
  hide: () => {},
};

const LoaderContext = createContext(initialLoader);

const loaderReducer = (prevState, action) => {
  switch (action.type) {
    case SHOW:
      return {
        visible: true,
        message: action.message,
      };
    case HIDE:
      return {
        visible: false,
        message: "",
      };
    default:
      return prevState;
  }
};

export { initialLoader, LoaderContext, loaderReducer };
