import { countryPhoneCodes } from "./consts";

export function getCountryPhoneCode(country: string): string | null {
  const normalizedInput = country.toLowerCase().trim();

  // Búsqueda directa
  if (countryPhoneCodes.find((country) => country.name.trim().toLowerCase() === normalizedInput)) {
    return countryPhoneCodes.find((country) => country.name.trim().toLowerCase() === normalizedInput)!.code;
  }

  // Búsqueda por alias
  for (const country of countryPhoneCodes) {
    if (country.aliases.includes(normalizedInput)) {
      return country.code;
    }
  }

  return null;
}
