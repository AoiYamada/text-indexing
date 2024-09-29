import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import doc from "./doc";

const pubmed = sqliteTable(
  "pubmed",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    docId: integer("doc_id")
      .references(() => doc.id, { onDelete: "cascade" })
      .notNull(),
    title: text("title").notNull(),
    abstract: text("abstract").notNull(),
  },
  (table) => ({
    docIdIdx: uniqueIndex("pubmed_doc_id_idx").on(table.docId),
  })
);

export default pubmed;

export type PubmedTable = typeof pubmed;
