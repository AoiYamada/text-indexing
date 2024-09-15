import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const stem = sqliteTable(
  "stem",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    term: text("term").notNull(),
  },
  (table) => ({
    termIdx: uniqueIndex("stem_term_idx").on(table.term),
  })
);

export default stem;

export type StemTable = typeof stem;
