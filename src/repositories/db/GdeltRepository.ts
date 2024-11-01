import { eq, SQL } from "drizzle-orm";
import {
  SQLiteInsertValue,
  SQLiteUpdateSetSource,
} from "drizzle-orm/sqlite-core";
import { GetSelectTableSelection } from "drizzle-orm/query-builders/select.types";
import { DbClient } from "../../db";
import { GdeltTable } from "../../db/schema/gdelt";
import { int } from "../../types/alias";

class GdeltRepository {
  constructor(private db: DbClient, private table: GdeltTable) {}

  async create(value: InsertGdelt) {
    const [gdelt] = await this.db
      .insert(this.table)
      .values(value)
      .returning();

    return gdelt!;
  }

  async bulkCreate(values: InsertGdelt[]) {
    return await this.db.insert(this.table).values(values).returning();
  }

  async search(filter: Filter) {
    return this.db.select().from(this.table).where(filter);
  }

  async getById(id: int) {
    const [gdelt] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));

    return gdelt;
  }

  async getByDocId(docId: int) {
    const [gdelt] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.docId, docId));

    return gdelt;
  }

  async update(id: int, data: UpdateGdelt) {
    const [gdelt] = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return gdelt;
  }

  async delete(id: int) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

export default GdeltRepository;

type InsertGdelt = SQLiteInsertValue<GdeltTable>;
type UpdateGdelt = SQLiteUpdateSetSource<GdeltTable>;
type Filter =
  | ((aliases: GetSelectTableSelection<GdeltTable>) => SQL | undefined)
  | SQL
  | undefined;
