import EsDocRepository from "../repositories/elasticsearch/EsDocRepository";
import Service from "./interfaces/Service";

class EnsureEsDocIndxService implements Service {
  constructor(private esDocRepo: EsDocRepository) {}

  async execute() {
    return this.esDocRepo.init();
  }
}

export default EnsureEsDocIndxService;
