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
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "../../components/container";
import translate from "../../translate";
import { LoaderContext } from "../../contexts";
import API, { handleError } from "../../api";
import routes from "../../routes";

const SignUpSpecialNeeds = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, password, fullName, phone } = route.params;
  const loader = useContext(LoaderContext);
  const [hasSpecialNeeds, setHasSpecialNeeds] = useState(true);
  const [specialNeeds, setSpecialNeeds] = useState("");

  const onContinue = async () => {
    try {
      loader.show();
      await API().post("user/register", {
        id_universidad: 18,
        email,
        password,
        first_name: fullName,
        display_name: fullName,
        phone,
      });
      loader.hide();
      navigation.navigate(routes.initial);
      navigation.navigate(routes.signIn);
    } catch (error) {
      loader.hide();
      handleError(error);
    }
  };

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
