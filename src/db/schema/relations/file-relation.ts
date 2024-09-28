// not in use
// to avoid circular dependencies, we import the related models in a separate file

import { relations } from "drizzle-orm";
import file from "../file";
import doc from "../doc";

const fileRelation = relations(file, ({ many }) => ({
  docs: many(doc),
}));

export default fileRelation;
