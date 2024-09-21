import { serial, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";

const stem = pgTable(
  "stem",
  {
    id: serial("id").primaryKey(),
    term: text("term").notNull(),
  },
  (table) => ({
    termIdx: uniqueIndex("stem_term_idx").on(table.term),
  })
);

export default stem;

export type StemTable = typeof stem;
