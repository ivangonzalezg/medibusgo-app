import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Animated, Modal, Platform, SafeAreaView } from "react-native";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import useKeyboard from "../../hooks/useKeyboard";
import translate from "../../translate";
import card from "../../assets/icons/card.png";

const AddCardModal = props => {
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
              <ScrollView>
                <HStack mb={10}>
                  <Heading color="black" flex={1}>
                    {translate.t("addCardModal.title")}
                  </Heading>
                  <Image w={65} h={45} source={card} alt="card" />
                </HStack>
                <Text mb={2}>{translate.t("addCardModal.cardNumber")}</Text>
                <Input px={4} py={3} mb={5} placeholder="4242424242424242" />
                <HStack space={5}>
                  <VStack flex={1}>
                    <Text mb={2}>
                      {translate.t("addCardModal.expirationDate")}
                    </Text>
                    <Input px={4} py={3} placeholder="MM/YY" />
                  </VStack>
                  <VStack flex={1}>
                    <Text mb={2}>
                      {translate.t("addCardModal.securityNumber")}
                    </Text>
                    <Input px={4} py={3} placeholder="CVV" />
                  </VStack>
                </HStack>
              </ScrollView>
              <Button mt={3} onPress={onContinue}>
                {translate.t("addCardModal.addCard")}
              </Button>
              <Animated.View style={{ height }} />
            </SafeAreaView>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </Modal>
  );
};

AddCardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default AddCardModal;
