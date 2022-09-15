/**
 * @format
 */

import React from "react";
import { AppRegistry, Platform } from "react-native";
import { extendTheme, NativeBaseProvider } from "native-base";
import App from "./src/App";
import { name as appName } from "./app.json";

const Root = () => {
  return (
    <NativeBaseProvider
      theme={extendTheme({
        config: { useSystemColorMode: true },
        components: {
          Pressable: {
            defaultProps: {
              _pressed: { opacity: 70 },
              _disabled: { opacity: 50 },
            },
          },
          Text: {
            defaultProps: { fontSize: "md" },
          },
          Switch: {
            defaultProps: { size: Platform.OS === "ios" ? "sm" : "md" },
          },
        },
      })}>
      <App />
    </NativeBaseProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
