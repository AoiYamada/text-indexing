// not in use

import { relations } from "drizzle-orm";
import file from "../file";
import doc from "../doc";

const docRelation = relations(doc, ({ one }) => ({
  file: one(file, {
    fields: [doc.fileId],
    references: [file.id],
  }),
}));

export default docRelation;
