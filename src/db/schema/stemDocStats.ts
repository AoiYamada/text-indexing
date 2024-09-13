import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import docs from "./docs";
import stem from "./stem";
import { index } from "drizzle-orm/sqlite-core";
import { DocTypeValues } from "../../constants/DocType";

const stemDocStats = sqliteTable(
  "stem_doc_stats",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    stemId: integer("stem_id")
      .references(() => stem.id)
      .notNull(),
    docId: integer("doc_id")
      .references(() => docs.id)
      .notNull(),
    docType: text("doc_type", {
      enum: DocTypeValues,
    }).notNull(),
    count: integer("count").notNull(),
  },
  (table) => ({
    docIdIdx: index("doc_id_count_idx").on(table.docId, table.count),
    stemIdCountIdx: index("stem_id_count_idx").on(table.stemId, table.count),
    docTypeIdx: index("doc_type_count_idx").on(table.docType, table.count),
    countIdx: index("count_idx").on(table.count),
  })
);

export default stemDocStats;

export type StemDocStatsTable = typeof stemDocStats;
