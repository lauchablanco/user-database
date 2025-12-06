import { Role } from "common-types";

export type Permissions = Capacity[];

export type Capacity = 
| "CREATE_USER"
| "UPDATE_USER"
| "DELETE_USER";

export const permissionsRecord: Record<Role, Permissions> = {
    [Role.Student]: [],
    [Role.Ghost]: [],
    [Role.Prefect]: [],
    [Role.Professor]: ["UPDATE_USER"],
    [Role.Headmaster]: ["CREATE_USER", "UPDATE_USER", "DELETE_USER"],
};