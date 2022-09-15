import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Radio,
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

const CreateAccount = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const emailInput = useRef();
  const [plan, setPlan] = useState("personal");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const isDisabled = fullName.length < 4 || !validateEmail(email);

  const onContinue = () =>
    !isDisabled &&
    navigation.navigate(routes.test, {
      ...route.params,
      fullName,
      email,
    });

  return (
    <Container>
      <VStack pt={10} px={5} flex={1}>
        <Heading fontSize="2xl" mb={5}>
          {translate.t("createAccount.title")}
        </Heading>
        <Text mb={6}>{translate.t("createAccount.enterInfo")}</Text>
        <Text bold fontSize="xl" mb={5}>
          {translate.t("createAccount.creatingAccount")}
        </Text>
        <Radio.Group
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          defaultValue={plan}
          onChange={setPlan}>
          <Radio size="sm" colorScheme="blue" value="personal">
            <Text>{translate.t("createAccount.personal")}</Text>
          </Radio>
          <Radio size="sm" colorScheme="blue" value="familiar">
            <Text>{translate.t("createAccount.familiar")}</Text>
          </Radio>
        </Radio.Group>
        <Box h={10} />
        <Input
          py={3}
          mb={5}
          placeholder={translate.t("createAccount.fullName")}
          autoCapitalize="words"
          InputLeftElement={
            <Image
              w={5}
              h={5}
              ml={3}
              resizeMode="contain"
              source={person}
              alt="person"
            />
          }
          value={fullName}
          onChangeText={setFullName}
          returnKeyType="next"
          onSubmitEditing={() => emailInput.current.focus()}
        />
        <Input
          ref={emailInput}
          py={3}
          placeholder={translate.t("createAccount.email")}
          keyboardType="email-address"
          autoCapitalize="none"
          InputLeftElement={
            <Image
              w={5}
              h={5}
              ml={3}
              resizeMode="contain"
              source={mail}
              alt="mail"
            />
          }
          value={email}
          onChangeText={setEmail}
          returnKeyType="done"
          onSubmitEditing={onContinue}
        />
        <Box flex={1} />
        <Button my={5} disabled={isDisabled} onPress={onContinue}>
          {translate.t("createAccount.continue")}
        </Button>
      </VStack>
    </Container>
  );
};

export default CreateAccount;
