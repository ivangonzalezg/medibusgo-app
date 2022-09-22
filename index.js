/**
 * @format
 */

import React from "react";
import { AppRegistry, Platform } from "react-native";
import { extendTheme, NativeBaseProvider } from "native-base";
import App from "./src/App";
import { name as appName } from "./app.json";
import colors from "./src/constants/colors";

const Root = () => {
  return (
    <NativeBaseProvider
      theme={extendTheme({
        config: { initialColorMode: "light" },
        components: {
          Pressable: {
            defaultProps: {
              _pressed: { opacity: 80 },
              _disabled: { opacity: 50 },
            },
          },
          Text: {
            defaultProps: { fontSize: "md" },
          },
          Switch: {
            defaultProps: { size: Platform.OS === "ios" ? "sm" : "md" },
          },
          Button: {
            defaultProps: {
              size: "lg",
              backgroundColor: colors.primary,
              borderRadius: 8,
              _pressed: { opacity: 80 },
              _disabled: { opacity: 50 },
            },
          },
          Heading: {
            defaultProps: { color: colors.titleText, fontSize: "2xl" },
          },
          Input: {
            defaultProps: {
              variant: "unstyled",
              size: "lg",
              borderRadius: "sm",
              backgroundColor: "muted.100",
              color: colors.inputText,
              placeholderTextColor: colors.lighterText,
            },
          },
          TextArea: {
            defaultProps: {
              variant: "unstyled",
              size: "lg",
              borderRadius: "sm",
              backgroundColor: "muted.100",
              color: colors.inputText,
              placeholderTextColor: colors.lighterText,
            },
          },
          Image: {
            defaultProps: {
              resizeMode: "contain",
            },
          },
          ScrollView: {
            defaultProps: {
              showsVerticalScrollIndicator: false,
              keyboardShouldPersistTaps: "handled",
            },
          },
        },
      })}>
      <App />
    </NativeBaseProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
