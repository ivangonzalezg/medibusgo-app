import * as EmailValidator from "email-validator";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import numbro from "numbro";
import countries from "./countries.json";
import decodePolyline from "./decodePolyline";

const noFlag = "⬜";

const getCountryFlag = (dialCode = "") =>
  countries
    .sort(a => (a.preferred ? -1 : 1))
    .find(country => country.dial_code === `+${dialCode}`)?.flag || noFlag;

const validateCountryFlag = (flag = "") => flag !== noFlag;

const validateEmail = (string = "") => EmailValidator.validate(string);

const getLocationPermission = async () => {
  let isLocationPermission = false;
  if (Platform.OS === "android") {
    const locationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: " La aplicación necesita permiso de ubicación",
        message: "Necesitamos esto para rastrear su ubicación",
      },
    );
    isLocationPermission =
      locationPermission === PermissionsAndroid.RESULTS.GRANTED;
  } else if (Platform.OS === "ios") {
    const locationPermission = await Geolocation.requestAuthorization(
      "whenInUse",
    );
    isLocationPermission = locationPermission === "granted";
  }
  return isLocationPermission;
};

const formatToCurrency = (number = 0) =>
  numbro(Math.ceil(number)).format({
    thousandSeparated: true,
    prefix: "$",
  });

const capitalize = (string = "") =>
  `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;

export {
  getCountryFlag,
  validateCountryFlag,
  validateEmail,
  getLocationPermission,
  formatToCurrency,
  capitalize,
  decodePolyline,
};
