import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import SplashScreen from "react-native-splash-screen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initialLoader,
  initialState,
  LoaderContext,
  loaderReducer,
  StateContext,
  stateReducer,
} from "./contexts";
import {
  BOOKINGS,
  HIDE,
  IS_LOGGED_IN,
  IS_TRIP_IN_PROGRESS,
  SESSION_TOKEN,
  SHOW,
  TRIPS,
  TRIP_IN_PROGRESS,
  USER,
} from "./constants";
import routes from "./routes";
import Loader from "./components/loader";

import Test from "./screens/test";
import Initial from "./screens/initial";
import SignUp from "./screens/signUp";
import colors from "./constants/colors";
import signUpVerification from "./screens/signUpVerification";
import SignUpAccount from "./screens/signUpAccount";
import SignUpPassword from "./screens/signUpPassword";
import SignUpSpecialNeeds from "./screens/signUpSpecialNeeds";
import SignIn from "./screens/signIn";
import Home from "./screens/home";
import TripSchedule from "./screens/tripSchedule";
import Subscription from "./screens/subscription";
import SubscriptionConfirmation from "./screens/subscriptionConfirmation";
import TripDetails from "./screens/tripDetails";
import TripInProgress from "./screens/tripInProgress";
import TripInProgressChat from "./screens/tripInProgressChat";

const Stack = createNativeStackNavigator();

const Root = () => {
  const state = useContext(StateContext);

  if (!state.isLoggedIn) {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={routes.initial}>
        <Stack.Screen name={routes.initial} component={Initial} />
        <Stack.Screen name={routes.signUp} component={SignUp} />
        <Stack.Screen
          name={routes.signUpVerification}
          component={signUpVerification}
        />
        <Stack.Screen name={routes.signUpAccount} component={SignUpAccount} />
        <Stack.Screen name={routes.signUpPassword} component={SignUpPassword} />
        <Stack.Screen
          name={routes.signUpSpecialNeeds}
          component={SignUpSpecialNeeds}
        />
        <Stack.Screen name={routes.signIn} component={SignIn} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.home}>
      <Stack.Screen name={routes.home} component={Home} />
      <Stack.Screen name={routes.tripSchedule} component={TripSchedule} />
      <Stack.Screen name={routes.subscription} component={Subscription} />
      <Stack.Screen
        name={routes.subscriptionConfirmation}
        component={SubscriptionConfirmation}
      />
      <Stack.Screen name={routes.tripDetails} component={TripDetails} />
      <Stack.Screen name={routes.tripInProgress} component={TripInProgress} />
      <Stack.Screen
        name={routes.tripInProgressChat}
        component={TripInProgressChat}
      />
      <Stack.Screen name={routes.test} component={Test} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [state, dispatchState] = useReducer(stateReducer, initialState);
  const [loader, dispatchLoader] = useReducer(loaderReducer, initialLoader);
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

  const loaderContext = useMemo(
    () => ({
      show: (message = "") => dispatchLoader({ type: SHOW, message }),
      hide: () => dispatchLoader({ type: HIDE }),
    }),
    [],
  );

  useEffect(() => {
    if (!isSplashScreen) {
      SplashScreen.hide();
    }
  }, [isSplashScreen]);

  const initializeApp = async () => {
    try {
      const sessionToken = await AsyncStorage.getItem(SESSION_TOKEN);
      const user = await AsyncStorage.getItem(USER);
      if (sessionToken) {
        dispatchState({ type: SESSION_TOKEN, sessionToken });
        dispatchState({ type: USER, user: JSON.parse(user) });
        dispatchState({ type: IS_LOGGED_IN, isLoggedIn: true });
      }
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
      <LoaderContext.Provider value={loaderContext}>
        <StateContext.Provider value={stateContext}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <Root />
          <Loader visible={loader.visible} message={loader.message} />
        </StateContext.Provider>
      </LoaderContext.Provider>
    </NavigationContainer>
  );
};

export default App;
