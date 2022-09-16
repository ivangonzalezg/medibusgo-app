import * as EmailValidator from "email-validator";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import countries from "./countries.json";

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

export {
  getCountryFlag,
  validateCountryFlag,
  validateEmail,
  getLocationPermission,
};
