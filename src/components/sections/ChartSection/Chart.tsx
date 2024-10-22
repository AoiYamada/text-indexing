"use client";

import React, { FC } from "react";
import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { scaleLog, scaleBand } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import ChartData from "@/types/ChartData";

type ChartProps = {
  isPorter: boolean;
  isStopWords: boolean;
  data: ChartData;
};

const Chart: FC<ChartProps> = ({ isPorter, isStopWords, data }) => {
  console.table({ isPorter, isStopWords });
  // visx chart definition
  const width = 500;
  const height = 300;
  const margin = { top: 20, right: 30, bottom: 70, left: 60 };

  // 只取前 30 筆資料進行顯示
  const displayedData = data.slice(0, 36);

  // 定義 x 和 y 軸的比例尺
  const xScale = scaleBand<string>({
    domain: displayedData.map((d) => d.label),
    padding: 0,
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLog<number>({
    // domain 不能有 0 或負值
    domain: [
      Math.min(...displayedData.map((d) => d.value)) || 1, // 確保最小值不為 0
      Math.max(...displayedData.map((d) => d.value)) || 1, // 確保最大值不為 0
    ],
    range: [height - margin.bottom, margin.top],
    base: 10,
    nice: true,
  });

  // const tickValues = data.map((d) => d.label);

  return (
    <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
      {/* <h3>IsPorter: {JSON.stringify(isPorter)}</h3>
      <h3>IsStopWords: {JSON.stringify(isStopWords)}</h3> */}
      {data.length > 0 ? (
        // render the chart here
        <svg width={width} height={height}>
          <AxisBottom
            top={height - margin.bottom}
            scale={xScale}
            tickValues={displayedData.map((d) => d.label)}
            tickLabelProps={() => ({
              angle: -75, // 將標籤旋轉
              textAnchor: "end",
              fontSize: 14, // 調整字體大小
            })}
          />
          <AxisLeft left={margin.left} scale={yScale} />

          <LinePath
            data={displayedData}
            x={(d) => (xScale(d.label) ?? 0) + xScale.bandwidth() / 2} // 這裡改成 label
            y={(d) => yScale(d.value)}
            stroke="#8884d8"
            strokeWidth={2}
            curve={curveMonotoneX}
          />
        </svg>
      ) : (
        <p className="text-lg font-semibold">Empty Chart</p>
      )}
    </div>
  );
};

export default Chart;
