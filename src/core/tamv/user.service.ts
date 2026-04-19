export interface UserProfile {
  userId: string;
  displayName: string;
  bio?: string;
  presence: "online" | "away" | "offline";
}

export class UserService {
  private readonly profiles = new Map<string, UserProfile>();

  upsert(profile: UserProfile): UserProfile {
    this.profiles.set(profile.userId, profile);
    return profile;
  }

  find(userId: string): UserProfile | null {
    return this.profiles.get(userId) ?? null;
  }
}
