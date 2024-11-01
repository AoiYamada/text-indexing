import StemDocStatsRepository, { StemDocStatsFilter } from "@/repositories/db/StemDocStatsRepository";
import { int } from "@/types/alias";
import Service from "./interfaces/Service";

class GetStatsService implements Service {
  constructor(private stemDocStatsRepo: StemDocStatsRepository) {}

  async execute(page: int, filter?: StemDocStatsFilter, limit?: int) {
    // if limit is not provided, use the default limit
    limit = limit ?? 50;

    const offset = (page - 1) * limit;

    const stats = await this.stemDocStatsRepo.getStats(limit, offset, filter);

    return stats;
  }
}

export default GetStatsService;
