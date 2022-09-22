import React, { useState } from "react";
import { Button, Heading, Input, ScrollView, Text, VStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "../../components/container";
import translate from "../../translate";
import colors from "../../constants/colors";
import routes from "../../routes";

const SignUpVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [verificationCode, setVerificationCode] = useState("");

  const isDisabled = verificationCode.length < 4;

  const onEnter = () =>
    !isDisabled &&
    navigation.navigate(routes.signUpAccount, {
      ...route.params,
      verificationCode,
    });

  return (
    <Container>
      <VStack px={5} flex={1}>
        <ScrollView>
          <VStack pt={10}>
            <Heading mb={5}>{translate.t("signUpVerification.title")}</Heading>
            <Text fontSize="sm" mb={2}>
              {translate.t("signUpVerification.weSendItTo", route.params)}
            </Text>
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
            />
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
