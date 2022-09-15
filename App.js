import React, { useEffect, useState } from "react";
import { Box, StatusBar, Text } from "native-base";
import SplashScreen from "react-native-splash-screen";

const App = () => {
  const [isSplashScreen, setIsSplashScreen] = useState(true);

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
    <Box flex={1}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text>App</Text>
    </Box>
  );
};

export default App;
