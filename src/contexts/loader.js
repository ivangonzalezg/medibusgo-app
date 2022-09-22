import { createContext } from "react";
import { SHOW, HIDE } from "../constants";

const initialLoader = {
  visible: false,
  show: () => {},
  hide: () => {},
};

const LoaderContext = createContext(initialLoader);

const loaderReducer = (prevState, action) => {
  switch (action.type) {
    case SHOW:
      return {
        visible: true,
      };
    case HIDE:
      return {
        visible: false,
      };
    default:
      return prevState;
  }
};

export { initialLoader, LoaderContext, loaderReducer };
