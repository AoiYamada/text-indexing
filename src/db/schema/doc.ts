import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { DocTypeValues } from "../../constants/DocType";
import file from "./file";

const doc = sqliteTable(
  "doc",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    type: text("type", {
      enum: DocTypeValues,
    }).notNull(),
    fileId: integer("file_id")
      .references(() => file.id, { onDelete: "cascade" })
      .notNull(),

    // Just for reference, you can add these fields if needed
    // createdAt: integer("created_at", { mode: "timestamp" })
    //   .notNull()
    //   .default(sql`(current_timestamp)`),
  },
  (table) => ({
    fileIdIdx: index("doc_file_id_idx").on(table.fileId),
    typeIdx: index("doc_type_idx").on(table.type),
  })
);

export default doc;

export type DocTable = typeof doc;
