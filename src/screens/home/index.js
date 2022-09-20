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
  useDisclose,
  VStack,
} from "native-base";
import MapView from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Geolocation from "react-native-geolocation-service";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import translate from "../../translate";
import constants from "../../constants";
import colors from "../../constants/colors";
import location from "../../assets/icons/location.png";
import phone from "../../assets/icons/phone.png";
import profile from "../../assets/icons/profile.png";
import { getLocationPermission } from "../../utils";
import Suggestion from "../../components/suggestion";
import LocationsModal from "../../components/locationsModal";
import routes from "../../routes";

const Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const map = useRef();
  const {
    isOpen: isLocationsModal,
    onOpen: onOpenLocationsModal,
    onClose: onCloseLocationsModal,
  } = useDisclose(false);

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

  const onContinue = () => {
    onCloseLocationsModal();
    navigation.navigate(routes.tripSchedule);
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
        <Pressable onPress={onOpenLocationsModal}>
          <HStack alignItems="center" mb={4}>
            <Image
              w={25}
              h={25}
              resizeMode="contain"
              source={location}
              alt="location"
            />
            <Text
              flex={1}
              ml={4}
              px={4}
              py={3}
              bg="muted.100"
              color={colors.inputText}>
              {translate.t("home.whereAreYouGoing")}
            </Text>
          </HStack>
        </Pressable>
        <Text color={colors.lighterText} mb={4}>
          {translate.t("home.suggestions")}
        </Text>
        <FlatList
          data={constants.suggestions.slice(0, 3)}
          renderItem={({ item }) => (
            <Pressable>
              <Suggestion item={item} />
            </Pressable>
          )}
          ItemSeparatorComponent={() => <Box h={3} />}
        />
      </VStack>
      <LocationsModal
        visible={isLocationsModal}
        onRequestClose={onCloseLocationsModal}
        onContinue={onContinue}
      />
    </VStack>
  );
};

export default Home;
