import React from "react";
import PropTypes from "prop-types";
import { HStack, Image, Text, VStack } from "native-base";
import colors from "../../constants/colors";
import health from "../../assets/icons/health.png";
import arrowRight from "../../assets/icons/arrow-right.png";

const Suggestion = props => {
  const { name, address } = props;

  return (
    <HStack>
      <Image w={35} h={35} source={health} alt="health" />
      <VStack mx={3} flex={1}>
        <Text color={colors.titleText}>{name}</Text>
        {Boolean(address) && <Text color={colors.lighterText}>{address}</Text>}
      </VStack>
      <Image w={6} h={6} source={arrowRight} alt="arrowRight" />
    </HStack>
  );
};

Suggestion.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
};

Suggestion.defaultProps = {
  name: "",
  address: "",
};

export default Suggestion;
