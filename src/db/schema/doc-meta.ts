import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import doc from "./doc";

const docMeta = sqliteTable(
  "doc_meta",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    docId: integer("doc_id")
      .references(() => doc.id)
      .notNull(),
    hash: text("hash").notNull(),
    totalCharCount: integer("total_char_count").notNull(),
    nonSpaceCharCount: integer("non_space_char_count").notNull(),
    wordCount: integer("word_count").notNull(),
    sentenceCount: integer("sentence_count").notNull(),
    asciiCount: integer("ascii_count").notNull(),
    nonAsciiCount: integer("non_ascii_count").notNull(),
    spaceCount: integer("space_count").notNull(),
  },
  (table) => ({
    docIdIdx: uniqueIndex("doc_meta_doc_id_idx").on(table.docId),
    hashIdx: index("doc_meta_hash_idx").on(table.hash),
    totalCharCountIdx: index("doc_meta_total_char_count_idx").on(
      table.totalCharCount
    ),
    nonSpaceCharCountIdx: index("doc_meta_non_space_char_count_idx").on(
      table.nonSpaceCharCount
    ),
    wordCountIdx: index("doc_meta_word_count_idx").on(table.wordCount),
    sentenceCountIdx: index("doc_meta_sentence_count_idx").on(
      table.sentenceCount
    ),
    asciiCountIdx: index("doc_meta_ascii_count_idx").on(table.asciiCount),
    nonAsciiCountIdx: index("doc_meta_non_ascii_count_idx").on(
      table.nonAsciiCount
    ),
    spaceCountIdx: index("doc_meta_space_count_idx").on(table.spaceCount),
  })
);

export default docMeta;

export type DocMetaTable = typeof docMeta;
