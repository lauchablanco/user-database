import { Role } from "common-types";
import { FormErrors } from "../types/errors";
import { UserForm } from "../types/permissions";
import { calculateAge } from "./dateUtils";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const validateRolAge = (role: Role, birthDate: Date): string | null => {  
  let age = calculateAge(birthDate);
  switch (role) {
    case Role.STUDENT:
      return age >= 18 ? 'Students must be under 18' : null
    case Role.PREFECT:
      return age < 17 ? 'Prefect must be 17 or older' : null    
    case Role.PROFESSOR:
      return age < 25 ? 'Professors must be older than 25' : null      
    case Role.GHOST:
      return age <= 100 ? 'Ghosts must have died more than 100 years ago' : null
    default:
      return null;
  }
}

export const validateUserForm = (data: UserForm): FormErrors => {
  const errors: FormErrors = {};

  if (!data.fullName?.trim()) {
    errors.fullName = "Name is required";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email) && data.role != Role.GHOST) {
    errors.email = "Invalid email format";
  }

  if (!data.birthDate) {
    errors.birthDate = "Birth date is required";
  } else {
    errors.birthDate = validateRolAge(data.role, data.birthDate);
  }

  return errors;
};