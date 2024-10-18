import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import EsDocRepository from "@/repositories/elasticsearch/EsDocRepository";
import { DbClient, schema } from "@/db";
import Service from "./interfaces/Service";
import { sql } from "drizzle-orm";

class ResetDocService implements Service {
  constructor(private db: DbClient, private esDocRepo: EsDocRepository) {}

  async execute() {
    // remove sqlite db, order matters because of foreign keys
    this.db.run(sql`DROP TABLE IF EXISTS __drizzle_migrations`);
    Object.values([
      schema.docMeta,
      schema.stemDocStats,
      schema.pubmed,
      schema.gdelt,
      schema.doc,
      schema.file,
      schema.stem,
    ]).forEach((table) => this.db.run(sql`DROP TABLE IF EXISTS ${table}`));

    // remove elasticsearch index
    await this.esDocRepo.destroy();

    // recreate elasticsearch index
    await this.esDocRepo.init();

    // recreate sqlite db
    migrate(this.db, { migrationsFolder: "src/db/migrations" });
  }
}

export default ResetDocService;
