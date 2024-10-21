import React from "react";
import Chart from "./Chart";

const ChartSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-12">
      <h1 className="flex flex-col items-center justify-center text-xl font-semibold sm:flex-row sm:text-2xl lg:text-3xl">
        Chart Section
      </h1>
      <Chart />
    </section>
  );
};

export default ChartSection;
