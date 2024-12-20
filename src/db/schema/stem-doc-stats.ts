import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import doc from "./doc";
import stem from "./stem";
import { DocTypeValues } from "../../constants/DocType";
import {  DocAnalyzerValues } from "@/elasticsearch/indices/doc/analysis";

const stemDocStats = sqliteTable(
  "stem_doc_stats",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    stemId: integer("stem_id")
      .references(() => stem.id, { onDelete: "cascade" })
      .notNull(),
    docId: integer("doc_id")
      .references(() => doc.id, { onDelete: "cascade" })
      .notNull(),
    docType: text("doc_type", {
      enum: DocTypeValues,
    }).notNull(),
    docAnalyzer: text("doc_analyzer", {
      enum: DocAnalyzerValues,
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
    docTypeCountIdx: index("stem_doc_stats_doc_type_count_idx").on(
      table.docType,
      table.count
    ),
    docAnalyzerCountIdx: index("stem_doc_stats_doc_analyzer_count_idx").on(
      table.docAnalyzer,
      table.count
    ),
    docTypeAnalyzerCountIdx: index(
      "stem_doc_stats_doc_type_analyzer_count_idx"
    ).on(table.docType, table.docAnalyzer, table.count),
    countIdx: index("stem_doc_stats_count_idx").on(table.count),
  })
);

export default stemDocStats;

export type StemDocStatsTable = typeof stemDocStats;
