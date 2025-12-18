import { Gender, House, Pet, Role, User } from "common-types";

export type Permissions = Capacity[];

export type Capacity = 
| "CREATE_USER"
| "UPDATE_USER"
| "DELETE_USER";

export const permissionsRecord: Record<Role, Permissions> = {
    [Role.STUDENT]: [],
    [Role.GHOST]: [],
    [Role.PREFECT]: [],
    [Role.PROFESSOR]: ["UPDATE_USER"],
    [Role.PRINCIPAL]: ["CREATE_USER", "UPDATE_USER", "DELETE_USER"],
    [Role.ADMIN]: ["CREATE_USER", "UPDATE_USER", "DELETE_USER"],
};

export type UserForm = Partial<User> & {
  birthDate: Date;
  house: House;
  role: Role;
  pet: Pet;
  gender: Gender;
};