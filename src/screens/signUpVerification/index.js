import React, { useState } from "react";
import { Box, Button, Heading, Input, Text, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";
import Container from "../../components/container";
import translate from "../../translate";
import colors from "../../constants/colors";

const SignUpVerification = () => {
  const route = useRoute();
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <Container>
      <VStack pt={10} px={5} flex={1}>
        <Heading fontSize="2xl" mb={10}>
          {translate.t("signUpVerification.title")}
        </Heading>
        <Text fontSize="xs" mb={2}>
          {translate.t("signUpVerification.weSendItTo", route.params)}
        </Text>
        <Input
          textContentType="oneTimeCode"
          keyboardType="number-pad"
          placeholder={translate.t("signUpVerification.verificationCode")}
          px={5}
          py={4}
          value={verificationCode}
          onChangeText={setVerificationCode}
        />
        <Box flex={1} />
        <Text color={colors.lighterText} fontSize="sm" textAlign="center">
          {translate.t("signUpVerification.typeTheCodeSent")}
        </Text>
        <Button my={5}>{translate.t("signUpVerification.enter")}</Button>
      </VStack>
    </Container>
  );
};

export default SignUpVerification;
