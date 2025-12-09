import { Gender, House, Pet, Role } from "common-types";
import { FilterOption } from "../types/filterOption";

// generating options from different enums
// ex: generateOptions(gender) = ['Male', 'Female']
export function generateEnumOptions<T extends Record<string, string | number>>(enumType: T): FilterOption[] {
    return Object.values(enumType).map(option => ({
        label: option.toString(),
        value: option.toString(),
    }));
}

export const filterEnums = {
    Gender,
    House,
    Pet,
    Role
}