import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/container";
import translate from "../../translate";
import pin from "../../assets/icons/pin.png";
import location from "../../assets/icons/location.png";
import { capitalize } from "../../utils";
import routes from "../../routes";

const Subscription = () => {
  const navigation = useNavigation();
  const [weekdays, setWeekdays] = useState(
    moment.weekdays(true).map(day => ({
      name: day,
      selected: true,
      date: new Date(),
      duration: 60,
    })),
  );

  const onToggleDay = name => {
    const _weekdays = [...weekdays].map(weekday => ({
      ...weekday,
      selected: weekday.name === name ? !weekday.selected : weekday.selected,
    }));
    setWeekdays(_weekdays);
  };

  return (
    <Container>
      <VStack px={5} flex={1}>
        <ScrollView>
          <VStack pt={10} pb={5}>
            <Heading flex={1} mb={5}>
              {translate.t("subscription.title")}
            </Heading>
            <HStack mb={5}>
              <Image w={25} h={25} source={pin} alt="pin" />
              <Input
                flex={1}
                ml={4}
                px={4}
                py={3}
                placeholder={translate.t("subscription.fromWhere")}
              />
            </HStack>
            <HStack mb={10}>
              <Image w={25} h={25} source={location} alt="location" />
              <Input
                flex={1}
                ml={4}
                px={4}
                py={3}
                placeholder={translate.t("subscription.whereAreYouGoing")}
              />
            </HStack>
            <Text fontSize="lg" mb={5}>
              {translate.t("subscription.whereAreYouGoing")}
            </Text>
            <HStack mb={2} space={5}>
              <Box flex={1} />
              <Text flex={1} textAlign="center">
                {translate.t("subscription.arrival")}
              </Text>
              <Text flex={1} textAlign="center">
                {translate.t("subscription.departure")}
              </Text>
            </HStack>
            {weekdays.map(day => (
              <HStack key={day.name} my={2} space={5}>
                <Pressable flex={1} onPress={() => onToggleDay(day.name)}>
                  <HStack>
                    <Checkbox
                      isChecked={day.selected}
                      accessibilityLabel={day.name}
                      onChange={() => onToggleDay(day.name)}
                    />
                    <Text flex={1} ml={1}>
                      {capitalize(day.name)}
                    </Text>
                  </HStack>
                </Pressable>
                <Pressable flex={1} py={2} bg="muted.100" borderRadius="lg">
                  <Text textAlign="center" px={1}>
                    {moment(day.date).format("HH:mm")}
                  </Text>
                </Pressable>
                <Pressable flex={1} py={2} bg="muted.100" borderRadius="lg">
                  <Text textAlign="center" px={1}>
                    {moment(day.date)
                      .add(day.duration, "minutes")
                      .format("HH:mm")}
                  </Text>
                </Pressable>
              </HStack>
            ))}
          </VStack>
        </ScrollView>
        <HStack my={3} space={5}>
          <Button
            flex={1}
            variant="unstyled"
            bg="muted.100"
            onPress={navigation.goBack}>
            <Text>{translate.t("subscription.cancel")}</Text>
          </Button>
          <Button
            flex={1}
            onPress={() =>
              navigation.navigate(routes.subscriptionConfirmation)
            }>
            {translate.t("subscription.create")}
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Subscription;
