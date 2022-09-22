import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/container";
import translate from "../../translate";
import colors from "../../constants/colors";
import vehicle from "../../assets/images/vehicle.png";
import card from "../../assets/icons/card.png";
import routes from "../../routes";

const SubscriptionConfirmation = () => {
  const navigation = useNavigation();
  const [automaticallyRenew, setAutomaticallyRenew] = useState(true);

  return (
    <Container>
      <VStack flex={1}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <VStack pt={10}>
            <Heading flex={1} mb={5} px={5}>
              {translate.t("subscriptionConfirmation.title")}
            </Heading>
            <VStack px={5} py={7} mb={5} backgroundColor="#dde9fb">
              <Text color={colors.titleText} fontSize="xl">
                {translate.t("subscriptionConfirmation.subtitle")}
              </Text>
              <Image
                w={160}
                h={160}
                source={vehicle}
                alt="vehicle"
                alignSelf="flex-end"
              />
            </VStack>
            <VStack px={5}>
              <HStack mb={3} alignItems="center" space={2}>
                <Text flex={1} fontSize="xl">
                  {translate.t("subscriptionConfirmation.total")}
                </Text>
                <Text>{translate.t("subscriptionConfirmation.price")}</Text>
                <Text fontSize="xl">$500 USD</Text>
              </HStack>
              <Divider mb={5} />
              <HStack alignItems="center" space={2}>
                <Text flex={1}>
                  {translate.t("subscriptionConfirmation.paymentMethod")}
                </Text>
                <Image w={5} h={5} source={card} alt="card" />
                <Text flex={1} fontSize="sm">
                  Master card •••• 6089
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </ScrollView>
        <VStack px={5} pt={2}>
          <Pressable onPress={() => setAutomaticallyRenew(!automaticallyRenew)}>
            <HStack alignItems="center" space={1}>
              <Checkbox
                isChecked={automaticallyRenew}
                accessibilityLabel="automaticallyRenew"
                onChange={() => setAutomaticallyRenew(!automaticallyRenew)}
              />
              <Text>
                {translate.t("subscriptionConfirmation.automaticallyRenew")}
              </Text>
            </HStack>
          </Pressable>
          <Button my={5} onPress={() => navigation.navigate(routes.home)}>
            {translate.t("subscriptionConfirmation.pay")}
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default SubscriptionConfirmation;
