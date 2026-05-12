export interface UserIdentity {
  id: string;
  email: string;
  displayName: string;
  role: "student" | "teacher" | "admin";
}

export interface AuthSession {
  user: UserIdentity | null;
  accessToken: string | null;
}

export function isAdmin(user: UserIdentity | null): boolean {
  return user?.role === "admin";
}
