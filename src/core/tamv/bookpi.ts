export interface BookPiEntry {
  id: string;
  runId?: string;
  title: string;
  summary: string;
  tags: string[];
  createdAt: string;
}

export interface BookPiRepository {
  append: (entry: BookPiEntry) => Promise<void>;
}

export class InMemoryBookPiRepository implements BookPiRepository {
  public readonly entries: BookPiEntry[] = [];

  async append(entry: BookPiEntry): Promise<void> {
    this.entries.push(entry);
  }
}

export class BookPiService {
  constructor(private readonly repository: BookPiRepository) {}

  async narrate(title: string, summary: string, tags: string[], runId?: string): Promise<BookPiEntry> {
    const entry: BookPiEntry = {
      id: crypto.randomUUID(),
      runId,
      title,
      summary,
      tags,
      createdAt: new Date().toISOString(),
    };

    await this.repository.append(entry);
    return entry;
  }
}
