import countries from "../data/countries";
import type { Country } from "../types/Country";

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find((country) => country.countryCode === code);
};