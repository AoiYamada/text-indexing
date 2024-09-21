import { pgTable, text, index, serial } from "drizzle-orm/pg-core";
import { DocTypeValues } from "../../constants/DocType";

const doc = pgTable(
  "doc",
  {
    id: serial("id").primaryKey(),
    type: text("type", {
      enum: DocTypeValues,
    }).notNull(),

    // Just for reference, you can add these fields if needed
    // createdAt: integer("created_at", { mode: "timestamp" })
    //   .notNull()
    //   .default(sql`(current_timestamp)`),
    // updatedAt: integer("updated_at", { mode: "timestamp" })
    //   .notNull()
    //   .default(sql`(current_timestamp)`),
  },
  (table) => ({
    typeIdx: index("doc_type_idx").on(table.type),
  })
);

export default doc;

export type DocTable = typeof doc;
