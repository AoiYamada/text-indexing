import { eq, inArray } from "drizzle-orm";
import {
  SQLiteInsertValue,
  SQLiteUpdateSetSource,
} from "drizzle-orm/sqlite-core";
import { DbClient } from "../../db";
import { DocTable } from "../../db/schema/doc";
import { FileTable } from "../../db/schema/file";
import { int } from "../../types/alias";
import { z } from "zod";

class DocRepository {
  constructor(
    private db: DbClient,
    private table: DocTable,
    private fileTable: FileTable
  ) {}

  async create(value: InsertDoc) {
    const [doc] = await this.db.insert(this.table).values(value).returning();

    return doc!;
  }

  async bulkCreate(values: InsertDoc[]) {
    return this.db.insert(this.table).values(values).returning();
  }

  async search(filter: {
    ids?: int[];
    // type?: DocType; fileIds?: int[]
  }) {
    return DbDocsParser.parse(
      await this.db
        .select({
          id: this.table.id,
          type: this.table.type,
          filename: this.fileTable.filename,
        })
        .from(this.table)
        .leftJoin(this.fileTable, eq(this.table.fileId, this.fileTable.id))
        .where(filter.ids ? inArray(this.table.id, filter.ids) : undefined)
    );
  }

  async getById(id: int) {
    const [doc] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));

    return doc;
  }

  async getByFileId(fileId: int) {
    const [doc] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.fileId, fileId));

    return doc;
  }

  async update(id: int, data: UpdateDoc) {
    const [doc] = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return doc;
  }

  async delete(id: int) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

export default DocRepository;

type InsertDoc = SQLiteInsertValue<DocTable>;
type UpdateDoc = SQLiteUpdateSetSource<DocTable>;

const DbDocParser = z.object({
  id: z.number(),
  type: z.string(),
  filename: z.string().default(""),
});

const DbDocsParser = z.array(DbDocParser);

export type DbDoc = z.infer<typeof DbDocParser>;
