import FileRepository from "@/repositories/db/FileRepository";
import { int } from "@/types/alias";

class SearchFileService {
  constructor(private fileRepo: FileRepository) {}

  public async execute(
    query: SearchFileQuery,
    options: SearchFileOptions = {}
  ) {
    const limit = options.size || 20;
    const offset = ((options.page || 1) - 1) * limit;

    const [files, total] = await Promise.all([
      this.fileRepo.search(query, {
        limit,
        offset,
        orderBy: options.orderBy,
      }),
      this.fileRepo.count(query),
    ]);

    return {
      items: files,
      total: total,
    };
  }
}

export default SearchFileService;

type SearchFileQuery = {
  filename?: string;
};

type SearchFileOptions = {
  page?: int;
  size?: int;
  orderBy?: ["id" | "filename" | "createdAt", "asc" | "desc"];
};
