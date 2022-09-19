import React, { useRef } from "react";
import { Platform } from "react-native";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import MapView from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Geolocation from "react-native-geolocation-service";
import styles from "./styles";
import translate from "../../translate";
import constants from "../../constants";
import colors from "../../constants/colors";
import location from "../../assets/icons/location.png";
import health from "../../assets/icons/health.png";
import arrowRight from "../../assets/icons/arrow-right.png";
import phone from "../../assets/icons/phone.png";
import profile from "../../assets/icons/profile.png";
import { getLocationPermission } from "../../utils";

const data = [
  {
    name: "Bird Road | Leon Medical Centers",
    address: "11501 SW 40th Street Miami, FL 33165",
  },
  {
    name: "Flagler | Leon Medical Centers",
    address: "7950 NW 2nd Street Miami, FL 33126",
  },
  {
    name: "West Hialeah | Leon Medical Centers",
    address: "2020 W 64th Street Hialeah, FL 33016",
  },
];

const Home = () => {
  const insets = useSafeAreaInsets();
  const map = useRef();

  const getUserLocation = async () => {
    try {
      const isLocationPermission = await getLocationPermission();
      if (Platform.OS === "android" && isLocationPermission) {
        Geolocation.watchPosition(
          position => {
            map.current.animateCamera({
              center: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              zoom: 18,
            });
          },
          () => {},
          { enableHighAccuracy: true },
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack flex={1}>
      <Stack flex={1} position="relative">
        <MapView
          ref={map}
          style={styles.map}
          initialRegion={constants.initialRegion}
          showsUserLocation
          followsUserLocation
          showsMyLocationButton={false}
          rotateEnabled={false}
          loadingEnabled
          onMapReady={getUserLocation}
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
          <HStack alignItems="center">
            <Image
              w={5}
              h={5}
              resizeMode="contain"
              source={profile}
              alt="profile"
            />
            <Text color={colors.primaryDark} ml={2}>
              {translate.t("home.profile")}
            </Text>
          </HStack>
        </Pressable>
        <Pressable
          position="absolute"
          top={`${insets.top + 80}px`}
          right={4}
          bg={colors.primaryDark}
          borderRadius="xl"
          shadow={2}
          p={3}>
          <HStack alignItems="center">
            <Image
              w={5}
              h={5}
              resizeMode="contain"
              source={phone}
              alt="phone"
            />
            <Text color={colors.white} ml={2}>
              {translate.t("home.callToSchedule")}
            </Text>
          </HStack>
        </Pressable>
      </Stack>
      <VStack
        bg="white"
        shadow={2}
        safeAreaBottom
        px={5}
        pt={5}
        pb={3}
        mt={-5}
        borderTopRadius={20}>
        <Heading color={colors.black} fontSize="2xl" mb={5}>
          {translate.t("home.title")}
        </Heading>
        <HStack alignItems="center" mb={4}>
          <Image
            w={25}
            h={25}
            resizeMode="contain"
            source={location}
            alt="location"
          />
          <Pressable flex={1} ml={4} px={4} py={3} bg="muted.100">
            <Text color={colors.inputText}>
              {translate.t("home.whereAreYouGoing")}
            </Text>
          </Pressable>
        </HStack>
        <Text color={colors.lighterText} mb={4}>
          {translate.t("home.suggestions")}
        </Text>
        <FlatList
          data={data.slice(0, 3)}
          renderItem={({ item }) => (
            <Pressable>
              <HStack alignItems="center">
                <Image
                  w={35}
                  h={35}
                  resizeMode="contain"
                  source={health}
                  alt="health"
                />
                <VStack mx={3} flex={1}>
                  <Text color={colors.titleText} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text color={colors.lighterText} numberOfLines={1}>
                    {item.address}
                  </Text>
                </VStack>
                <Image
                  w={6}
                  h={6}
                  resizeMode="contain"
                  source={arrowRight}
                  alt="arrowRight"
                />
              </HStack>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <Box h={3} />}
        />
      </VStack>
    </VStack>
  );
};

export default Home;
