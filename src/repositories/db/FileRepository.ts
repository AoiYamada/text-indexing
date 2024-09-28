import { desc, eq } from "drizzle-orm";
import { SQLiteInsertValue } from "drizzle-orm/sqlite-core";
import { DbClient } from "../../db";
import { FileTable } from "../../db/schema/file";
import { int } from "../../types/alias";

class FileRepository {
  constructor(private db: DbClient, private table: FileTable) {}

  async create(value: InsertFile) {
    const [file] = await this.db.insert(this.table).values(value).returning();

    return file!;
  }

  async getFiles(limit: int, offset: int) {
    return this.db
      .select()
      .from(this.table)
      .orderBy(desc(this.table.id))
      .limit(limit)
      .offset(offset);
  }

  async delete(id: int) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

export default FileRepository;

type InsertFile = SQLiteInsertValue<FileTable>;
