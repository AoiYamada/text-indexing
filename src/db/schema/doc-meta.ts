import {
  index,
  integer,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import doc from "./doc";

const docMeta = pgTable(
  "doc_meta",
  {
    id: serial("id").primaryKey(),
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
