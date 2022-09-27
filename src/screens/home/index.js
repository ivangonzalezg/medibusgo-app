import React, { useContext, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Image,
  Pressable,
  Spinner,
  Stack,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import MapView from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Geolocation from "react-native-geolocation-service";
import { useNavigation } from "@react-navigation/native";
import qs from "qs";
import moment from "moment";
import database from "@react-native-firebase/database";
import styles from "./styles";
import translate, { locale } from "../../translate";
import constants from "../../constants";
import colors from "../../constants/colors";
import locationIcon from "../../assets/icons/location.png";
import phone from "../../assets/icons/phone.png";
import profile from "../../assets/icons/profile.png";
import { getLocationPermission } from "../../utils";
import Suggestion from "../../components/suggestion";
import LocationsModal from "../../components/locationsModal";
import routes from "../../routes";
import API, { GoogleMapsAPI, handleError } from "../../api";
import { StateContext } from "../../contexts";

const Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const state = useContext(StateContext);
  const map = useRef();
  const [location, setLocation] = useState(null);
  const {
    isOpen: isLocationsModal,
    onOpen: onOpenLocationsModal,
    onClose: onCloseLocationsModal,
  } = useDisclose(false);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  const getSuggestions = async () => {
    try {
      const {
        data: { resource: _originSuggestions },
      } = await API(state.sessionToken).get(
        `/airlinku/_table/direccion?filter=(id_usuario=${state.user.id})`,
      );
      const {
        data: { resource: _destinationSuggestions },
      } = await API(state.sessionToken).get(
        `/airlinku/_table/ubicacion?filter=(id_universidad=${state.user.id_universidad})AND(id_tipo_ubicacion=1)AND(eliminado is null)AND(habilitado=1)`,
      );
      setOriginSuggestions(_originSuggestions);
      setDestinationSuggestions(_destinationSuggestions);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const listeners = [];
    if (state?.sessionToken && state?.user?.id) {
      getSuggestions();
      API(state.sessionToken)
        .get(
          `/airlinku/_table/reserva?filter=(id_usuario=${
            state.user.id
          })AND(eliminado is null)AND(estado >= 0)AND(servicio_finalizado = 0)AND(inicio_servicio=${moment().format(
            "Y-MM-DD",
          )})`,
        )
        .then(({ data: { resource: reservas } }) => {
          reservas.forEach(reserva => {
            const reference = database()
              .ref()
              .child("airlinku")
              .child("servicio")
              .child(String(reserva.servicio.id))
              .child("estadoServicio");
            listeners.push(reference);
            reference.on("value", data => {
              const estado = data.val();
              if (!estado) {
                return;
              }
              if (estado === 4) {
                state.updateIsTripInProgress(false);
                state.updateTripInProgress({});
                navigation.navigate(routes.home);
              } else {
                state.updateIsTripInProgress(true);
                state.updateTripInProgress(reserva);
                navigation.navigate(routes.tripInProgress);
              }
            });
          });
        });
    }
    return () => {
      listeners.forEach(listener => listener.off());
    };
  }, [state]);

  const getOriginByLocation = async ({ latitude, longitude }) => {
    try {
      const {
        data: {
          results: [result],
        },
      } = await GoogleMapsAPI.get(
        `/geocode/json?latlng=${latitude},${longitude}`,
      );
      if (result) {
        setOrigin({
          nombre: result.formatted_address,
          latitud: latitude,
          longitud: longitude,
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const getUserLocation = async () => {
    try {
      const isLocationPermission = await getLocationPermission();
      if (isLocationPermission) {
        Geolocation.watchPosition(
          ({ coords }) => {
            const _location = {
              latitude: coords.latitude,
              longitude: coords.longitude,
            };
            if (Platform.OS === "android") {
              map.current.animateCamera({ center: _location });
            }
            setLocation(_location);
            getOriginByLocation(_location);
          },
          () => {},
          { enableHighAccuracy: true },
        );
      }
    } catch (error) {
      handleError(error);
    }
  };

  const onSearchOrigin = async query => {
    try {
      if (!query) {
        return;
      }
      const {
        data: { predictions },
      } = await GoogleMapsAPI.get(
        `/place/autocomplete/json?${qs.stringify({
          input: query,
          language: locale,
          radius: 50000,
          location: location && `${location.latitude},${location.longitude}`,
          strictbounds: true,
        })}`,
      );
      setOriginSuggestions(
        predictions.map(prediction => ({
          nombre: prediction.description,
          place_id: prediction.place_id,
        })),
      );
    } catch (error) {
      handleError(error);
    }
  };

  const onContinue = () => {
    onCloseLocationsModal();
    navigation.navigate(routes.tripSchedule, { origin, destination });
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
          px={6}
          onPress={() => state.updateIsLoggedIn(false)}>
          <HStack>
            <Image w={5} h={5} source={profile} alt="profile" />
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
          <HStack>
            <Image w={5} h={5} source={phone} alt="phone" />
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
        <Heading color={colors.black} mb={5}>
          {translate.t("home.title")}
        </Heading>
        <Pressable
          onPress={() => {
            setDestination({});
            onOpenLocationsModal();
          }}>
          <HStack mb={4}>
            <Image w={25} h={25} source={locationIcon} alt="location" />
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
          maxH={200}
          data={destinationSuggestions}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setDestination(item);
                onOpenLocationsModal();
              }}>
              <Suggestion name={item.nombre} />
            </Pressable>
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Box h={3} />}
          ListEmptyComponent={Spinner}
        />
      </VStack>
      <LocationsModal
        visible={isLocationsModal}
        onRequestClose={onCloseLocationsModal}
        onContinue={onContinue}
        originSuggestions={originSuggestions}
        destinationSuggestions={destinationSuggestions}
        origin={origin}
        destination={destination}
        onSearchOrigin={onSearchOrigin}
        onSelectOrigin={setOrigin}
        onSelectDestination={setDestination}
      />
    </VStack>
  );
};

export default Home;
