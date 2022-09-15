import React from "react";
import PropTypes from "prop-types";
import { Platform, SafeAreaView } from "react-native";
import { KeyboardAvoidingView, ScrollView } from "native-base";
import styles from "./styles";

const Container = props => {
  const { children } = props;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding" })}
        flex={1}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollView}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

Container.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Container;
