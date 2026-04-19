import crypto from "crypto";
import { recordEvent } from "./msr.engine";

export interface BookPiEntry {
  id: string;
  runId: string; // 🔥 obligatorio
  traceId?: string;

  title: string;
  summary: string;
  tags: string[];

  createdAt: string;

  // 🔐 verificabilidad
  hash: string;
}

export interface BookPiRepository {
  append: (entry: BookPiEntry) => Promise<void>;
}

/**
 * ⚠️ SOLO PARA DESARROLLO
 */
export class InMemoryBookPiRepository implements BookPiRepository {
  public readonly entries: BookPiEntry[] = [];

  async append(entry: BookPiEntry): Promise<void> {
    this.entries.push(entry);
  }
}

/**
 * 🔐 hash narrativo
 */
function hashEntry(entry: Omit<BookPiEntry, "hash">): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(entry))
    .digest("hex");
}

export class BookPiService {
  constructor(private readonly repository: BookPiRepository) {}

  async narrate(
    title: string,
    summary: string,
    tags: string[],
    runId: string,
    traceId?: string
  ): Promise<BookPiEntry> {
    /**
     * 📦 entrada base
     */
    const baseEntry = {
      id: crypto.randomUUID(),
      runId,
      traceId,
      title,
      summary,
      tags,
      createdAt: new Date().toISOString(),
    };

    /**
     * 🔐 hash
     */
    const hash = hashEntry(baseEntry);

    const entry: BookPiEntry = {
      ...baseEntry,
      hash,
    };

    /**
     * 💾 persistencia local (temporal)
     */
    await this.repository.append(entry);

    /**
     * 🔥 REGISTRO EN MSR (CLAVE)
     */
    recordEvent({
      eventType: "BOOKPI_ENTRY_CREATED",
      entityId: runId,
      payload: entry,
    });

    return entry;
  }
}
