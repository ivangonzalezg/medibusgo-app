import countries from "./countries.json";

const noFlag = "⬜";

const getCountryFlag = (dialCode = "") =>
  countries
    .sort(a => (a.preferred ? -1 : 1))
    .find(country => country.dial_code === `+${dialCode}`)?.flag || noFlag;

const validateCountryFlag = (flag = "") => flag !== noFlag;

export { getCountryFlag, validateCountryFlag };
