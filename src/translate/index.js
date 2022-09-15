import { I18n } from "i18n-js";
import * as RNLocalize from "react-native-localize";
import en from "./translations/en.js";
import es from "./translations/es.js";

const languages = ["en", "es"];

const i18n = new I18n(
  { en, es },
  {
    defaultLocale: "en",
    locale: RNLocalize.findBestAvailableLanguage(languages).languageTag,
    enableFallback: true,
    missingBehavior: "guess",
  },
);

export default i18n;
