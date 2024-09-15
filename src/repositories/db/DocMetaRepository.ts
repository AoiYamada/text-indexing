import { eq, SQL } from "drizzle-orm";
import { DbClient } from "../../db";
import {
  SQLiteInsertValue,
  SQLiteUpdateSetSource,
} from "drizzle-orm/sqlite-core";
import { GetSelectTableSelection } from "drizzle-orm/query-builders/select.types";
import { DocMetaTable } from "../../db/schema/doc-meta";
import { int } from "../../types/alias";

class DocMetaRepository {
  constructor(private db: DbClient, private table: DocMetaTable) {}

  async create(value: InsertDocMeta) {
    const [docMeta] = await this.db
      .insert(this.table)
      .values(value)
      .returning();

    return docMeta!;
  }

  async bulkCreate(values: InsertDocMeta[]) {
    return await this.db.insert(this.table).values(values).returning();
  }

  async search(filter: Filter) {
    return this.db.select().from(this.table).where(filter);
  }

  async getById(id: int) {
    const [docMeta] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));

    return docMeta;
  }

  async update(id: int, data: UpdateDocMeta) {
    const [docMeta] = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();
    return docMeta;
  }

  async delete(id: int) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

export default DocMetaRepository;

type InsertDocMeta = SQLiteInsertValue<DocMetaTable>;
type UpdateDocMeta = SQLiteUpdateSetSource<DocMetaTable>;
type Filter =
  | ((aliases: GetSelectTableSelection<DocMetaTable>) => SQL | undefined)
  | SQL
  | undefined;
