export type UserRole = "student" | "teacher" | "admin";

export interface UserIdentity {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
}

export interface AuthSession {
  user: UserIdentity | null;
  accessToken: string | null;
}

export function isAdmin(user: UserIdentity | null): boolean {
  return user?.role === "admin";
}

export function isTeacher(user: UserIdentity | null): boolean {
  return user?.role === "teacher";
}

export function isStudent(user: UserIdentity | null): boolean {
  return user?.role === "student";
}
