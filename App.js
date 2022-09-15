import React, { useEffect, useState } from "react";
import { Text, StatusBar, View, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text>App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default App;
