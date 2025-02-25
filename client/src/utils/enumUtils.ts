import { Gender, House } from "common-types";

// generating options from different enums
export function generateOptions<T extends Record<string, string | number>>(enumType: T): { value: string, label: string }[] {
  return Object.values(enumType).map(option => ({
    value: option.toString().toLowerCase(),
    label: option.toString(),
  }));
}

// House enum options
export const houseOptions = generateOptions(House);

// Gender enum options
export const genderOptions = generateOptions(Gender);
