import React from "react";
import PropTypes from "prop-types";
import { Platform, SafeAreaView } from "react-native";
import { KeyboardAvoidingView } from "native-base";
import styles from "./styles";

const Container = props => {
  const { children } = props;

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding" })}
      flex={1}>
      <SafeAreaView style={styles.safeAreaView}>{children}</SafeAreaView>
    </KeyboardAvoidingView>
  );
};

Container.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Container;
