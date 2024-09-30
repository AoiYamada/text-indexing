import DocRepository from "@/repositories/db/DocRepository";
import EsDocRepository from "@/repositories/elasticsearch/EsDocRepository";
import { int } from "@/types/alias";
import Service from "./interfaces/Service";
// import DocType from "@/constants/DocType";
// import { z } from "zod";

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

    // TODO: retrieve more info from sql db, I've no time to finish this

    // console.log(JSON.stringify(esDocs, null, 2))
    const docIds = esDocs.items.map((doc) => doc.doc_id);
    // console.log(docIds);

    const dbDocs = await this.docRepo.search({ ids: docIds });

    // docs map for faster lookup
    const docsMap = dbDocs.reduce(
      (acc, doc) => {
        acc[doc.id] = doc;

        return acc;
      },
      {} as Record<
        number,
        {
          id: number;
          type: string;
          filename: string | null;
        }
      >
    );

    const items = esDocs.items.map((esDoc) => {
      // lookup from map
      const dbDoc = docsMap[esDoc.doc_id];

      return {
        id: esDoc.doc_id,
        type: esDoc.doc_type,
        filename: dbDoc.filename ?? "",
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
