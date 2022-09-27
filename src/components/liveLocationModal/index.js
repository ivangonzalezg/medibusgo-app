import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-native";
import {
  Box,
  Button,
  Image,
  Pressable,
  Text,
  VStack,
  CloseIcon,
} from "native-base";
import liveLocation from "../../assets/icons/live-location.png";
import translate from "../../translate";
import colors from "../../constants/colors";

const LiveLocationModal = props => {
  const { visible, onRequestClose, onShare } = props;

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={onRequestClose}>
      <VStack flex={1} position="relative" justifyContent="flex-end">
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
        <VStack
          space={5}
          zIndex={2}
          safeAreaBottom
          px={5}
          pt={5}
          pb={3}
          bg="white"
          borderTopRadius={25}
          position="relative">
          <Pressable
            position="absolute"
            top={5}
            right={5}
            bg="muted.100"
            p={2}
            borderRadius="full"
            onPress={onRequestClose}>
            <CloseIcon />
          </Pressable>
          <Box
            p={5}
            backgroundColor={colors.primaryDark}
            borderRadius="full"
            shadow={2}
            alignSelf="center">
            <Image
              w={20}
              h={20}
              source={liveLocation}
              alt="liveLocation"
              tintColor="white"
            />
          </Box>
          <Text fontSize="xl" textAlign="center">
            {translate.t("liveLocationModal.title")}
          </Text>
          <Text fontSize="lg" textAlign="center">
            {translate.t("liveLocationModal.subtitle")}
          </Text>
          <Button onPress={onShare}>
            {translate.t("liveLocationModal.share")}
          </Button>
        </VStack>
      </VStack>
    </Modal>
  );
};

LiveLocationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
};

export default LiveLocationModal;
