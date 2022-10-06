import React from "react";
import PropTypes from "prop-types";
import { Button, HStack, Image, Text, VStack } from "native-base";
import chat from "../../assets/icons/chat.png";
import vehicle from "../../assets/images/vehicle.png";
import translate from "../../translate";
import colors from "../../constants/colors";

const InLocation = props => {
  const { plate, isUserReady, onUserReady, onOpenChat } = props;

  return (
    <VStack px={5} pt={5} pb={3}>
      <HStack alignItems="flex-start" space={5} mb={5}>
        <Text flex={1} fontSize="xl">
          {translate.t("inLocation.transportHasArrived")}
        </Text>
        <Button size="sm" onPress={onOpenChat}>
          <HStack space={2}>
            <Image w={4} h={4} source={chat} alt="chat" />
            <Text color="white">Chat</Text>
          </HStack>
        </Button>
      </HStack>
      <HStack mb={5}>
        <HStack flex={1} space={10}>
          <Image w={20} h={20} source={vehicle} alt="vehicle" />
          <VStack>
            <Text>{translate.t("inLocation.vehicleType")}</Text>
            <Text fontSize="xl">{plate}</Text>
            <Text fontSize="lg" color={colors.lighterText}>
              {translate.t("inLocation.plate")}
            </Text>
          </VStack>
        </HStack>
        <VStack space={3}>
          <Text>{translate.t("inLocation.arriveIn")}</Text>
          <VStack
            w={70}
            h={70}
            backgroundColor={colors.titleText}
            borderRadius="full"
            alignItems="center"
            justifyContent="center"
            overflow="hidden">
            <Text color="white" fontSize="sm" textAlign="center">
              {translate.t("inLocation.hasArrived")}
            </Text>
          </VStack>
        </VStack>
      </HStack>
      <Text textAlign="center" fontSize="xl">
        {translate.t("inLocation.assistantOnTheWay")}
      </Text>
      {!isUserReady && (
        <Button mt={5} onPress={onUserReady}>
          {translate.t("inLocation.imReady")}
        </Button>
      )}
    </VStack>
  );
};

InLocation.propTypes = {
  plate: PropTypes.string.isRequired,
  isUserReady: PropTypes.bool.isRequired,
  onUserReady: PropTypes.func.isRequired,
  onOpenChat: PropTypes.func.isRequired,
};

export default InLocation;
