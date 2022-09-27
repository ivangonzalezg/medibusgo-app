import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  USER,
  SESSION_TOKEN,
  IS_LOGGED_IN,
  IS_TRIP_IN_PROGRESS,
  TRIP_IN_PROGRESS,
  TRIPS,
  BOOKINGS,
} from "../constants";

const initialState = {
  user: {
    id: 0,
    primer_nombre: "",
    primer_apellido: "",
    email: "",
    telefono: "",
    user_id: 0,
    nombre_universidad: "",
    id_universidad: 0,
    nombre_usuario: "",
  },
  sessionToken: "",
  isLoggedIn: false,
  isTripInProgress: false,
  tripInProgress: {},
  trips: new Date().getTime(),
  bookings: new Date().getTime(),
};

const StateContext = createContext({
  updateUser: (user = {}) => {},
  updateSessionToken: (sessionToken = "") => {},
  updateIsLoggedIn: (isLoggedIn = false) => {},
  updateIsTripInProgress: (isTripInProgress = false) => {},
  updateTripInProgress: (tripInProgress = {}) => {},
  updateTrips: () => {},
  updateBookings: () => {},
  ...initialState,
});

const stateReducer = (prevState, action) => {
  switch (action.type) {
    case USER:
      AsyncStorage.setItem(USER, JSON.stringify(action.user));
      return {
        ...prevState,
        user: action.user,
      };
    case SESSION_TOKEN:
      AsyncStorage.setItem(SESSION_TOKEN, action.sessionToken);
      return {
        ...prevState,
        sessionToken: action.sessionToken,
      };
    case IS_LOGGED_IN:
      if (action.isLoggedIn) {
        return {
          ...prevState,
          isLoggedIn: true,
        };
      } else {
        AsyncStorage.multiRemove([SESSION_TOKEN, USER]);
        return {
          ...prevState,
          ...initialState,
        };
      }
    case IS_TRIP_IN_PROGRESS:
      return {
        ...prevState,
        isTripInProgress: action.isTripInProgress,
      };
    case TRIP_IN_PROGRESS:
      return {
        ...prevState,
        tripInProgress: action.tripInProgress,
      };
    case TRIPS: {
      return {
        ...prevState,
        trips: new Date().getTime(),
      };
    }
    case BOOKINGS: {
      return {
        ...prevState,
        bookings: new Date().getTime(),
      };
    }
    default:
      return prevState;
  }
};

export { initialState, StateContext, stateReducer };
