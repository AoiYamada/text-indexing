import { asc, count, desc, eq, like } from "drizzle-orm";
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

  async search(
    filter: { filename?: string },
    options: {
      limit?: int;
      offset?: int;
      orderBy?: ["id" | "filename" | "createdAt", "asc" | "desc"];
    } = {}
  ) {
    const { limit = 20, offset = 0, orderBy = ["id", "desc"] } = options;

    const sortableFieldMap = {
      id: this.table.id,
      filename: this.table.filename,
      createdAt: this.table.createdAt,
    };

    const orderHandler = {
      asc: asc,
      desc: desc,
    };

    return this.db
      .select()
      .from(this.table)
      .where(
        filter.filename
          ? like(this.table.filename, `%${filter.filename}%`)
          : undefined
      )
      .orderBy(orderHandler[orderBy[1]](sortableFieldMap[orderBy[0]]))
      .limit(limit)
      .offset(offset);
  }

  async count(filter: { filename?: string }) {
    const [{ total }] = await this.db
      .select({ total: count() })
      .from(this.table)
      .where(
        filter.filename
          ? like(this.table.filename, `%${filter.filename}%`)
          : undefined
      );

    return total;
  }

  async delete(id: int) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

export default FileRepository;

type InsertFile = SQLiteInsertValue<FileTable>;
