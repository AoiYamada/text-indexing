import { int } from "@/types/alias";
import FileRepository from "@/repositories/db/FileRepository";
import DocRepository from "@/repositories/db/DocRepository";
import EsDocRepository from "@/repositories/elasticsearch/EsDocRepository";
import Service from "./interfaces/Service";

class DeleteFileService implements Service {
  constructor(
    private fileRepo: FileRepository,
    private docRepo: DocRepository,
    private esDocRepo: EsDocRepository
  ) {}

  async execute(id: int): Promise<void> {
    const doc = await this.docRepo.getByFileId(id);

    await Promise.all([
      // If CASCADE is set on the foreign key constraint, all related records will be deleted
      // Need to verify this with the database schema
      this.fileRepo.delete(id),
      this.esDocRepo.delete(doc.id),
    ]);

    return;
  }
}

export default DeleteFileService;
