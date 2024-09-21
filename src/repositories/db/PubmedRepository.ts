import { eq, SQL } from "drizzle-orm";
import { PgInsertValue, PgUpdateSetSource } from "drizzle-orm/pg-core";
import { GetSelectTableSelection } from "drizzle-orm/query-builders/select.types";

import { DbClient } from "../../db";
import { PubmedTable } from "../../db/schema/pubmed";
import { int } from "../../types/alias";

class PubmedRepository {
  constructor(private db: DbClient, private table: PubmedTable) {}

  async create(value: InsertPubmed) {
    const [pubmed] = await this.db.insert(this.table).values(value).returning();

    return pubmed!;
  }

  async bulkCreate(values: InsertPubmed[]) {
    return await this.db.insert(this.table).values(values).returning();
  }

  async search(filter: Filter) {
    return this.db.select().from(this.table).where(filter);
  }

  async getById(id: int) {
    const [pubmed] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));

    return pubmed;
  }

  async getByDocId(docId: int) {
    const [pubmed] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.docId, docId));

    return pubmed;
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

type InsertPubmed = PgInsertValue<PubmedTable>;
type UpdatePubmed = PgUpdateSetSource<PubmedTable>;
type Filter =
  | ((aliases: GetSelectTableSelection<PubmedTable>) => SQL | undefined)
  | SQL
  | undefined;
