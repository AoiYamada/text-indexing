import { IndicesIndexSettingsAnalysis } from "@elastic/elasticsearch/lib/api/types";

export enum DocAnalyzer {
  Stop = "stop_analyzer",
  Default = "default_analyzer",
}

export enum DocFilter {
  Lowercase = "lowercase",
  Stop = "stop",
  Snowball = "snowball",
}

export enum DocNormalizer {
  Lowercase = "lowercase",
}

const docAnalysis: IndicesIndexSettingsAnalysis = {
  analyzer: {
    [DocAnalyzer.Stop]: {
      type: "custom",
      tokenizer: "standard",
      filter: [DocFilter.Lowercase, DocFilter.Snowball, DocFilter.Stop],
    },
    [DocAnalyzer.Default]: {
      type: "custom",
      tokenizer: "standard",
      filter: [DocFilter.Lowercase, DocFilter.Snowball],
    },
  },
  normalizer: {
    [DocNormalizer.Lowercase]: {
      type: "lowercase",
    },
  },
  filter: {
    [DocFilter.Stop]: {
      type: "stop",
      stopwords: "_english_",
    },
    [DocFilter.Snowball]: {
      type: "snowball",
      language: "English",
    },
  },
};

export default docAnalysis;
