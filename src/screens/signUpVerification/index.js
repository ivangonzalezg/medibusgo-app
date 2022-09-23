import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Text,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "../../components/container";
import translate from "../../translate";
import colors from "../../constants/colors";
import routes from "../../routes";
import { LoaderContext } from "../../contexts";

const SignUpVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const loader = useContext(LoaderContext);
  const [verificationCode, setVerificationCode] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setIsInvalid(false);
  }, [verificationCode]);

  const isDisabled = verificationCode.length < 4;

  const onEnter = async () => {
    try {
      if (isDisabled) {
        return;
      }
      loader.show();
      // TODO Validate code
      await new Promise(resolve => setTimeout(resolve, 1000));
      loader.hide();
      if (verificationCode !== "1234") {
        setIsInvalid(true);
        return;
      }
      navigation.navigate(routes.signUpAccount, {
        ...route.params,
        verificationCode,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <VStack px={5} flex={1}>
        <ScrollView>
          <VStack pt={10}>
            <Heading mb={5}>{translate.t("signUpVerification.title")}</Heading>
            <Text fontSize="sm" mb={2}>
              {translate.t("signUpVerification.weSendItTo", route.params)}
            </Text>
            <FormControl isInvalid={isInvalid}>
              <Input
                textContentType="oneTimeCode"
                keyboardType="number-pad"
                placeholder={translate.t("signUpVerification.verificationCode")}
                px={5}
                py={4}
                value={verificationCode}
                onChangeText={text =>
                  setVerificationCode(text?.replace(/[^0-9]/g, ""))
                }
                returnKeyType="done"
                onSubmitEditing={onEnter}
                borderWidth={1}
                borderColor={isInvalid ? "error.600" : "transparent"}
                color={isInvalid ? "error.600" : colors.inputText}
                _focus={{ borderColor: "transparent" }}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                <Text>{translate.t("signUpVerification.invalidCode")}</Text>
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
        </ScrollView>
        <Text color={colors.lighterText} fontSize="sm" textAlign="center">
          {translate.t("signUpVerification.typeTheCodeSent")}
        </Text>
        <Button my={5} disabled={isDisabled} onPress={onEnter}>
          {translate.t("signUpVerification.enter")}
        </Button>
      </VStack>
    </Container>
  );
};

export default SignUpVerification;
