import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Box, Button, StatusBar, Text } from "native-base";
import SplashScreen from "react-native-splash-screen";
import { initialState, StateContext, stateReducer } from "./contexts";
import {
  BOOKINGS,
  IS_LOGGED_IN,
  IS_TRIP_IN_PROGRESS,
  SESSION_TOKEN,
  TRIPS,
  TRIP_IN_PROGRESS,
  USER,
} from "./constants";

const Root = () => {
  const state = useContext(StateContext);

  return (
    <Box flex={1} px={5}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text>{JSON.stringify(state, null, 2)}</Text>
      <Box h={5} />
      <Button
        onPress={() =>
          state.updateSessionToken(Math.random().toString(36).slice(2))
        }>
        Update session token
      </Button>
      <Box h={5} />
      <Button onPress={state.updateTrips}>Update trips</Button>
      <Box h={5} />
      <Button onPress={state.updateBookings}>Update bookings</Button>
    </Box>
  );
};

const App = () => {
  const [state, dispatchState] = useReducer(stateReducer, initialState);
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  const stateContext = useMemo(
    () => ({
      updateUser: user => dispatchState({ type: USER, user }),
      updateSessionToken: sessionToken =>
        dispatchState({ type: SESSION_TOKEN, sessionToken }),
      updateIsLoggedIn: isLoggedIn =>
        dispatchState({ type: IS_LOGGED_IN, isLoggedIn }),
      updateIsTripInProgress: isTripInProgress =>
        dispatchState({ type: IS_TRIP_IN_PROGRESS, isTripInProgress }),
      updateTripInProgress: tripInProgress =>
        dispatchState({ type: TRIP_IN_PROGRESS, tripInProgress }),
      updateTrips: () => dispatchState({ type: TRIPS }),
      updateBookings: () => dispatchState({ type: BOOKINGS }),
      ...state,
    }),
    [state],
  );

  useEffect(() => {
    if (!isSplashScreen) {
      SplashScreen.hide();
    }
  }, [isSplashScreen]);

  const initializeApp = async () => {
    try {
      setIsSplashScreen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <StateContext.Provider value={stateContext}>
      <Root />
    </StateContext.Provider>
  );
};

export default App;
