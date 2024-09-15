import { eq } from "drizzle-orm";
import { DbClient } from "../../db";
import { StemTable } from "../../db/schema/stem";
import { int } from "../../types/alias";
import { inArray } from "drizzle-orm";

class StemRepository {
  constructor(private db: DbClient, private table: StemTable) {}

  async create(term: string) {
    const [stem] = await this.db
      .insert(this.table)
      .values({ term })
      .returning();

    return stem!;
  }

  async bulkCreate(terms: string[]) {
    return await this.db
      .insert(this.table)
      .values(
        terms.map((term) => ({
          term,
        }))
      )
      .returning();
  }

  async upsert(term: string) {
    const [stem] = await this.search(term);

    if (stem) return stem;

    return this.create(term);
  }

  async search(term: string | string[]) {
    if (typeof term === "string") {
      return this.db.select().from(this.table).where(eq(this.table.term, term));
    }

    return this.db
      .select()
      .from(this.table)
      .where(inArray(this.table.term, term));
  }

  async getById(id: int) {
    const [stem] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));

    return stem;
  }

  async delete(id: int) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }
}

export default StemRepository;
