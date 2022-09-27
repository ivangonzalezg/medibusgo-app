import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import database from "@react-native-firebase/database";
import styles from "./styles";
import { StateContext } from "../../contexts";
import constants from "../../constants";
import profile from "../../assets/icons/profile.png";
import chat from "../../assets/icons/chat.png";
import vehicle from "../../assets/images/vehicle.png";
import share from "../../assets/icons/share.png";
import liveLocation from "../../assets/icons/live-location.png";
import colors from "../../constants/colors";
import translate from "../../translate";
import LiveLocationModal from "../../components/liveLocationModal";

const TripInProgress = () => {
  const insets = useSafeAreaInsets();
  const state = useContext(StateContext);
  const map = useRef();
  const [isMapReady, setIsMapReady] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLiveLocation, setIsLiveLocation] = useState(false);
  const {
    isOpen: isLiveLocationModal,
    onOpen: onOpenLiveLocationModal,
    onClose: onCloseLiveLocationModal,
  } = useDisclose(false);

  const servicioReference = database()
    .ref()
    .child("airlinku")
    .child("servicio")
    .child(String(state.tripInProgress.servicio.id));

  const centerMap = location => map.current.animateCamera({ center: location });

  useEffect(() => {
    if (isMapReady) {
      servicioReference.child("currentLocation").on("value", data => {
        const location = data.val();
        if (!location) {
          return;
        }
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        centerMap(location);
      });
    }
    return () => {
      servicioReference.child("currentLocation").off();
    };
  }, [isMapReady]);

  return (
    <VStack flex={1}>
      <Stack flex={1} position="relative">
        <MapView
          ref={map}
          style={styles.map}
          initialRegion={constants.initialRegion}
          rotateEnabled={false}
          loadingEnabled
          onMapReady={() => setIsMapReady(true)}>
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
          />
        </MapView>
        <Pressable
          position="absolute"
          top={`${insets.top + 10}px`}
          right={4}
          bg={colors.white}
          borderRadius="full"
          shadow={2}
          p={3}>
          <Image w={6} h={6} source={profile} alt="profile" />
        </Pressable>
        <Pressable
          position="absolute"
          bottom={10}
          right={4}
          bg={colors.white}
          borderRadius="full"
          shadow={2}
          px={4}
          py={2}>
          <HStack space={3}>
            <Image w={4} h={4} source={share} alt="share" />
            <Text color={colors.titleText}>
              {translate.t("tripInProgress.share")}
            </Text>
          </HStack>
        </Pressable>
        <Pressable
          position="absolute"
          bottom="24"
          right={4}
          bg={isLiveLocation ? colors.primaryDark : colors.white}
          borderRadius="full"
          shadow={2}
          p={3}
          onPress={() => {
            if (isLiveLocation) {
              setIsLiveLocation(false);
            } else {
              onOpenLiveLocationModal();
            }
          }}>
          <Image
            w={7}
            h={7}
            source={liveLocation}
            alt="liveLocation"
            tintColor={isLiveLocation ? colors.white : colors.titleText}
          />
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
        <HStack alignItems="flex-start" space={5} mb={5}>
          <Text flex={1} fontSize="xl">
            {translate.t("tripInProgress.transportGoesToLocation")}
          </Text>
          <Button size="sm">
            <HStack space={2}>
              <Image w={4} h={4} source={chat} alt="chat" />
              <Text color="white">Chat</Text>
            </HStack>
          </Button>
        </HStack>
        <HStack mb={5}>
          <HStack flex={1} space={10}>
            <Image w={20} h={20} source={vehicle} alt="vehicle" />
            <VStack>
              <Text>{translate.t("tripInProgress.vehicleType")}</Text>
              <Text fontSize="xl">BTA 217</Text>
              <Text fontSize="lg" color={colors.lighterText}>
                {translate.t("tripInProgress.plate")}
              </Text>
            </VStack>
          </HStack>
          <VStack space={3}>
            <Text>{translate.t("tripInProgress.arriveIn")}</Text>
            <VStack
              w={70}
              h={70}
              backgroundColor={colors.titleText}
              borderRadius="full"
              alignItems="center"
              justifyContent="center">
              <Text color="white">4</Text>
              <Text color="white">min</Text>
            </VStack>
          </VStack>
        </HStack>
        <Divider />
        <VStack my={5} space={3}>
          <HStack space={3}>
            <Text minW={140}>{translate.t("tripInProgress.tripType")}</Text>
            <Text color={colors.lighterText}>
              {translate.t("tripInProgress.roundTrip")}
            </Text>
          </HStack>
          <HStack space={3}>
            <Text minW={140}>
              {translate.t("tripInProgress.paymentMethod")}
            </Text>
            <Text color={colors.lighterText}>
              {translate.t("tripInProgress.creditCard")}
            </Text>
          </HStack>
        </VStack>
        <Divider />
        <Pressable alignItems="center" mt={3}>
          <Text color={colors.cancel}>
            {translate.t("tripInProgress.cancel")}
          </Text>
        </Pressable>
      </VStack>
      <LiveLocationModal
        visible={isLiveLocationModal}
        onRequestClose={onCloseLiveLocationModal}
        onShare={() => {
          onCloseLiveLocationModal();
          setIsLiveLocation(true);
        }}
      />
    </VStack>
  );
};

export default TripInProgress;
