import React, { useRef, useState } from "react";
import {
  Button,
  Heading,
  Image,
  Input,
  Radio,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "../../components/container";
import translate from "../../translate";
import person from "../../assets/icons/person.png";
import mail from "../../assets/icons/mail.png";
import routes from "../../routes";
import { validateEmail } from "../../utils";

const SignUpAccount = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const emailInput = useRef();
  const [plan, setPlan] = useState("personal");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const isDisabled = fullName.length < 4 || !validateEmail(email);

  const onContinue = () =>
    !isDisabled &&
    navigation.navigate(routes.signUpPassword, {
      ...route.params,
      fullName,
      email,
    });

  return (
    <Container>
      <VStack px={5} flex={1}>
        <ScrollView>
          <VStack pt={10}>
            <Heading mb={5}>{translate.t("signUpAccount.title")}</Heading>
            <Text mb={6}>{translate.t("signUpAccount.enterInfo")}</Text>
            <Text bold fontSize="xl" mb={5}>
              {translate.t("signUpAccount.creatingAccount")}
            </Text>
            <Radio.Group
              flexDirection="row"
              justifyContent="space-around"
              alignItems="center"
              defaultValue={plan}
              onChange={setPlan}>
              <Radio size="sm" colorScheme="blue" value="personal">
                <Text>{translate.t("signUpAccount.personal")}</Text>
              </Radio>
              <Radio size="sm" colorScheme="blue" value="familiar">
                <Text>{translate.t("signUpAccount.familiar")}</Text>
              </Radio>
            </Radio.Group>
            <Input
              py={3}
              mt={10}
              mb={5}
              placeholder={translate.t("signUpAccount.fullName")}
              autoCapitalize="words"
              InputLeftElement={
                <Image w={5} h={5} ml={3} source={person} alt="person" />
              }
              value={fullName}
              onChangeText={setFullName}
              returnKeyType="next"
              onSubmitEditing={() => emailInput.current.focus()}
            />
            <Input
              ref={emailInput}
              py={3}
              placeholder={translate.t("signUpAccount.email")}
              keyboardType="email-address"
              autoCapitalize="none"
              InputLeftElement={
                <Image w={5} h={5} ml={3} source={mail} alt="mail" />
              }
              value={email}
              onChangeText={setEmail}
              returnKeyType="done"
              onSubmitEditing={onContinue}
            />
          </VStack>
        </ScrollView>
        <Button my={5} disabled={isDisabled} onPress={onContinue}>
          {translate.t("signUpAccount.continue")}
        </Button>
      </VStack>
    </Container>
  );
};

export default SignUpAccount;
