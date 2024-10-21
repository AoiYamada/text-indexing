'use client';

import ChartData from "@/types/ChartData";
import React, { FC } from "react";

type ChartProps = {
  isPorter: boolean;
  isStopWords: boolean;
  data: ChartData;
};

const Chart: FC<ChartProps> = ({ isPorter, isStopWords, data }) => {
  console.table({ isPorter, isStopWords });

  return (
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
      <h3>IsPorter: {JSON.stringify(isPorter)}</h3>
      <h3>IsStopWords: {JSON.stringify(isStopWords)}</h3>
      <p className="text-lg font-semibold">Empty Chart</p>
      {/* {
        // render the chart here
        data.length > 0 && (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )
      } */}
    </div>
  );
};

export default Chart;
