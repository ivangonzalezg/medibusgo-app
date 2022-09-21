import React from "react";
import PropTypes from "prop-types";
import { Modal, Platform, SafeAreaView } from "react-native";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import styles from "./styles";
import check from "../../assets/icons/check.png";
import card from "../../assets/icons/card.png";
import translate from "../../translate";

const BookingConfirmationModal = props => {
  const { visible, onContinue } = props;

  return (
    <Modal transparent animationType="none" visible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding" })}
        flex={1}>
        <HStack
          flex={1}
          position="relative"
          alignItems="center"
          justifyContent="center">
          <Box
            position="absolute"
            width="100%"
            height="100%"
            bg="black"
            opacity={40}
            zIndex={1}
          />
          <SafeAreaView style={styles.safeAreaView}>
            <Box mx={4} bg="white" borderRadius="sm">
              <ScrollView>
                <VStack m={10} alignItems="center">
                  <Image w={20} h={20} source={check} alt="check" mb={10} />
                  <Heading textAlign="center" mb={5}>
                    {translate.t("bookingConfirmationModal.title")}
                  </Heading>
                  <Text textAlign="center">
                    {translate.t("bookingConfirmationModal.description")}
                  </Text>
                  <HStack my={10} w="full" alignItems="center" space={2}>
                    <Image w={5} h={5} source={card} alt="card" />
                    <Text flex={1} fontSize="sm">
                      Master card •••• 6089
                    </Text>
                    <Text>$50 USD</Text>
                  </HStack>
                  <Button w="full" onPress={onContinue}>
                    {translate.t("bookingConfirmationModal.continue")}
                  </Button>
                </VStack>
              </ScrollView>
            </Box>
          </SafeAreaView>
        </HStack>
      </KeyboardAvoidingView>
    </Modal>
  );
};

BookingConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default BookingConfirmationModal;
