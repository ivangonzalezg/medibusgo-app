import { Platform, ToastAndroid, Alert } from "react-native";
import axios from "axios";

const API_KEY =
  "72a72755d473001c17e8fed1829370fa336c6e69fa3c67d52ff1d927f9236eec";

const API_BASE_URL = "https://dreamfactory.technisupport.com/api/v2";

const API = (sessionToken = "") =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "X-Dreamfactory-API-Key": API_KEY,
      "X-DreamFactory-Session-Token": sessionToken,
    },
  });

function handleError(error = new Error("Error")) {
  if (Platform.OS === "android") {
    ToastAndroid.show(
      error.response?.data?.error?.message || error.message,
      ToastAndroid.SHORT,
    );
  } else {
    Alert.alert(error.response?.data?.error?.message || error.message);
  }
}

export default API;

export { handleError };
