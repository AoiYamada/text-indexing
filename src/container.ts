// Manually hook up all DI dependencies LOL

import EsIndex from "./constants/EsIndex";
import db, { schema } from "./db";
import es from "./elasticsearch";
import DocMetaRepository from "./repositories/db/DocMetaRepository";
import DocRepository from "./repositories/db/DocRepository";
import PubmedRepository from "./repositories/db/PubmedRepository";
import StemDocStatsRepository from "./repositories/db/StemDocStatsRepository";
import StemRepository from "./repositories/db/StemRepository";
import TwitterRepository from "./repositories/db/TwitterRepository";
import EsDocRepository from "./repositories/elasticsearch/EsDocRepository";
import EnsureEsDocIndxService from "./services/EnsureEsDocIndxService";

// Elasticsearch Repositories
export const esDocRepo = new EsDocRepository(es, EsIndex.Doc);

// SQLite Repositories
export const docRepo = new DocRepository(db, schema.docs);
export const docMetaRepo = new DocMetaRepository(db, schema.docMeta);
export const stemRepo = new StemRepository(db, schema.stem);
export const stemDocStatsRepo = new StemDocStatsRepository(
  db,
  schema.stemDocStats
);
export const pubmedRepo = new PubmedRepository(db, schema.pubmed);
export const twitterRepo = new TwitterRepository(db, schema.twitter);

// TODO: services
export const ensureEsDocIndxService = new EnsureEsDocIndxService(esDocRepo);
