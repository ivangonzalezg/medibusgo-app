import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Stack,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import database from "@react-native-firebase/database";
import Share from "react-native-share";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { StateContext } from "../../contexts";
import constants from "../../constants";
import profile from "../../assets/icons/profile.png";
import share from "../../assets/icons/share.png";
import liveLocation from "../../assets/icons/live-location.png";
import colors from "../../constants/colors";
import translate from "../../translate";
import LiveLocationModal from "../../components/liveLocationModal";
import OnTheWay from "../../components/onTheWay";
import InLocation from "../../components/inLocation";
import ToDestination from "../../components/toDestination";
import routes from "../../routes";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const TripInProgress = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const state = useContext(StateContext);
  const map = useRef();
  const scrollView = useRef();
  const [isMapReady, setIsMapReady] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLiveLocation, setIsLiveLocation] = useState(false);
  const {
    isOpen: isLiveLocationModal,
    onOpen: onOpenLiveLocationModal,
    onClose: onCloseLiveLocationModal,
  } = useDisclose(false);
  const [isUserReady, setIsUserReady] = useState(false);
  const [step, setStep] = useState(0);

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

  const onOpenChat = () => navigation.navigate(routes.tripInProgressChat);

  return (
    <VStack flex={1}>
      <Stack flex={1} position="relative">
        <MapView
          ref={map}
          style={styles.map}
          initialRegion={constants.initialRegion}
          showsUserLocation
          showsMyLocationButton={false}
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
          p={3}
          onPress={() => {
            const _step = step === 2 ? 0 : step + 1;
            scrollView.current.scrollTo({
              x: width * _step,
              y: 0,
              animated: true,
            });
            setStep(_step);
          }}>
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
          py={2}
          onPress={() =>
            Share.open({
              url: "https://hospitaltrack.com/invite_register_ID#4334",
              failOnCancel: false,
            })
          }>
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
      <VStack bg="white" shadow={2} safeAreaBottom mt={-5} borderTopRadius={20}>
        <ScrollView
          ref={scrollView}
          horizontal
          decelerationRate={0}
          snapToInterval={width}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}>
          <Box w={width}>
            {step === 0 && (
              <OnTheWay
                plate={state.tripInProgress.servicio.placa_vehiculo}
                onOpenChat={onOpenChat}
              />
            )}
          </Box>
          <Box w={width}>
            {step === 1 && (
              <InLocation
                plate={state.tripInProgress.servicio.placa_vehiculo}
                isUserReady={isUserReady}
                onUserReady={() => setIsUserReady(true)}
                onOpenChat={onOpenChat}
              />
            )}
          </Box>
          <Box w={width}>
            {step === 2 && (
              <ToDestination
                origin={
                  state.tripInProgress.servicio
                    .nombre_tipo_ubicacion_destino === "SEDE"
                    ? state.tripInProgress.direccion_direccion
                    : state.tripInProgress.servicio.nombre_ubicacion_origen
                }
                destination={
                  state.tripInProgress.servicio
                    .nombre_tipo_ubicacion_destino === "SEDE"
                    ? state.tripInProgress.servicio.nombre_ubicacion_destino
                    : state.tripInProgress.direccion_direccion
                }
              />
            )}
          </Box>
        </ScrollView>
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
