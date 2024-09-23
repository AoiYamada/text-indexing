import Service from "./interfaces/Service";
import StemDocStatsRepository from "@/repositories/db/StemDocStatsRepository";

const limit = 50;

class StatsService implements Service {
  constructor(private stemDocStatsRepo: StemDocStatsRepository) {}

  async execute(page: number) {
    const offset = (page - 1) * limit;

    const stats = await this.stemDocStatsRepo.getStats(limit, offset);

    return stats;
  }
}

export default StatsService;
