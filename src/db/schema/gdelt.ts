import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import doc from "./doc";

const gdelt = sqliteTable(
  "gdelt",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    docId: integer("doc_id")
      .references(() => doc.id, { onDelete: "cascade" })
      .notNull(),
    url: text("url").notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
  },
  (table) => ({
    docIdIdx: uniqueIndex("gdelt_doc_id_idx").on(table.docId),
  })
);

export default gdelt;

export type GdeltTable = typeof gdelt;
