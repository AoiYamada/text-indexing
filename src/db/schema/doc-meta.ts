import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import docs from "./docs";
import { uniqueIndex } from "drizzle-orm/sqlite-core";
import { index } from "drizzle-orm/sqlite-core";

const docMeta = sqliteTable(
  "doc_meta",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    docId: integer("doc_id")
      .references(() => docs.id)
      .notNull(),
    hash: text("hash").notNull(),
    charCount: integer("char_count").notNull(),
    wordCount: integer("word_count").notNull(),
    sentenceCount: integer("sentence_count").notNull(),
  },
  (table) => ({
    docIdIdx: uniqueIndex("doc_id_idx").on(table.docId),
    hashIdx: index("hash_idx").on(table.hash),
    charCountIdx: index("char_count_idx").on(table.charCount),
    wordCountIdx: index("word_count_idx").on(table.wordCount),
    sentenceCountIdx: index("sentence_count_idx").on(table.sentenceCount),
  })
);

export default docMeta;

export type DocMetaTable = typeof docMeta;
