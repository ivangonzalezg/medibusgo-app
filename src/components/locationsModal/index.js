import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Animated, Modal, Platform, SafeAreaView } from "react-native";
import {
  Box,
  Button,
  FlatList,
  HStack,
  Image,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import translate from "../../translate";
import pin from "../../assets/icons/pin.png";
import location from "../../assets/icons/location.png";
import useKeyboard from "../../hooks/useKeyboard";
import constants from "../../constants";
import Suggestion from "../suggestion";
import colors from "../../constants/colors";

const LocationsModal = props => {
  const { visible, onRequestClose, onContinue } = props;
  const insets = useSafeAreaInsets();
  const { isKeyboardVisible } = useKeyboard();
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: isKeyboardVisible ? 12 : 0,
      useNativeDriver: false,
      duration: 250,
    }).start();
  }, [isKeyboardVisible]);

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding" })}
        flex={1}>
        <Box flex={1} position="relative">
          <Pressable
            position="absolute"
            width="100%"
            height="100%"
            bg="black"
            opacity={60}
            onPress={onRequestClose}
            zIndex={1}
            _pressed={{ opacity: 60 }}
          />
          <Box
            flex={1}
            zIndex={2}
            mt={`${insets.top + 20}px`}
            px={5}
            pt={8}
            bg="white"
            borderTopRadius={25}>
            <SafeAreaView style={styles.safeAreaView}>
              <VStack flex={1}>
                <HStack alignItems="center" mb={5}>
                  <Image
                    w={25}
                    h={25}
                    resizeMode="contain"
                    source={pin}
                    alt="pin"
                  />
                  <Input
                    flex={1}
                    ml={4}
                    px={4}
                    py={3}
                    placeholder={translate.t("locationsModal.fromWhere")}
                  />
                </HStack>
                <HStack alignItems="center" mb={5}>
                  <Image
                    w={25}
                    h={25}
                    resizeMode="contain"
                    source={location}
                    alt="location"
                  />
                  <Input
                    flex={1}
                    ml={4}
                    px={4}
                    py={3}
                    placeholder={translate.t("locationsModal.whereAreYouGoing")}
                  />
                </HStack>
                <Text color={colors.lighterText} mb={3}>
                  {translate.t("locationsModal.suggestions")}
                </Text>
                <FlatList
                  keyboardShouldPersistTaps="handled"
                  data={constants.suggestions.slice(0, 3)}
                  renderItem={({ item }) => (
                    <Pressable onPress={onContinue}>
                      <Suggestion item={item} />
                    </Pressable>
                  )}
                  ItemSeparatorComponent={() => <Box h={3} />}
                />
              </VStack>
              <Button mt={3} onPress={onContinue}>
                {translate.t("locationsModal.continue")}
              </Button>
              <Animated.View style={{ height }} />
            </SafeAreaView>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </Modal>
  );
};

LocationsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default LocationsModal;
