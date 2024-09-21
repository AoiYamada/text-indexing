import {
  integer,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import doc from "./doc";

const pubmed = pgTable(
  "pubmed",
  {
    id: serial("id").primaryKey(),
    docId: integer("doc_id")
      .references(() => doc.id)
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
