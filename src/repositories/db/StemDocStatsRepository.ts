import { eq, SQL } from "drizzle-orm";
import { PgInsertValue, PgUpdateSetSource } from "drizzle-orm/pg-core";
import { GetSelectTableSelection } from "drizzle-orm/query-builders/select.types";
import { DbClient } from "../../db";
import { StemDocStatsTable } from "../../db/schema/stemDocStats";
import { int } from "../../types/alias";

class StemDocStatsRepository {
  constructor(private db: DbClient, private table: StemDocStatsTable) {}

  async create(value: InsertStemDocStats) {
    const [stemDocStats] = await this.db
      .insert(this.table)
      .values(value)
      .returning();

    return stemDocStats!;
  }

  async bulkCreate(values: InsertStemDocStats[]) {
    return await this.db.insert(this.table).values(values).returning();
  }

  async search(filter: Filter) {
    return this.db.select().from(this.table).where(filter);
  }

  async getById(id: int) {
    const [stemDocStats] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));

    return stemDocStats;
  }

  async update(id: int, data: UpdateStemDocStats) {
    const [stemDocStats] = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return stemDocStats;
  }

  async delete(id: int) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

export default StemDocStatsRepository;

type InsertStemDocStats = PgInsertValue<StemDocStatsTable>;
type UpdateStemDocStats = PgUpdateSetSource<StemDocStatsTable>;
type Filter =
  | ((aliases: GetSelectTableSelection<StemDocStatsTable>) => SQL | undefined)
  | SQL
  | undefined;
