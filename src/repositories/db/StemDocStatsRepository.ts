import { desc, eq, sql, SQL, sum } from "drizzle-orm";
import {
  SQLiteInsertValue,
  SQLiteUpdateSetSource,
} from "drizzle-orm/sqlite-core";
import { GetSelectTableSelection } from "drizzle-orm/query-builders/select.types";
import { DbClient } from "../../db";
import { StemDocStatsTable } from "../../db/schema/stem-doc-stats";
import { int } from "../../types/alias";
import { StemTable } from "@/db/schema/stem";

class StemDocStatsRepository {
  constructor(
    private db: DbClient,
    private table: StemDocStatsTable,
    private stemTable: StemTable
  ) {}

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

  async getStats(limit: int, offset: int) {
    // SELECT stem.id, stats.doc_type, stem.term, SUM(stats.count) AS count
    // FROM stem_doc_stats stats
    // LEFT JOIN stem ON stem.id = stats.stem_id
    // GROUP BY stem_id
    // ORDER BY count DESC
    // LIMIT 10 OFFSET 0;
    return this.db
      .select({
        id: this.table.stemId,
        docType: this.table.docType,
        term: this.stemTable.term,
        // `mapWith` is a workaround for a bug in drizzle-orm
        // https://github.com/drizzle-team/drizzle-orm/issues/1146
        count: sum(this.table.count).mapWith(Number),
      })
      .from(this.table)
      .leftJoin(this.stemTable, eq(this.table.stemId, this.stemTable.id))
      .groupBy(this.table.stemId)
      .orderBy(desc(sum(this.table.count)))
      .limit(limit)
      .offset(offset);
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

type InsertStemDocStats = SQLiteInsertValue<StemDocStatsTable>;
type UpdateStemDocStats = SQLiteUpdateSetSource<StemDocStatsTable>;
type Filter =
  | ((aliases: GetSelectTableSelection<StemDocStatsTable>) => SQL | undefined)
  | SQL
  | undefined;
