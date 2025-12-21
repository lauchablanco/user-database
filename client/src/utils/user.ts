import { Gender, User } from "common-types";
import { FilterOption } from "../types/filterOption";
import { filterEnums } from "./enum";
import { UserForm } from "../types/permissions";

export const mapUserFromApi = (user: any): User => ({
  ...user,
  birthDate: user.birthDate ? new Date(user.birthDate) : null,
});

export const createFormData = (userForm: UserForm, selectedFile: File | null) => {
  const data = new FormData();

  data.append("fullName", userForm.fullName!);
  data.append("email", userForm.email!);
  data.append("house", userForm.house!);
  data.append("role", userForm.role!);
  data.append("pet", userForm.pet!);
  data.append("gender", userForm.gender!);

  if (userForm.birthDate) {
    data.append("birthDate", userForm.birthDate.toISOString());
  }

  if (selectedFile) {
    data.append("profilePicture", selectedFile);
  }

  return data;
}

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

export const applyFiltersAndSort = (users: User[] | null, nameFilter:string, filtersState: Record<string, string[]>, selectedSort: FilterOption) => {
    if(!users) return;
    const filtersKeys = Object.keys(filterEnums);
     let result = users;
    // name filter
    if (nameFilter) {
      result = result.filter((user) =>
        user.fullName.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    result = filtersKeys.reduce((filteredUsers, filterKey) => {
      const filterValues = filtersState[filterKey]; //Get selected filters

      if (filterValues.length === 0) return filteredUsers; // If none, return.

      return filteredUsers.filter((user) => {
        const userValue = user[filterKey.toLowerCase() as keyof User] as string;
        return filterValues.includes(userValue); //return user values from that key
      });
    }, result); // initialize `reduce` with user array.

    result = sortStudents(result, selectedSort);
    return result; 
}