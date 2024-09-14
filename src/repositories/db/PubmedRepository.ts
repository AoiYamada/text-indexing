import { eq, SQL } from "drizzle-orm";
import { DbClient } from "../../db";
import {
  SQLiteInsertValue,
  SQLiteUpdateSetSource,
} from "drizzle-orm/sqlite-core";
import { GetSelectTableSelection } from "drizzle-orm/query-builders/select.types";
import { PubmedTable } from "../../db/schema/pubmed";
import { int } from "../../types/alias";

class PubmedRepository {
  constructor(private db: DbClient, private table: PubmedTable) {}

  async create(value: InsertPubmed) {
    const [pubmed] = await this.db.insert(this.table).values(value).returning();

    return pubmed;
  }

  async bulkCreate(values: InsertPubmed[]) {
    return await this.db.insert(this.table).values(values).returning();
  }

  async search(filter: Filter) {
    return this.db.select().from(this.table).where(filter);
  }

  async getById(id: int) {
    return this.db.select().from(this.table).where(eq(this.table.id, id));
  }

  async update(id: int, data: UpdatePubmed) {
    const [pubmed] = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return pubmed;
  }

  async delete(id: int) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

export default PubmedRepository;

type InsertPubmed = SQLiteInsertValue<PubmedTable>;
type UpdatePubmed = SQLiteUpdateSetSource<PubmedTable>;
type Filter =
  | ((aliases: GetSelectTableSelection<PubmedTable>) => SQL | undefined)
  | SQL
  | undefined;
