import React from "react";
import {
  Avatar,
  Button,
  Divider,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import MapView from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import moment from "moment";
import styles from "./styles";
import constants from "../../constants";
import colors from "../../constants/colors";
import profile from "../../assets/icons/profile.png";
import edit from "../../assets/icons/edit.png";
import vehicle from "../../assets/images/vehicle.png";
import arrowRight from "../../assets/icons/arrow-right.png";
import person1 from "../../assets/images/person1.png";
import person2 from "../../assets/images/person2.png";
import translate from "../../translate";

const TripDetails = () => {
  const insets = useSafeAreaInsets();

  return (
    <VStack flex={1}>
      <Stack minH={250} position="relative">
        <MapView
          style={styles.map}
          initialRegion={constants.initialRegion}
          showsMyLocationButton={false}
          rotateEnabled={false}
          loadingEnabled
        />
        <Pressable
          position="absolute"
          top={`${insets.top + 10}px`}
          right={4}
          bg={colors.white}
          borderRadius="3xl"
          shadow={2}
          py={3}
          px={6}>
          <HStack>
            <Image w={5} h={5} source={profile} alt="profile" />
            <Text color={colors.primaryDark} ml={2}>
              {translate.t("tripDetails.profile")}
            </Text>
          </HStack>
        </Pressable>
      </Stack>
      <VStack
        flex={1}
        bg="white"
        shadow={2}
        safeAreaBottom
        mt={-5}
        borderTopRadius={20}>
        <ScrollView>
          <VStack px={5} pt={5} pb={3}>
            <HStack mb={5} space={3}>
              <Text flex={1} fontSize="xl">
                {translate.t("tripDetails.scheduledTrips")}
              </Text>
              <Text>{translate.t("tripDetails.price")}</Text>
              <Text fontSize="xl">$50</Text>
            </HStack>
            <HStack mb={5}>
              <VStack flex={1} space={3}>
                <HStack space={1}>
                  <Text fontSize="lg" color={colors.titleText} minW={50}>
                    {translate.t("tripDetails.from")}
                  </Text>
                  <Text flex={1}>3315 NW 53rd St</Text>
                </HStack>
                <HStack space={1}>
                  <Text fontSize="lg" color={colors.titleText} minW={50}>
                    {translate.t("tripDetails.to")}
                  </Text>
                  <Text flex={1}>Mercy Hospital</Text>
                </HStack>
              </VStack>
              <Button variant="unstyled" bg="muted.100" px={5} py={2}>
                <HStack space={2}>
                  <Image w={4} h={4} source={edit} alt="edit" />
                  <Text color={colors.titleText}>
                    {translate.t("tripDetails.edit")}
                  </Text>
                </HStack>
              </Button>
            </HStack>
            <Divider mb={5} />
            <HStack mb={5} space={4}>
              <VStack flex={1}>
                <Text color={colors.titleText}>
                  {translate.t("tripDetails.date")}
                </Text>
                <Text fontSize="xl">{moment().format("DD MMM, HH:mm")}</Text>
              </VStack>
              <VStack alignItems="center">
                <Text color={colors.titleText}>
                  {translate.t("tripDetails.startTime")}
                </Text>
                <Text fontSize="xl">
                  {moment().add(1, "hour").format("HH:mm")}
                </Text>
              </VStack>
              <Image w={6} h={6} source={arrowRight} alt="arrowRight" />
              <VStack alignItems="center">
                <Text color={colors.titleText}>
                  {translate.t("tripDetails.finalHour")}
                </Text>
                <Text fontSize="xl">{moment().format("HH:mm")}</Text>
              </VStack>
            </HStack>
            <Divider mb={5} />
            <HStack mb={5} space={10}>
              <Text flex={1} fontSize="xl" color={colors.titleText}>
                {translate.t("tripDetails.vehicle")}
              </Text>
              <Image w={20} h={20} source={vehicle} alt="vehicle" />
              <VStack>
                <Text>{translate.t("tripDetails.vehicleType")}</Text>
                <Text fontSize="xl">BTA 217</Text>
                <Text fontSize="lg" color={colors.lighterText}>
                  {translate.t("tripDetails.plate")}
                </Text>
              </VStack>
            </HStack>
            <Divider mb={5} />
            <HStack>
              <VStack flex={1} space={5}>
                <HStack space={3}>
                  <Avatar size={45} source={person1} />
                  <VStack>
                    <Text>Daniel López</Text>
                    <Text bold fontSize="sm">
                      {translate.t("tripDetails.driver")}
                    </Text>
                  </VStack>
                </HStack>
                <HStack space={3}>
                  <Avatar size={45} source={person2} />
                  <VStack>
                    <Text>Lucas Estrada</Text>
                    <Text bold fontSize="sm">
                      {translate.t("tripDetails.assistant")}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
              <Button backgroundColor={colors.cancel}>
                {translate.t("tripDetails.cancelBooking")}
              </Button>
            </HStack>
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  );
};

export default TripDetails;
