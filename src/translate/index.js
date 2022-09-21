import { I18n } from "i18n-js";
import * as RNLocalize from "react-native-localize";
import en from "./translations/en.js";
import es from "./translations/es.js";

const languages = ["en", "es"];

const locale = RNLocalize.findBestAvailableLanguage(languages).languageTag;

const translate = new I18n(
  { en, es },
  {
    defaultLocale: "en",
    locale,
    enableFallback: true,
    missingBehavior: "guess",
  },
);

export default translate;

export { locale };
