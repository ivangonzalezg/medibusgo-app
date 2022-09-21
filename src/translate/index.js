import { I18n } from "i18n-js";
import * as RNLocalize from "react-native-localize";
import moment from "moment";
import "moment/locale/es";
import en from "./translations/en.js";
import es from "./translations/es.js";

const languages = ["en", "es"];

const locale = RNLocalize.findBestAvailableLanguage(languages).languageTag;

if (locale === "en") {
  moment.locale("en");
} else if (locale === "es") {
  moment.locale("es");
}

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
