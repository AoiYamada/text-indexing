import { eq, SQL } from "drizzle-orm";
import { DbClient } from "../../db";
import {
  SQLiteInsertValue,
  SQLiteUpdateSetSource,
} from "drizzle-orm/sqlite-core";
import { GetSelectTableSelection } from "drizzle-orm/query-builders/select.types";
import { TwitterTable } from "../../db/schema/twitter";
import { int } from "../../types/alias";

class TwitterRepository {
  constructor(private db: DbClient, private table: TwitterTable) {}

  async create(value: InsertTwitter) {
    const [twitter] = await this.db
      .insert(this.table)
      .values(value)
      .returning();

    return twitter;
  }

  async bulkCreate(values: InsertTwitter[]) {
    return await this.db.insert(this.table).values(values).returning();
  }

  async search(filter: Filter) {
    return this.db.select().from(this.table).where(filter);
  }

  async getById(id: int) {
    return this.db.select().from(this.table).where(eq(this.table.id, id));
  }

  async update(id: int, data: UpdateTwitter) {
    const [twitter] = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return twitter;
  }

  async delete(id: int) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

export default TwitterRepository;

type InsertTwitter = SQLiteInsertValue<TwitterTable>;
type UpdateTwitter = SQLiteUpdateSetSource<TwitterTable>;
type Filter =
  | ((aliases: GetSelectTableSelection<TwitterTable>) => SQL | undefined)
  | SQL
  | undefined;
