import { index, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import doc from "./doc";
import stem from "./stem";
import { DocTypeValues } from "../../constants/DocType";

const stemDocStats = pgTable(
  "stem_doc_stats",
  {
    id: serial("id").primaryKey(),
    stemId: integer("stem_id")
      .references(() => stem.id)
      .notNull(),
    docId: integer("doc_id")
      .references(() => doc.id)
      .notNull(),
    docType: text("doc_type", {
      enum: DocTypeValues,
    }).notNull(),
    count: integer("count").notNull(),
  },
  (table) => ({
    docIdIdx: index("stem_doc_stats_doc_id_count_idx").on(
      table.docId,
      table.count
    ),
    stemIdCountIdx: index("stem_doc_stats_stem_id_count_idx").on(
      table.stemId,
      table.count
    ),
    docTypeIdx: index("stem_doc_stats_doc_type_count_idx").on(
      table.docType,
      table.count
    ),
    countIdx: index("stem_doc_stats_count_idx").on(table.count),
  })
);

export default stemDocStats;

export type StemDocStatsTable = typeof stemDocStats;
