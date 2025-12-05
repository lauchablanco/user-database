export type Role = "STUDENT" | "TEACHER" | "PRINCIPAL" | "ADMIN";

export type Permissions = Capacity[];

export type Capacity = 
| "CREATE_USER"
| "UPDATE_USER"
| "DELETE_USER";

export const permissionsRecord: Record<Role, Permissions> = {
    STUDENT: [],
    TEACHER: ["UPDATE_USER"],
    PRINCIPAL: ["CREATE_USER", "UPDATE_USER", "DELETE_USER"],
    ADMIN: ["CREATE_USER", "UPDATE_USER", "DELETE_USER"],
};