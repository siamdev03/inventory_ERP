export type TUserRole =
  | "super_admin"
  | "admin"
  | "manager"
  | "staff";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
}