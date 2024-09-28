import { int } from "@/types/alias";
import FileRepository from "@/repositories/db/FileRepository";
import Service from "./interfaces/Service";

class DeleteFileService implements Service {
  constructor(private readonly fileRepo: FileRepository) {}

  async execute(id: int): Promise<void> {
    // TODO
    console.log(id);
  }
}

export default DeleteFileService;
