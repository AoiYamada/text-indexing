'use client';

import React, { FC } from "react";
import ChartData from "@/types/ChartData";

type ChartProps = {
  isPorter: boolean;
  isStopWords: boolean;
  data: ChartData;
};

const Chart: FC<ChartProps> = ({ isPorter, isStopWords, data }) => {
  console.table({ isPorter, isStopWords });
  // visx chart definition

  return (
    <div className="w-full h-auto bg-gray-100 flex items-center justify-center">
      {/* <h3>IsPorter: {JSON.stringify(isPorter)}</h3>
      <h3>IsStopWords: {JSON.stringify(isStopWords)}</h3> */}
      {
        // render the chart here
        data.length > 0 ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p className="text-lg font-semibold">Empty Chart</p>
        )
      }
    </div>
  );
};

export default Chart;
