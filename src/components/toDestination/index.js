import React from "react";
import PropTypes from "prop-types";
import { HStack, Image, Text, VStack } from "native-base";
import moment from "moment";
import translate from "../../translate";
import colors from "../../constants/colors";
import pin from "../../assets/icons/pin.png";
import location from "../../assets/icons/location.png";

const ToDestination = props => {
  const { origin, destination } = props;

  return (
    <VStack px={5} pt={5} pb={3}>
      <Text fontSize="xl" mb={5}>
        {translate.t("toDestination.inTheWay")}
      </Text>
      <HStack space={3} mb={5}>
        <Text flex={1} color={colors.lightText}>
          {translate.t("toDestination.youWillArriveAt")}
        </Text>
        <Text fontSize="3xl">{moment().format("h:mm A")}</Text>
      </HStack>
      <HStack space={2} mb={3}>
        <Image w={5} h={5} source={pin} alt="pin" />
        <Text flex={1}>{origin}</Text>
      </HStack>
      <HStack space={2}>
        <Image w={5} h={5} source={location} alt="location" />
        <Text flex={1}>{destination}</Text>
      </HStack>
    </VStack>
  );
};

ToDestination.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};

export default ToDestination;
