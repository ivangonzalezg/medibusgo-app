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
  Spinner,
  Text,
  VStack,
} from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import translate from "../../translate";
import pin from "../../assets/icons/pin.png";
import location from "../../assets/icons/location.png";
import useKeyboard from "../../hooks/useKeyboard";
import Suggestion from "../suggestion";
import colors from "../../constants/colors";

const LocationsModal = props => {
  const {
    visible,
    onRequestClose,
    onContinue,
    originSuggestions,
    destinationSuggestions,
    origin,
    destination,
    onSearchOrigin,
    onSelectOrigin,
    onSelectDestination,
  } = props;
  const insets = useSafeAreaInsets();
  const { isKeyboardVisible } = useKeyboard();
  const [height] = useState(new Animated.Value(0));
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState(false);
  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");

  useEffect(() => {
    Animated.timing(height, {
      toValue: isKeyboardVisible ? 12 : 0,
      useNativeDriver: false,
      duration: 250,
    }).start();
  }, [isKeyboardVisible]);

  useEffect(() => {
    setOriginName(origin?.nombre || "");
  }, [origin]);

  useEffect(() => {
    setDestinationName(destination?.nombre || "");
  }, [destination]);

  useEffect(() => {
    const timeout = setTimeout(() => onSearchOrigin(originName), 500);
    return () => clearTimeout(timeout);
  }, [originName]);

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
            opacity={40}
            onPress={onRequestClose}
            zIndex={1}
            _pressed={{ opacity: 40 }}
          />
          <Box
            flex={1}
            zIndex={2}
            mt={`${insets.top + 40}px`}
            px={5}
            pt={8}
            bg="white"
            borderTopRadius={25}>
            <SafeAreaView style={styles.safeAreaView}>
              <VStack flex={1}>
                <HStack mb={5}>
                  <Image w={25} h={25} source={pin} alt="pin" />
                  <Input
                    flex={1}
                    ml={4}
                    px={4}
                    py={3}
                    returnKeyType="search"
                    placeholder={translate.t("locationsModal.fromWhere")}
                    value={originName}
                    onChangeText={setOriginName}
                    onFocus={() => {
                      setShowOriginSuggestions(true);
                      setShowDestinationSuggestions(false);
                    }}
                    onBlur={() => setShowOriginSuggestions(false)}
                  />
                </HStack>
                <HStack mb={5}>
                  <Image w={25} h={25} source={location} alt="location" />
                  <Input
                    flex={1}
                    ml={4}
                    px={4}
                    py={3}
                    returnKeyType="search"
                    placeholder={translate.t("locationsModal.whereAreYouGoing")}
                    value={destinationName}
                    onChangeText={setDestinationName}
                    onFocus={() => {
                      setShowOriginSuggestions(false);
                      setShowDestinationSuggestions(true);
                    }}
                    onBlur={() => setShowDestinationSuggestions(false)}
                  />
                </HStack>
                {(showOriginSuggestions || showDestinationSuggestions) && (
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={
                      showOriginSuggestions
                        ? originSuggestions
                        : destinationSuggestions
                    }
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => {
                          if (showOriginSuggestions) {
                            onSelectOrigin(item);
                          } else {
                            onSelectDestination(item);
                          }
                          setShowOriginSuggestions(false);
                          setShowDestinationSuggestions(false);
                        }}>
                        <Suggestion name={item.nombre} />
                      </Pressable>
                    )}
                    ItemSeparatorComponent={() => <Box h={3} />}
                    ListHeaderComponent={() => (
                      <Text color={colors.lighterText} mb={3}>
                        {translate.t("locationsModal.suggestions")}
                      </Text>
                    )}
                    ListEmptyComponent={Spinner}
                  />
                )}
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
  originSuggestions: PropTypes.array,
  destinationSuggestions: PropTypes.array,
  origin: PropTypes.object,
  destination: PropTypes.object,
  onSearchOrigin: PropTypes.func,
  onSelectOrigin: PropTypes.func,
  onSelectDestination: PropTypes.func,
};

LocationsModal.defaultProps = {
  originSuggestions: [],
  destinationSuggestions: [],
  origin: {},
  destination: {},
  onSearchOrigin: () => {},
  onSelectOrigin: () => {},
  onSelectDestination: () => {},
};

export default LocationsModal;
