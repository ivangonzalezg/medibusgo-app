import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import chat from "../../assets/icons/chat.png";
import vehicle from "../../assets/images/vehicle.png";
import translate from "../../translate";
import colors from "../../constants/colors";

const OnTheWay = props => {
  const { plate } = props;

  return (
    <VStack>
      <HStack alignItems="flex-start" space={5} mb={5}>
        <Text flex={1} fontSize="xl">
          {translate.t("onTheWay.transportGoesToLocation")}
        </Text>
        <Button size="sm">
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
            <Text>{translate.t("onTheWay.vehicleType")}</Text>
            <Text fontSize="xl">{plate}</Text>
            <Text fontSize="lg" color={colors.lighterText}>
              {translate.t("onTheWay.plate")}
            </Text>
          </VStack>
        </HStack>
        <VStack space={3}>
          <Text>{translate.t("onTheWay.arriveIn")}</Text>
          <VStack
            w={70}
            h={70}
            backgroundColor={colors.titleText}
            borderRadius="full"
            alignItems="center"
            justifyContent="center">
            <Text color="white">4</Text>
            <Text color="white">min</Text>
          </VStack>
        </VStack>
      </HStack>
      <Divider />
      <VStack my={5} space={3}>
        <HStack space={3}>
          <Text minW={140}>{translate.t("onTheWay.tripType")}</Text>
          <Text color={colors.lighterText}>
            {translate.t("onTheWay.roundTrip")}
          </Text>
        </HStack>
        <HStack space={3}>
          <Text minW={140}>{translate.t("onTheWay.paymentMethod")}</Text>
          <Text color={colors.lighterText}>
            {translate.t("onTheWay.creditCard")}
          </Text>
        </HStack>
      </VStack>
      <Divider />
      <Pressable alignItems="center" mt={3}>
        <Text color={colors.cancel}>{translate.t("onTheWay.cancel")}</Text>
      </Pressable>
    </VStack>
  );
};

OnTheWay.propTypes = {
  plate: PropTypes.string.isRequired,
};

export default OnTheWay;
