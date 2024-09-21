import {
  integer,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import doc from "./doc";

const twitter = pgTable(
  "twitter",
  {
    id: serial("id").primaryKey(),
    docId: integer("doc_id")
      .references(() => doc.id)
      .notNull(),
    content: text("content").notNull(),
  },
  (table) => ({
    docIdIdx: uniqueIndex("twitter_doc_id_idx").on(table.docId),
  })
);

export default twitter;

export type TwitterTable = typeof twitter;
