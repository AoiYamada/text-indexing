import { IndicesIndexSettings } from "@elastic/elasticsearch/lib/api/types";
import docAnalysis from "./analysis";

const docIndex: IndicesIndexSettings = {
  number_of_shards: 1, // default is 1
  number_of_replicas: 1, // default is 1
  analysis: docAnalysis,
};

export default docIndex;
