import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import doc from "./doc";

const twitter = sqliteTable(
  "twitter",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    docId: integer("doc_id")
      .references(() => doc.id, { onDelete: "cascade" })
      .notNull(),
    content: text("content").notNull(),
  },
  (table) => ({
    docIdIdx: uniqueIndex("twitter_doc_id_idx").on(table.docId),
  })
);

export default twitter;

export type TwitterTable = typeof twitter;
