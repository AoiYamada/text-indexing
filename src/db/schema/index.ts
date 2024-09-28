import docMeta from "./doc-meta";
import doc from "./doc";
import file from "./file";
import pubmed from "./pubmed";
import stem from "./stem";
import stemDocStats from "./stem-doc-stats";
import twitter from "./twitter";

// keep for reference, we use `references` over `relations` in drizzle-orm
// ref: https://orm.drizzle.team/docs/rqb#foreign-keys

// import fileRelation from "./relations/file-relation";
// import docRelation from "./relations/doc-relation";

export {
  // schemas
  docMeta,
  doc,
  file,
  pubmed,
  stem,
  stemDocStats,
  twitter,
  // relations
  // fileRelation,
  // docRelation,
};
