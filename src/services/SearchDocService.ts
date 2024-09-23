// import DocRepository from "@/repositories/db/DocRepository";
import EsDocRepository from "@/repositories/elasticsearch/EsDocRepository";
import Service from "./interfaces/Service";
// import { inArray } from "drizzle-orm";
// import DocType from "@/constants/DocType";
// import { z } from "zod";

const limit = 20;

class SearchDocService implements Service {
  constructor(
    // private docRepo: DocRepository,
    private esDocRepo: EsDocRepository
  ) {}

  async execute(query: string, page: number) {
    const offset = (page - 1) * limit;
    const esDocs = await this.esDocRepo.search(query, {
      from: offset,
      size: limit,
    });

    // TODO: retrieve more info from sql db, I've no time to finish this

    // const docIds = esDocs.items.map((doc) => doc.doc_id);

    // const dbDocs = await this.docRepo.search((table) =>
    //   inArray(table.id, docIds)
    // );

    // // docs map for faster lookup
    // const docsMap = dbDocs.reduce((acc, doc) => {
    //   acc[doc.id] = DbDocParser.parse(doc);

    //   return acc;
    // }, {} as Record<number, DbDoc>);

    // const result = esDocs.items.map((esDoc) => {
    //   const dbDoc = docsMap[esDoc.doc_id];

    //   return {
    //     id: esDoc.doc_id,
    //     type: dbDoc.type,
    //   };
    // });

    return {
      items: esDocs.items.map((esDoc) => ({
        id: esDoc.doc_id,
        type: esDoc.doc_type,
        sentences: esDoc.sentences,
        // more info here
        // TODO...
      })),
      total: esDocs.total,
    };
  }
}

export default SearchDocService;
