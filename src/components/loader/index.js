import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { BackHandler, Keyboard, Platform } from "react-native";
import { Center, Spinner, Text, VStack } from "native-base";

const Loader = props => {
  const { visible, message } = props;

  useEffect(() => {
    if (visible) {
      Keyboard.dismiss();
    }
    if (Platform.OS === "android") {
      const backListener = BackHandler.addEventListener(
        "hardwareBackPress",
        () => visible,
      );
      return () => {
        backListener.remove();
      };
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Center
      position="absolute"
      w="100%"
      h="100%"
      backgroundColor="rgba(0,0,0,0.3)"
      zIndex={9999}>
      <VStack
        px={10}
        pt={10}
        pb={message ? 0 : 10}
        mx={10}
        bg="gray.700"
        borderRadius="lg"
        space={3}>
        <Spinner color="white" size="lg" />
        {Boolean(message) && (
          <Text color="white" opacity={80} mb={7} textAlign="center">
            {message}
          </Text>
        )}
      </VStack>
    </Center>
  );
};

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

export default Loader;
