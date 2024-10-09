import { countryPhoneCodes } from "./consts";

export function getCountryPhoneCode(country: string): string | null {
  const normalizedInput = country.toLowerCase().trim();

  // Búsqueda directa
  if (normalizedInput in countryPhoneCodes) {
    return countryPhoneCodes[normalizedInput]!.code;
  }

  // Búsqueda por alias
  for (const [countryName, data] of Object.entries(countryPhoneCodes)) {
    if (data.aliases.includes(normalizedInput)) {
      return data.code;
    }
  }

  return null;
}
