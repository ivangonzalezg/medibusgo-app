import React, { useEffect, useMemo, useReducer, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "native-base";
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
import routes from "./routes";

import Test from "./screens/test";
import Initial from "./screens/initial";
import SignUp from "./screens/signUp";
import colors from "./constants/colors";
import signUpVerification from "./screens/signUpVerification";
import CreateAccount from "./screens/createAccount";

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.createAccount}>
      <Stack.Screen name={routes.initial} component={Initial} />
      <Stack.Screen name={routes.signUp} component={SignUp} />
      <Stack.Screen
        name={routes.signUpVerification}
        component={signUpVerification}
      />
      <Stack.Screen name={routes.createAccount} component={CreateAccount} />
      <Stack.Screen name={routes.test} component={Test} />
    </Stack.Navigator>
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
    <NavigationContainer
      theme={{
        dark: false,
        colors: { ...DefaultTheme.colors, background: colors.white },
      }}>
      <StateContext.Provider value={stateContext}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Root />
      </StateContext.Provider>
    </NavigationContainer>
  );
};

export default App;
