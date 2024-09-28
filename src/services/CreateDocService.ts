import { eq } from "drizzle-orm";

import DocType from "../constants/DocType";
import { DocAnalyzer } from "../elasticsearch/indices/doc/analysis";
import DocMetaRepository from "../repositories/db/DocMetaRepository";
import DocRepository from "../repositories/db/DocRepository";
import PubmedRepository from "../repositories/db/PubmedRepository";
import StemDocStatsRepository from "../repositories/db/StemDocStatsRepository";
import StemRepository from "../repositories/db/StemRepository";
import EsDocRepository from "../repositories/elasticsearch/EsDocRepository";
import { int } from "../types/alias";
import hash from "../utils/hash";
import textStats from "../utils/text-stats";
import Service from "./interfaces/Service";
import textSplit from "../utils/text-split";
import logger from "../logger";

class CreateDocService implements Service {
  constructor(
    private docRepo: DocRepository,
    private docMetaRepo: DocMetaRepository,
    private pubmedRepo: PubmedRepository,
    private stemRepo: StemRepository,
    private stemDocStatsRepo: StemDocStatsRepository,
    private esDocRepo: EsDocRepository
  ) {}

  async execute(payload: CreateDocPayload) {
    switch (payload.type) {
      case DocType.pubmed:
        await this.createPubmedDoc(payload);
        break;
      // TODO: Implement createTwitterDoc
      // case DocType.twitter:
      //   await this.createTwitterDoc(doc.id, payload);
      //   break;
      default:
        throw new Error(`Invalid doc type: ${payload.type}`);
    }
  }

  private async createPubmedDoc(payload: CreatePubmedPayload) {
    const hashedContent = hash(payload.abstract);
    const isDuplicated = await this.isDuplicated(
      payload.abstract,
      hashedContent,
      DocType.pubmed
    );

    if (isDuplicated) {
      return;
    }

    const { id: docId } = await this.docRepo.create({
      type: payload.type,
      fileId: payload.fileId,
    });

    await Promise.all([
      this.updateStemStats(docId, DocType.pubmed, payload.abstract),
      this.pubmedRepo.create({
        docId,
        title: payload.title,
        abstract: payload.abstract,
      }),
      this.docMetaRepo.create({
        docId,
        hash: hashedContent,
        ...textStats(payload.abstract),
      }),
      this.esDocRepo.create({
        doc_id: docId,
        doc_type: DocType.pubmed,
        // short text can flush into es directly, for long text, use esDocRepo.update to append 1 sentence at a time
        sentences: textSplit(payload.abstract),
      }),
    ]);
  }

  // TODO: Implement createTwitterDoc

  private async updateStemStats(docId: int, docType: DocType, text: string) {
    const stemStats = await this.esDocRepo.analyze(text, DocAnalyzer.Default);

    await Promise.all(
      stemStats.map(async (stat) => {
        const stem = await this.stemRepo.upsert(stat.term);

        await this.stemDocStatsRepo.create({
          stemId: stem.id,
          docId,
          docType,
          count: stat.count,
        });
      })
    );
  }

  private async isDuplicated(
    content: string,
    hash: string,
    type: DocType
  ): Promise<boolean> {
    // check if the content already exists
    const metaData = await this.docMetaRepo.search(
      (t) => eq(t.hash, hash) // ideally, orm related code should be in the repository, refactor later
    );

    if (metaData.length > 0) {
      // hash collision, now need to check the actual content

      switch (type) {
        case DocType.pubmed: {
          const articles = await Promise.all(
            metaData.map(async (meta) => this.pubmedRepo.getByDocId(meta.docId))
          );

          for (const article of articles) {
            if (article?.abstract === content) {
              // content already exists
              logger.info(
                `Doc with same content already exists, content[${content.slice(
                  0,
                  50
                )}...]`
              );

              return true;
            }
          }
        }
        case DocType.twitter: {
          // TODO: Implement isDuplicated for Twitter
        }
      }
    }

    return false;
  }
}

export default CreateDocService;

export type CreateDocPayload = CreatePubmedPayload | CreateTwitterPayload;

type CreatePubmedPayload = {
  type: DocType.pubmed;
  fileId: int;
  title: string;
  abstract: string;
};

type CreateTwitterPayload = {
  type: DocType.twitter;
  fileId: int;
  content: string;
};
