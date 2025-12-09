// permissions.ts (helper)
import { Role } from "common-types";
import { Capacity, permissionsRecord } from "../types/permissions";

export function hasCapacity(role: Role, capacity: Capacity): boolean {
  const capacities = permissionsRecord[role];
  return capacities && capacities.length > 0 && capacities.includes(capacity);
}