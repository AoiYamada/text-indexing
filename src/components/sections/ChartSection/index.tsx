"use client";

import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import ChartData from "@/types/ChartData";
import Chart from "./Chart";
import { DocAnalyzer } from "@/elasticsearch/indices/doc/analysis";
import { GetStatsResponse } from "@/app/api/stats/_types";

const switchDocAnalyzerMap: Record<string, Record<string, DocAnalyzer>> = {
  true: {
    true: DocAnalyzer.PorterStop,
    false: DocAnalyzer.Porter,
  },
  false: {
    true: DocAnalyzer.Stop,
    false: DocAnalyzer.Raw,
  },
}

const ChartSection = () => {
  const [isPorter, setIsPorter] = useState(true);
  const [isStopWords, setIsStopWords] = useState(false);
  const [chartData, setChartData] = useState<ChartData>([] as ChartData);

  // every time the switch is toggled, fetch the data again
  useEffect(
    // map the switch state to the fetch data

    () => {
      // fetch data here
      // on success, update the chart data
      const analyzer = switchDocAnalyzerMap[String(isPorter)][String(isStopWords)];
      fetch(`/api/stats?filter[docAnalyzer]=${analyzer}&limit=150`)
        .then((resp) => resp.json())
        .then((data: GetStatsResponse) => {
          setChartData(data.map((item) => ({
            label: item.term,
            value: item.count,
          })));
        });
    },
    // listen to the isPorter state
    [isPorter, isStopWords]
  );

  return (
    <section className="flex flex-col items-center justify-center gap-12">
      <h1 className="flex flex-col items-center justify-center text-xl font-semibold sm:flex-row sm:text-2xl lg:text-3xl">
        Chart Section
      </h1>
      <div className="flex flex-row gap-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="use_porter"
            checked={isPorter}
            onCheckedChange={setIsPorter}
          />
          <label htmlFor="use_porter">Porter Algorithm</label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="use_stopwords"
            checked={isStopWords}
            onCheckedChange={setIsStopWords}
          />
          <label htmlFor="use_stopwords">Stopwords</label>
        </div>
      </div>
      <Chart isPorter={isPorter} isStopWords={isStopWords} data={chartData} />
    </section>
  );
};

export default ChartSection;
