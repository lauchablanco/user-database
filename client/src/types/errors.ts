import { User } from "common-types";

type FieldError = string | null

export type FormErrors = Partial<Record<keyof User, FieldError>>;
export type ServerError = FieldError;