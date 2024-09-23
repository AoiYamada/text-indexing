// Manually hook up all DI dependencies LOL

import EsIndex from "./constants/EsIndex";
import db, { schema } from "./db";
import es from "./elasticsearch";
import CreateDocEmitter from "./events/CreateDocEmitter";
import DocMetaRepository from "./repositories/db/DocMetaRepository";
import DocRepository from "./repositories/db/DocRepository";
import PubmedRepository from "./repositories/db/PubmedRepository";
import StemDocStatsRepository from "./repositories/db/StemDocStatsRepository";
import StemRepository from "./repositories/db/StemRepository";
import TwitterRepository from "./repositories/db/TwitterRepository";
import EsDocRepository from "./repositories/elasticsearch/EsDocRepository";
import CreateDocService from "./services/CreateDocService";
import EnsureEsDocIndxService from "./services/EnsureEsDocIndxService";
import ResetDocService from "./services/ResetDocService";
import WaitGroup from "./utils/wait-group";
import CreateDocWorker from "./workers/CreateDocWorker";

// Elasticsearch Repositories
export const esDocRepo = new EsDocRepository(es, EsIndex.Doc);

// SQLite Repositories
export const docRepo = new DocRepository(db, schema.doc);
export const docMetaRepo = new DocMetaRepository(db, schema.docMeta);
export const stemRepo = new StemRepository(db, schema.stem);
export const stemDocStatsRepo = new StemDocStatsRepository(
  db,
  schema.stemDocStats
);
export const pubmedRepo = new PubmedRepository(db, schema.pubmed);
export const twitterRepo = new TwitterRepository(db, schema.twitter);

export const ensureEsDocIndxService = new EnsureEsDocIndxService(esDocRepo);
export const resetDocService = new ResetDocService(db, esDocRepo);
export const createDocService = new CreateDocService(
  docRepo,
  docMetaRepo,
  pubmedRepo,
  stemRepo,
  stemDocStatsRepo,
  esDocRepo
);

export const createDocEmitter = new CreateDocEmitter();
export const createDocWorker = new CreateDocWorker(
  createDocEmitter,
  createDocService,
  new WaitGroup()
);
