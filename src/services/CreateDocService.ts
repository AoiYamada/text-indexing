import { eq } from "drizzle-orm";

import DocType from "../constants/DocType";
import { DocAnalyzerValues } from "../elasticsearch/indices/doc/analysis";
import DocMetaRepository from "../repositories/db/DocMetaRepository";
import DocRepository from "../repositories/db/DocRepository";
import PubmedRepository from "../repositories/db/PubmedRepository";
import GdeltRepository from "../repositories/db/GdeltRepository";
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
    private gdeltRepo: GdeltRepository,
    private stemRepo: StemRepository,
    private stemDocStatsRepo: StemDocStatsRepository,
    private esDocRepo: EsDocRepository
  ) {}

  async execute(payload: CreateDocPayload) {
    switch (payload.type) {
      case DocType.pubmed:
        await this.createPubmedDoc(payload);
        break;
      case DocType.gdelt:
        await this.createGdeltDoc(payload);
        break;
      default:
        throw new Error(`Invalid payload: ${JSON.stringify(payload)}`);
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

  private async createGdeltDoc(payload: CreateGdeltPayload) {
    const hashedContent = hash(payload.content);

    const isDuplicated = await this.isDuplicated(
      payload.content,
      hashedContent,
      DocType.gdelt
    );

    if (isDuplicated) {
      logger.info(`Doc with same content already exists, content[${payload.content.slice(0, 50)}...]`);
      return;
    }

    logger.info(`Creating gdelt doc, hash: ${hashedContent}`);

    const { id: docId } = await this.docRepo.create({
      type: payload.type,
      fileId: payload.fileId,
    });

    try {
      logger.info(`Creating es doc for gdelt docId: ${docId}`);

      await this.esDocRepo.create({
        doc_id: docId,
        doc_type: DocType.gdelt,
        // short text can flush into es directly, for long text, use esDocRepo.update to append 1 sentence at a time
        sentences: textSplit(payload.content),
      })
    } catch (err) {
      console.log(err, "es create error");
      throw err;
    }

    await Promise.all([
      this.updateStemStats(docId, DocType.gdelt, payload.content),
      this.gdeltRepo.create({
        docId,
        url: payload.url,
        title: payload.title,
        content: payload.content,
      }),
      this.docMetaRepo.create({
        docId,
        hash: hashedContent,
        ...textStats(payload.content),
      }),
    ]);
  }

  private async updateStemStats(docId: int, docType: DocType, text: string) {
    logger.info(`Updating stem stats for docId: ${docId}`);
    let stemStats: {
      term: string;
      count: number;
    }[] = [];

    for (const analyzer of DocAnalyzerValues) {
      try {
        stemStats = await this.esDocRepo.analyze(text, analyzer);
      } catch (err) {
        console.log(err, "analyze error");
        throw err;
      }

      logger.info(`Stem stats: ${stemStats.length}`);

      await Promise.all(
        stemStats.map(async (stat) => {
          const stem = await this.stemRepo.upsert(stat.term);

          await this.stemDocStatsRepo.create({
            stemId: stem.id,
            docId,
            docType,
            docAnalyzer: analyzer,
            count: stat.count,
          });
        })
      );
    }



    logger.info(`Stem stats updated for docId: ${docId}`);
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
        case DocType.gdelt: {
          const articles = await Promise.all(
            metaData.map(async (meta) => this.gdeltRepo.getByDocId(meta.docId))
          );

          for (const article of articles) {
            if (article?.content === content) {
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
      }
    }

    return false;
  }
}

export default CreateDocService;

export type CreateDocPayload = CreatePubmedPayload | CreateGdeltPayload;

type CreatePubmedPayload = {
  type: DocType.pubmed;
  fileId: int;
  title: string;
  abstract: string;
};

type CreateGdeltPayload = {
  type: DocType.gdelt;
  fileId: int;
  url: string;
  title: string;
  content: string;
};
