import React, { useRef, useState } from "react";
import {
  Button,
  Heading,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "../../components/container";
import translate from "../../translate";
import lock from "../../assets/icons/lock.png";
import routes from "../../routes";

const SignUpPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const repeatPasswordInput = useRef();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const isDisabled =
    password.length < 4 ||
    repeatPassword.length < 4 ||
    password !== repeatPassword;

  const onContinue = () =>
    !isDisabled &&
    navigation.navigate(routes.test, {
      ...route.params,
      password,
      repeatPassword,
    });

  return (
    <Container>
      <VStack px={5} flex={1}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <VStack pt={10}>
            <Heading fontSize="2xl" mb={5}>
              {translate.t("signUpPassword.title")}
            </Heading>
            <Text mb={50}>{translate.t("signUpPassword.createPassword")}</Text>
            <Input
              py={3}
              mb={5}
              placeholder={translate.t("signUpPassword.password")}
              secureTextEntry
              InputLeftElement={
                <Image
                  w={5}
                  h={5}
                  ml={3}
                  resizeMode="contain"
                  source={lock}
                  alt="lock"
                />
              }
              value={password}
              onChangeText={setPassword}
              returnKeyType="next"
              onSubmitEditing={() => repeatPasswordInput.current.focus()}
            />
            <Input
              ref={repeatPasswordInput}
              py={3}
              placeholder={translate.t("signUpPassword.repeatPassword")}
              secureTextEntry
              InputLeftElement={
                <Image
                  w={5}
                  h={5}
                  ml={3}
                  resizeMode="contain"
                  source={lock}
                  alt="lock"
                />
              }
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              returnKeyType="next"
              onSubmitEditing={onContinue}
            />
          </VStack>
        </ScrollView>
        <Button my={5} disabled={isDisabled} onPress={onContinue}>
          {translate.t("signUpPassword.continue")}
        </Button>
      </VStack>
    </Container>
  );
};

export default SignUpPassword;
