import { textStatsA, textStatsB } from "../text-stats";
import Benchmark from "benchmark";

const sampleText =
  "This is a sample text. It contains multiple sentences! Does it work well? Let's find out.";

const suite = new Benchmark.Suite();

suite
  .add("textStatsA", function () {
    textStatsA(sampleText);
  })
  .add("textStatsB", function () {
    textStatsB(sampleText);
  })
  .on("cycle", function (event: Benchmark.Event) {
    console.log(String(event.target));
  })
  .on("complete", function (this: Benchmark.Suite) {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: false });
