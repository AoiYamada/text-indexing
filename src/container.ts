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
import GdeltRepository from "./repositories/db/GdeltRepository";
import EsDocRepository from "./repositories/elasticsearch/EsDocRepository";
import CreateDocService from "./services/CreateDocService";
import EnsureEsDocIndxService from "./services/EnsureEsDocIndxService";
import ResetDocService from "./services/ResetDocService";
import SearchDocService from "./services/SearchDocService";
import GetStatsService from "./services/GetStatsService";
import CreateFileService from "./services/CreateFileService";
import DeleteFileService from "./services/DeleteFileService";
import SearchFileService from "./services/SearchFileService";
import WaitGroup from "./utils/wait-group";
import CreateDocWorker from "./workers/CreateDocWorker";
import FileRepository from "./repositories/db/FileRepository";

// Elasticsearch Repositories
export const esDocRepo = new EsDocRepository(es, EsIndex.Doc);

// SQLite Repositories
export const docRepo = new DocRepository(db, schema.doc, schema.file);
export const docMetaRepo = new DocMetaRepository(db, schema.docMeta);
export const fileRepo = new FileRepository(db, schema.file);
export const stemRepo = new StemRepository(db, schema.stem);
export const stemDocStatsRepo = new StemDocStatsRepository(
  db,
  schema.stemDocStats,
  schema.stem
);
export const pubmedRepo = new PubmedRepository(db, schema.pubmed);
export const gdeltRepo = new GdeltRepository(db, schema.gdelt);

// Services
export const ensureEsDocIndxService = new EnsureEsDocIndxService(esDocRepo);
export const resetDocService = new ResetDocService(db, esDocRepo);
export const createDocService = new CreateDocService(
  docRepo,
  docMetaRepo,
  pubmedRepo,
  gdeltRepo,
  stemRepo,
  stemDocStatsRepo,
  esDocRepo
);
export const statsService = new GetStatsService(stemDocStatsRepo);
export const searchDocService = new SearchDocService(docRepo, esDocRepo);
export const createFileService = new CreateFileService(fileRepo);
export const deleteFileService = new DeleteFileService(
  fileRepo,
  docRepo,
  esDocRepo
);
export const searchFileService = new SearchFileService(fileRepo);

export const createDocEmitter = new CreateDocEmitter();
export const createDocWorker = new CreateDocWorker(
  createDocEmitter,
  createDocService,
  new WaitGroup()
);
