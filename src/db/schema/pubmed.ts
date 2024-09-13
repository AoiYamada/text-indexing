import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import docs from "./docs";

const pubmed = sqliteTable(
  "pubmed",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    docId: integer("doc_id")
      .references(() => docs.id)
      .notNull(),
    title: text("title").notNull(),
    abstract: text("abstract").notNull(),
  },
  (table) => ({
    docIdIdx: uniqueIndex("doc_id_idx").on(table.docId),
  })
);

export default pubmed;
