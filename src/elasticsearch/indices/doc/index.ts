import { IndicesIndexSettings } from "@elastic/elasticsearch/lib/api/types";
import docAnalysis from "./analysis";
import docMappings from "./mappings";

const docIndex: IndicesIndexSettings = {
  number_of_shards: 1, // default is 1
  number_of_replicas: 1, // default is 1
  analysis: docAnalysis,
  mappings: docMappings,
};

export default docIndex;
