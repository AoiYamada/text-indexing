import { eq, SQL } from "drizzle-orm";
import { DbClient } from "../../db";
import {
  SQLiteInsertValue,
  SQLiteUpdateSetSource,
} from "drizzle-orm/sqlite-core";
import { GetSelectTableSelection } from "drizzle-orm/query-builders/select.types";
import { StemTable } from "../../db/schema/stem";
import { int } from "../../types/alias";

class StemRepository {
  constructor(private db: DbClient, private table: StemTable) {}

  async create(value: InsertStem) {
    const [stem] = await this.db.insert(this.table).values(value).returning();

    return stem;
  }

  async bulkCreate(values: InsertStem[]) {
    return await this.db.insert(this.table).values(values).returning();
  }

  async search(filter: Filter) {
    return this.db.select().from(this.table).where(filter);
  }

  async getById(id: int) {
    return this.db.select().from(this.table).where(eq(this.table.id, id));
  }

  async update(id: int, data: UpdateStem) {
    const [stem] = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return stem;
  }

  async delete(id: int) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

export default StemRepository;

type InsertStem = SQLiteInsertValue<StemTable>;
type UpdateStem = SQLiteUpdateSetSource<StemTable>;
type Filter =
  | ((aliases: GetSelectTableSelection<StemTable>) => SQL | undefined)
  | SQL
  | undefined;
