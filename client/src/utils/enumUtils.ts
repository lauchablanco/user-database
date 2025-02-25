import { Gender, House, Pet, Role } from "common-types";
import { FilterOption } from "../types/filterOption";

// generating options from different enums
// ex: generateOptions(gender) = ['Male', 'Female']
export function generateOptions<T extends Record<string, string | number>>(enumType: T): FilterOption[] {
    return Object.values(enumType).map(option => ({
        label: option.toString(),
        value: option.toString().toLowerCase(),
    }));
}

export const filterEnums = {
    Gender,
    House,
    Pet,
    Role
}