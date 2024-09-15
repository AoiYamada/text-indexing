import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import doc from "./doc";
import { uniqueIndex } from "drizzle-orm/sqlite-core";
import { index } from "drizzle-orm/sqlite-core";

const docMeta = sqliteTable(
  "doc_meta",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    docId: integer("doc_id")
      .references(() => doc.id)
      .notNull(),
    hash: text("hash").notNull(),
    charCount: integer("char_count").notNull(),
    wordCount: integer("word_count").notNull(),
    sentenceCount: integer("sentence_count").notNull(),
  },
  (table) => ({
    docIdIdx: uniqueIndex("doc_meta_doc_id_idx").on(table.docId),
    hashIdx: index("doc_meta_hash_idx").on(table.hash),
    charCountIdx: index("doc_meta_char_count_idx").on(table.charCount),
    wordCountIdx: index("doc_meta_word_count_idx").on(table.wordCount),
    sentenceCountIdx: index("doc_meta_sentence_count_idx").on(
      table.sentenceCount
    ),
  })
);

export default docMeta;

export type DocMetaTable = typeof docMeta;
