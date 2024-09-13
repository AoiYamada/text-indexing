import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const stem = sqliteTable("stem", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  term: text("term").notNull(),
});

export default stem;
