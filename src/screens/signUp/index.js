import React, { useRef, useState } from "react";
import { Box, Button, Heading, HStack, Input, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import translate from "../../translate";
import { getCountryFlag, validateCountryFlag } from "../../utils";
import colors from "../../constants/colors";
import routes from "../../routes";
import Container from "../../components/container";

const SignUp = () => {
  const navigation = useNavigation();
  const phoneInput = useRef();
  const [countryCode, setCountryCode] = useState("52");
  const [phone, setPhone] = useState("");

  const countryFlag = getCountryFlag(countryCode);

  const isCountryFlag = validateCountryFlag(countryFlag);

  const isDisabled = !isCountryFlag || phone.length < 7;

  const onEnter = () =>
    !isDisabled &&
    navigation.navigate(routes.signUpVerification, {
      countryCode,
      phone,
    });

  return (
    <Container>
      <VStack pt={10} px={5} flex={1}>
        <Heading fontSize="2xl" mb={10}>
          {translate.t("signUp.title")}
        </Heading>
        <Text fontSize="xs" mb={2}>
          {translate.t("signUp.prefix")}
        </Text>
        <HStack space={5}>
          <Input
            keyboardType="number-pad"
            placeholder="52"
            minWidth={100}
            maxLength={3}
            py={4}
            pl={1}
            InputLeftElement={<Text ml={3}>{countryFlag} +</Text>}
            value={countryCode}
            onChangeText={setCountryCode}
            returnKeyType="done"
            onSubmitEditing={() => isCountryFlag && phoneInput.current.focus()}
          />
          <Input
            ref={phoneInput}
            keyboardType="number-pad"
            placeholder={translate.t("signUp.phone")}
            flex={1}
            px={5}
            py={4}
            value={phone}
            onChangeText={text => setPhone(text?.replace(/[^0-9]/g, ""))}
            returnKeyType="done"
            onSubmitEditing={onEnter}
          />
        </HStack>
        <Box flex={1} />
        <Text color={colors.lighterText} fontSize="sm" textAlign="center">
          {translate.t("signUp.continueToConfirm")}
        </Text>
        <Button my={5} disabled={isDisabled} onPress={onEnter}>
          {translate.t("signUp.enter")}
        </Button>
      </VStack>
    </Container>
  );
};

export default SignUp;
