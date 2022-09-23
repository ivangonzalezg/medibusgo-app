import { Button, Heading, Input, ScrollView, VStack } from "native-base";
import React, { useContext, useState } from "react";
import API, { handleError } from "../../api";
import Container from "../../components/container";
import { StateContext } from "../../contexts";

const SignIn = () => {
  const state = useContext(StateContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async () => {
    try {
      const {
        data: { id, session_token: sessionToken },
      } = await API().post("/user/session", {
        email,
        password,
      });
      const {
        data: {
          resource: [user],
        },
      } = await API(sessionToken).get(
        `/airlinku/_table/usuario?filter=(user_id=${id})`,
      );
      state.updateSessionToken(sessionToken);
      state.updateUser(user);
      state.updateIsLoggedIn(true);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Container>
      <ScrollView>
        <VStack px={5} pt={10} flex={1} space={5}>
          <Heading>Sign in</Heading>
          <Input
            px={5}
            py={4}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            px={5}
            py={4}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <Button onPress={onSignIn}>Sign in</Button>
        </VStack>
      </ScrollView>
    </Container>
  );
};

export default SignIn;
