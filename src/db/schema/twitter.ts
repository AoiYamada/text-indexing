import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import docs from "./docs";

const twitter = sqliteTable(
  "twitter",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    docId: integer("doc_id")
      .references(() => docs.id)
      .notNull(),
    content: text("content").notNull(),
  },
  (table) => ({
    docIdIdx: uniqueIndex("doc_id_idx").on(table.docId),
  })
);

export default twitter;
