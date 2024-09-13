import { IndicesIndexSettingsAnalysis } from "@elastic/elasticsearch/lib/api/types";

const docAnalysis: IndicesIndexSettingsAnalysis = {
  analyzer: {
    stop_analyzer: {
      type: "custom",
      tokenizer: "standard",
      filter: ["lowercase", "snowball", "stop"],
    },
    default_analyzer: {
      type: "custom",
      tokenizer: "standard",
      filter: ["lowercase", "snowball"],
    },
  },
  normalizer: {
    lowercase: {
      type: "lowercase",
    },
  },
  filter: {
    stop: {
      type: "stop",
      stopwords: "_english_",
    },
    snowball: {
      type: "snowball",
      language: "English",
    },
  },
};

export default docAnalysis;
