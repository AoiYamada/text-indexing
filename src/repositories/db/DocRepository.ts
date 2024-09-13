import { eq, SQL } from "drizzle-orm";
import { DbClient } from "../../db";
import {
  SQLiteInsertValue,
  SQLiteUpdateSetSource,
} from "drizzle-orm/sqlite-core";
import { GetSelectTableSelection } from "drizzle-orm/query-builders/select.types";
import { DocsTable } from "../../db/schema/docs";

class DocRepository {
  constructor(private db: DbClient, private table: DocsTable) {}

  async create(value: InsertDoc) {
    const [doc] = await this.db.insert(this.table).values(value).returning();

    return doc;
  }

  async bulkCreate(values: InsertDoc[]) {
    return await this.db.insert(this.table).values(values).returning();
  }

  async search(filter: Filter) {
    return this.db.select().from(this.table).where(filter);
  }

  async getById(id: number) {
    return this.db.select().from(this.table).where(eq(this.table.id, id));
  }

  async update(id: number, data: UpdateDoc) {
    const [doc] = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return doc;
  }

  async delete(id: number) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

export default DocRepository;

type InsertDoc = SQLiteInsertValue<DocsTable>;
type UpdateDoc = SQLiteUpdateSetSource<DocsTable>;
type Filter =
  | ((aliases: GetSelectTableSelection<DocsTable>) => SQL | undefined)
  | SQL
  | undefined;