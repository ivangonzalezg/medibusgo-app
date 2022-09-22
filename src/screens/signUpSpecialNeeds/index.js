import React, { useContext, useState } from "react";
import {
  Button,
  Heading,
  Radio,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from "native-base";
import Container from "../../components/container";
import translate from "../../translate";
import { StateContext } from "../../contexts";

const SignUpSpecialNeeds = () => {
  const state = useContext(StateContext);
  const [hasSpecialNeeds, setHasSpecialNeeds] = useState(true);
  const [specialNeeds, setSpecialNeeds] = useState("");

  const onContinue = () => state.updateIsLoggedIn(true);

  return (
    <Container>
      <VStack px={5} flex={1}>
        <ScrollView>
          <VStack pt={10}>
            <Heading mb={10}>{translate.t("signUpSpecialNeeds.title")}</Heading>
            <Radio.Group
              flexDirection="row"
              justifyContent="space-evenly"
              alignItems="center"
              defaultValue={hasSpecialNeeds}
              onChange={setHasSpecialNeeds}>
              <Radio size="lg" colorScheme="blue" value={true}>
                {translate.t("signUpSpecialNeeds.yes")}
              </Radio>
              <Radio size="lg" colorScheme="blue" value={false}>
                {translate.t("signUpSpecialNeeds.no")}
              </Radio>
            </Radio.Group>
            {hasSpecialNeeds && (
              <VStack>
                <Text fontSize="xl" mt={10} mb={5}>
                  {translate.t("signUpSpecialNeeds.specify")}
                </Text>
                <TextArea
                  placeholder={translate.t("signUpSpecialNeeds.detail")}
                  p={4}
                  h={200}
                  value={specialNeeds}
                  onChangeText={setSpecialNeeds}
                />
              </VStack>
            )}
          </VStack>
        </ScrollView>
        <Button my={5} onPress={onContinue}>
          {translate.t("signUpSpecialNeeds.continue")}
        </Button>
      </VStack>
    </Container>
  );
};

export default SignUpSpecialNeeds;
