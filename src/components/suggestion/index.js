import React from "react";
import PropTypes from "prop-types";
import { HStack, Image, Text, VStack } from "native-base";
import colors from "../../constants/colors";
import health from "../../assets/icons/health.png";
import arrowRight from "../../assets/icons/arrow-right.png";

const Suggestion = props => {
  const { item } = props;

  return (
    <HStack alignItems="center">
      <Image w={35} h={35} resizeMode="contain" source={health} alt="health" />
      <VStack mx={3} flex={1}>
        <Text color={colors.titleText} numberOfLines={1}>
          {item.name}
        </Text>
        <Text color={colors.lighterText} numberOfLines={1}>
          {item.address}
        </Text>
      </VStack>
      <Image
        w={6}
        h={6}
        resizeMode="contain"
        source={arrowRight}
        alt="arrowRight"
      />
    </HStack>
  );
};

Suggestion.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Suggestion;
