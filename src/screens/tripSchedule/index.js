import React, { useContext, useState } from "react";
import { Platform } from "react-native";
import {
  Button,
  ChevronDownIcon,
  ChevronRightIcon,
  Divider,
  Heading,
  HStack,
  Image,
  Pressable,
  Radio,
  ScrollView,
  Select,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "../../components/container";
import translate, { locale } from "../../translate";
import { capitalize, formatToCurrency } from "../../utils";
import colors from "../../constants/colors";
import LocationsModal from "../../components/locationsModal";
import calendar from "../../assets/icons/calendar.png";
import clock from "../../assets/icons/clock.png";
import AddCardModal from "../../components/addCardModal";
import BookingConfirmationModal from "../../components/bookingConfirmationModal";
import InviteToSubscribeModal from "../../components/inviteToSubscribeModal";
import routes from "../../routes";
import API, { GoogleMapsAPI, handleError } from "../../api";
import { LoaderContext, StateContext } from "../../contexts";

const TripSchedule = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { origin, destination } = route.params;
  const state = useContext(StateContext);
  const loader = useContext(LoaderContext);
  const {
    isOpen: isLocationsModal,
    onOpen: onOpenLocationsModal,
    onClose: onCloseLocationsModal,
  } = useDisclose(false);
  const [procedure, setProcedure] = useState("");
  const {
    isOpen: isDateTimePicker,
    onOpen: onOpenDateTimePicker,
    onClose: onCloseDateTimePicker,
  } = useDisclose(false);
  const [date, setDate] = useState(
    moment().startOf("hour").add(1, "hour").toDate(),
  );
  const {
    isOpen: isAddCardModal,
    onOpen: onOpenAddCardModal,
    onClose: onCloseAddCardModal,
  } = useDisclose(false);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const {
    isOpen: isBookingConfirmationModal,
    onOpen: onOpenBookingConfirmationModal,
    onClose: onCloseBookingConfirmationModal,
  } = useDisclose(false);
  const {
    isOpen: isInviteToSubscribeModal,
    onOpen: onOpenInviteToSubscribeModal,
    onClose: onCloseInviteToSubscribeModal,
  } = useDisclose(false);

  const onSchedule = async () => {
    try {
      loader.show();
      const {
        data: {
          resource: [service],
        },
      } = await API(state.sessionToken).get(
        `/airlinku/_table/servicio?filter=(id_ubicacion_destino=${
          destination.id
        })AND(en_destino_esperado>=${moment(date)
          .subtract(1, "hour")
          .format("Y-MM-DD HH:mm:ss")})AND(en_destino_esperado<=${moment(
          date,
        ).format("Y-MM-DD HH:mm:ss")})`,
      );
      if (!service) {
        throw new Error("No service");
      }
      let idDirection = origin?.id;
      if (!idDirection) {
        let latitud = origin.latitud;
        let longitud = origin.longitud;
        if (origin.place_id) {
          const {
            data: {
              result: {
                geometry: { location },
              },
            },
          } = await GoogleMapsAPI.get(
            `place/details/json?place_id=${origin.place_id}&fields=geometry&language=es`,
          );
          latitud = location.lat;
          longitud = location.lng;
        }
        const {
          data: {
            resource: [direction],
          },
        } = await API(state.sessionToken).post("/airlinku/_table/direccion", {
          resource: [
            {
              id_usuario: state.user.id,
              direccion: origin.nombre,
              nombre: origin.nombre,
              direccion2: "Ruta",
              latitud,
              longitud,
              id_ciudad: 10,
            },
          ],
        });
        idDirection = direction.id;
      }
      await API(state.sessionToken).post("/airlinku/_table/reserva", {
        resource: [
          {
            id_usuario: state.user.id,
            id_servicio: service.id,
            id_direccion: idDirection,
            creado_por: state.user.user_id,
            actualizado_por: state.user.user_id,
          },
        ],
      });
      loader.hide();
      onOpenBookingConfirmationModal();
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
            <HStack space={3}>
              <Heading color="black" flex={1}>
                {translate.t("tripSchedule.title")}
              </Heading>
              <Text>{translate.t("tripSchedule.price")}</Text>
              <Text fontSize="2xl">{formatToCurrency(0)}</Text>
            </HStack>
            <HStack bg="white" shadow={2} m={1} my={10} borderRadius={12}>
              <VStack flex={1} px={3} py={5} space={3}>
                <HStack space={1}>
                  <Text color={colors.titleText} minW={50}>
                    {translate.t("tripSchedule.from")}
                  </Text>
                  <Text flex={1} color={colors.lighterText}>
                    {origin.nombre}
                  </Text>
                </HStack>
                <HStack space={1}>
                  <Text color={colors.titleText} minW={50}>
                    {translate.t("tripSchedule.to")}
                  </Text>
                  <Text flex={1} color={colors.lighterText}>
                    {destination.nombre}
                  </Text>
                </HStack>
              </VStack>
              <HStack py={5}>
                <Divider orientation="vertical" />
              </HStack>
              <Pressable
                px={3}
                justifyContent="center"
                onPress={onOpenLocationsModal}>
                <Text color={colors.titleText} fontSize="sm">
                  {translate.t("tripSchedule.change")}
                </Text>
              </Pressable>
            </HStack>
            <Text mb={2}>{translate.t("tripSchedule.procedureName")}</Text>
            <Select
              py={3}
              mb={5}
              color={colors.inputText}
              placeholder={translate.t("tripSchedule.procedurePlaceholder")}
              selectedValue={procedure}
              onValueChange={setProcedure}
              dropdownIcon={<ChevronDownIcon mr={2} />}
              _actionSheet={{
                _backdrop: { opacity: 40, _pressed: { opacity: 40 } },
              }}
              _selectedItem={{ bg: "muted.300" }}>
              {translate.t("tripSchedule.procedures")?.map(_procedure => (
                <Select.Item
                  key={_procedure}
                  label={capitalize(_procedure)}
                  value={_procedure}
                  borderRadius="sm"
                />
              ))}
            </Select>
            <HStack space={5} mb={5}>
              <VStack flex={1} space={2}>
                <Text>{translate.t("tripSchedule.selectDate")}</Text>
                <Pressable
                  px={2}
                  py={3}
                  borderRadius="sm"
                  backgroundColor="muted.100"
                  onPress={onOpenDateTimePicker}>
                  <HStack space={2}>
                    <Image w={5} h={5} source={calendar} alt="calendar" />
                    <Text flex={1} color={colors.inputText} numberOfLines={1}>
                      {moment(date).format("DD MMM, HH:mm")}
                    </Text>
                    <ChevronDownIcon />
                  </HStack>
                </Pressable>
              </VStack>
              <VStack flex={1} space={2}>
                <Text>{translate.t("tripSchedule.processDuration")}</Text>
                <Pressable
                  px={2}
                  py={3}
                  borderRadius="sm"
                  backgroundColor="muted.100">
                  <HStack space={2}>
                    <Image w={5} h={5} source={clock} alt="clock" />
                    <Text flex={1} color={colors.inputText} numberOfLines={1}>
                      {translate.t("tripSchedule.duration")}
                    </Text>
                    <ChevronDownIcon />
                  </HStack>
                </Pressable>
              </VStack>
            </HStack>
            <Text mb={2}>{translate.t("tripSchedule.paymentMethods")}</Text>
            <Pressable
              px={2}
              py={3}
              mb={10}
              borderRadius="sm"
              backgroundColor="muted.100"
              onPress={onOpenAddCardModal}>
              <HStack space={2}>
                <Text flex={1} color={colors.inputText} numberOfLines={1}>
                  {translate.t("tripSchedule.choosePaymentMethod")}
                </Text>
                <ChevronRightIcon />
              </HStack>
            </Pressable>
            <HStack mb={2} space={5}>
              <Text flex={1}>
                {translate.t("tripSchedule.doYouNeedRoundTrip")}
              </Text>
              <Radio.Group
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
                defaultValue={isRoundTrip}
                onChange={setIsRoundTrip}>
                <Radio size="sm" colorScheme="blue" value={true}>
                  <Text>{translate.t("tripSchedule.yes")}</Text>
                </Radio>
                <Radio ml={4} size="sm" colorScheme="blue" value={false}>
                  <Text>{translate.t("tripSchedule.no")}</Text>
                </Radio>
              </Radio.Group>
            </HStack>
          </VStack>
        </ScrollView>
        <Button my={5} onPress={onSchedule}>
          {translate.t("tripSchedule.schedule")}
        </Button>
      </VStack>
      <LocationsModal
        visible={isLocationsModal}
        onRequestClose={onCloseLocationsModal}
        onContinue={onCloseLocationsModal}
      />
      <DateTimePickerModal
        isVisible={isDateTimePicker}
        mode="datetime"
        date={date}
        minimumDate={moment().add(1, "hour").toDate()}
        onConfirm={_date => {
          setDate(_date);
          onCloseDateTimePicker();
        }}
        onCancel={onCloseDateTimePicker}
        display={
          Platform.OS === "ios" && Number(Platform.Version) >= 14 && "inline"
        }
        cancelTextIOS={translate.t("tripSchedule.cancel")}
        confirmTextIOS={translate.t("tripSchedule.confirm")}
        locale={locale}
        minuteInterval={10}
      />
      <AddCardModal
        visible={isAddCardModal}
        onRequestClose={onCloseAddCardModal}
        onContinue={onCloseAddCardModal}
      />
      <BookingConfirmationModal
        visible={isBookingConfirmationModal}
        onContinue={() => {
          onCloseBookingConfirmationModal();
          onOpenInviteToSubscribeModal();
        }}
      />
      <InviteToSubscribeModal
        visible={isInviteToSubscribeModal}
        onClose={() => {
          onCloseInviteToSubscribeModal();
          navigation.navigate(routes.home);
          navigation.navigate(routes.tripDetails);
        }}
        onContinue={() => {
          onCloseInviteToSubscribeModal();
          navigation.navigate(routes.home);
          navigation.navigate(routes.subscription);
        }}
      />
    </Container>
  );
};

export default TripSchedule;
