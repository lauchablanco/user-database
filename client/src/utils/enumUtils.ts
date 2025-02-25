import { Gender, House, Pet, Role } from "common-types";

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

// Pet enum options
export const petOptions = generateOptions(Pet);

// Role enum options
export const roleOptions = generateOptions(Role);
