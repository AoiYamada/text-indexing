import { DbClient } from "../db";
import EsDocRepository from "../repositories/elasticsearch/EsDocRepository";
import Service from "./interfaces/Service";

class CreateDocService implements Service {
  constructor(private db: DbClient, private esDocRepo: EsDocRepository) {}

  async execute() {
    // TODO
  }
}

export default CreateDocService;
