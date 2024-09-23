import DocRepository from "@/repositories/db/DocRepository";
import EsDocRepository from "@/repositories/elasticsearch/EsDocRepository";
import Service from "./interfaces/Service";

class SearchDocService implements Service {
  constructor(
    private docRepo: DocRepository,
    private esDocRepo: EsDocRepository
  ) {}

  async execute(query: string, page: number) {
    const docs = await this.esDocRepo.search(query);

    return docs;
  }
}
