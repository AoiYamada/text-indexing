import frontendConfig from "@/configs/frontend-config";
import { StatsResponse } from "@/app/api/stats/_types";
import React from "react";
import WordCloud from "../WordCloud";

const OverallStatsSection = async () => {
  const data = await fetch(`${frontendConfig.apiUrl}/stats?page=1`);
  const stats: StatsResponse = await data.json();

  return (
    <section className="w-full flex flex-col items-center justify-center gap-12">
      <h1 className="flex flex-col items-center justify-center text-xl font-semibold sm:flex-row sm:text-2xl lg:text-3xl">
        {" "}
        Overall Stats
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
