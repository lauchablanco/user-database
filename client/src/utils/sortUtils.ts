import { Gender, User } from "common-types";
import { FilterOption } from "../types/filterOption";

export const sortOptions: FilterOption[] = [
    { value: "fullName-asc", label: "🔠 Name (A-Z)" },
    { value: "fullName-desc", label: "🔡 Name (Z-A)" },
    { value: "house-asc", label: "🏰 House (A-Z)" },
    { value: "house-desc", label: "🏰 House (Z-A)" },
    { value: "gender-male", label: "♂️ Gender (Male → Female)" },
    { value: "gender-female", label: "♀️ Gender (Female → Male)" },
  ];

export const sortStudents = (students: User[], sortOption: FilterOption) => {
    return [...students].sort((a, b) => {
        switch (sortOption.value) {
            case "fullName-asc":
                return a.fullName.localeCompare(b.fullName);
            case "fullName-desc":
                return b.fullName.localeCompare(a.fullName);
            case "house-asc":
                return a.house.localeCompare(b.house);
            case "house-desc":
                return b.house.localeCompare(a.house);
            case "gender-male":
                return a.gender === Gender.Male ? -1 : 1;
            case "gender-female":
                return a.gender === Gender.Female ? -1 : 1;
            default:
                return 0;
        }
    });
}