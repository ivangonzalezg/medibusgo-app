import React from "react";
import PropTypes from "prop-types";
import { Modal, Platform, SafeAreaView } from "react-native";
import {
  Box,
  Heading,
  HStack,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  VStack,
  CloseIcon,
} from "native-base";
import styles from "./styles";
import ambulance from "../../assets/images/ambulance.png";
import planMinubus from "../../assets/images/plan-minubus.png";
import planAmbulance from "../../assets/images/plan-ambulance.png";
import translate from "../../translate";
import colors from "../../constants/colors";

const InviteToSubscribeModal = props => {
  const { visible, onClose, onContinue } = props;

  return (
    <Modal transparent animationType="none" visible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding" })}
        flex={1}>
        <HStack flex={1} position="relative" justifyContent="center">
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
                <VStack p={10} alignItems="center" position="relative">
                  <Pressable
                    position="absolute"
                    zIndex={1}
                    top={5}
                    right={5}
                    onPress={onClose}>
                    <CloseIcon size={5} />
                  </Pressable>
                  <Image
                    w={150}
                    h={150}
                    source={ambulance}
                    alt="ambulance"
                    mb={10}
                  />
                  <Heading textAlign="center" mb={5}>
                    {translate.t("inviteToSubscribeModal.title")}
                  </Heading>
                  <Text textAlign="center" mb={5}>
                    {translate.t("inviteToSubscribeModal.description")}
                  </Text>
                  <HStack w="full" space={3}>
                    <Pressable
                      flex={1}
                      backgroundColor="white"
                      borderRadius="sm"
                      onPress={onContinue}>
                      <VStack p={2} alignItems="center">
                        <Image
                          w={60}
                          h={60}
                          source={planMinubus}
                          alt="plan-minubus"
                        />
                        <Text color={colors.primary}>
                          {translate.t("inviteToSubscribeModal.normalTrip")}
                        </Text>
                        <Text color={colors.primary}>$50</Text>
                      </VStack>
                    </Pressable>
                    <Pressable
                      flex={1}
                      backgroundColor={colors.primary}
                      borderRadius="sm"
                      onPress={onContinue}>
                      <VStack p={2} alignItems="center">
                        <Image
                          w={60}
                          h={60}
                          source={planAmbulance}
                          alt="plan-ambulance"
                        />
                        <Text color="white">
                          {translate.t("inviteToSubscribeModal.monthlyPlan")}
                        </Text>
                        <Text color="white">$500</Text>
                      </VStack>
                    </Pressable>
                  </HStack>
                </VStack>
              </ScrollView>
            </Box>
          </SafeAreaView>
        </HStack>
      </KeyboardAvoidingView>
    </Modal>
  );
};

InviteToSubscribeModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default InviteToSubscribeModal;
