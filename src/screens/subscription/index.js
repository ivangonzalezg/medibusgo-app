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
import Container from "../../components/container";
import translate from "../../translate";
import pin from "../../assets/icons/pin.png";
import location from "../../assets/icons/location.png";
import { capitalize } from "../../utils";

const Subscription = () => {
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
        <ScrollView keyboardShouldPersistTaps="handled">
          <VStack pt={10}>
            <Heading flex={1} mb={5}>
              {translate.t("subscription.title")}
            </Heading>
            <HStack alignItems="center" mb={5}>
              <Image w={25} h={25} source={pin} alt="pin" />
              <Input
                flex={1}
                ml={4}
                px={4}
                py={3}
                placeholder={translate.t("subscription.fromWhere")}
              />
            </HStack>
            <HStack alignItems="center" mb={10}>
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
              <HStack key={day.name} my={2} alignItems="center" space={5}>
                <Pressable flex={1} onPress={() => onToggleDay(day.name)}>
                  <HStack alignItems="center">
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
                    {moment(day.date).format("h:mm A")}
                  </Text>
                </Pressable>
                <Pressable flex={1} py={2} bg="muted.100" borderRadius="lg">
                  <Text textAlign="center" px={1}>
                    {moment(day.date)
                      .add(day.duration, "minutes")
                      .format("h:mm A")}
                  </Text>
                </Pressable>
              </HStack>
            ))}
          </VStack>
        </ScrollView>
        <HStack my={3} alignItems="center" space={5}>
          <Button flex={1} bg="muted.100">
            <Text>{translate.t("subscription.cancel")}</Text>
          </Button>
          <Button flex={1}>{translate.t("subscription.create")}</Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Subscription;
