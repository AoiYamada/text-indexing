import DocRepository, { DbDoc } from "@/repositories/db/DocRepository";
import EsDocRepository from "@/repositories/elasticsearch/EsDocRepository";
import { int } from "@/types/alias";
import Service from "./interfaces/Service";

const limit = 20;

class SearchDocService implements Service {
  constructor(
    private docRepo: DocRepository,
    private esDocRepo: EsDocRepository
  ) {}

  async execute(query: string, page: int) {
    const offset = (page - 1) * limit;
    const esDocs = await this.esDocRepo.search(query, {
      from: offset,
      size: limit,
    });

    const docIds = esDocs.items.map((doc) => doc.doc_id);
    const dbDocs = await this.docRepo.search({ ids: docIds });

    // docs map for faster lookup
    const docsMap = dbDocs.reduce((acc, doc) => {
      acc[doc.id] = doc;

      return acc;
    }, {} as Record<number, DbDoc>);

    const items = esDocs.items.map((esDoc) => {
      // lookup from map
      const dbDoc = docsMap[esDoc.doc_id];

      return {
        id: esDoc.doc_id,
        type: esDoc.doc_type,
        filename: dbDoc.filename,
        sentences: esDoc.sentences,
      };
    });

    return {
      items,
      total: esDocs.total,
    };
  }
}

export default SearchDocService;
