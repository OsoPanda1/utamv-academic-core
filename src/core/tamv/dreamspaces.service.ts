export interface DreamSpace {
  id: string;
  slug: string;
  title: string;
  ownerUserId: string;
  accessPolicy: "public" | "members" | "invite_only";
  createdAt: string;
}

export class DreamSpacesService {
  private readonly spaces: DreamSpace[] = [];

  create(slug: string, title: string, ownerUserId: string, accessPolicy: DreamSpace["accessPolicy"]): DreamSpace {
    const space: DreamSpace = {
      id: crypto.randomUUID(),
      slug,
      title,
      ownerUserId,
      accessPolicy,
      createdAt: new Date().toISOString(),
    };
    this.spaces.push(space);
    return space;
  }

  list(): DreamSpace[] {
    return [...this.spaces];
  }
}
