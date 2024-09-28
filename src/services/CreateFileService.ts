import FileRepository from "@/repositories/db/FileRepository";
import Service from "./interfaces/Service";

class CreateFileService implements Service {
  constructor(private fileRepo: FileRepository) {}

  async execute(payload: CreateFilePayload) {
    return this.fileRepo.create({
      filename: payload.filename,
    });
  }
}

export default CreateFileService;

export type CreateFilePayload = {
  filename: string;
};
