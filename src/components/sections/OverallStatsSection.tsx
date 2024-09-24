import React from "react";
import { StatsResponse } from "@/app/api/stats/route";
import config from "@/configs";
import WordCloud from "../WordCloud";

const OverallStatsSection = async () => {
  const data = await fetch(`${config.app.apiUrl}/stats?page=1`);
  const stats: StatsResponse = await data.json();

  return (
    <section className="w-full flex flex-col items-center justify-center gap-12">
      <h1 className="flex flex-col items-center justify-center text-3xl font-semibold sm:flex-row sm:text-4xl lg:text-5xl">
        OverallStatsSection
      </h1>
      {stats.length === 0 ? (
        <div>
          <p>No data</p>
        </div>
      ) : (
        <WordCloud data={stats} />
      )}
    </section>
  );
};

export default OverallStatsSection;
