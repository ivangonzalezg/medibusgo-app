import React, { useContext, useRef, useState } from "react";
import {
  Button,
  Heading,
  HStack,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import translate from "../../translate";
import { getCountryFlag, validateCountryFlag } from "../../utils";
import colors from "../../constants/colors";
import routes from "../../routes";
import Container from "../../components/container";
import { LoaderContext } from "../../contexts";

const SignUp = () => {
  const navigation = useNavigation();
  const loader = useContext(LoaderContext);
  const phoneInput = useRef();
  const [countryCode, setCountryCode] = useState("1");
  const [phone, setPhone] = useState("");

  const countryFlag = getCountryFlag(countryCode);

  const isCountryFlag = validateCountryFlag(countryFlag);

  const isDisabled = !isCountryFlag || phone.length < 7;

  const onEnter = async () => {
    try {
      if (isDisabled) {
        return;
      }
      loader.show();
      // TODO Send message with code to user phone number
      await new Promise(resolve => setTimeout(resolve, 2000));
      loader.hide();
      navigation.navigate(routes.signUpVerification, {
        countryCode,
        phone,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // HACK: 2025550153

  return (
    <Container>
      <VStack px={5} flex={1}>
        <ScrollView>
          <VStack pt={10}>
            <Heading mb={10}>{translate.t("signUp.title")}</Heading>
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
                onSubmitEditing={() =>
                  isCountryFlag && phoneInput.current.focus()
                }
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
          </VStack>
        </ScrollView>
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
