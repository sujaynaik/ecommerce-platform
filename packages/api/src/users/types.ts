export type UserRole = "ADMIN" | "STAFF";

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "ACTIVE" | "INVITED";
}
