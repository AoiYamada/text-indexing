import { IndicesIndexSettingsAnalysis } from "@elastic/elasticsearch/lib/api/types";

export enum DocAnalyzer {
  Raw = "raw_analyzer",
  Porter = "porter_analyzer",
  Stop = "stop_analyzer",
  PorterStop = "porter_stop_analyzer",
}

export enum DocFilter {
  Lowercase = "lowercase",
  Stop = "stop",
  Porter = "porter_stem",
}

export enum DocNormalizer {
  Lowercase = "lowercase",
}

const docAnalysis: IndicesIndexSettingsAnalysis = {
  analyzer: {
    [DocAnalyzer.Raw]: {
      type: "custom",
      tokenizer: "standard",
      filter: [DocFilter.Lowercase],
    },
    [DocAnalyzer.Porter]: {
      type: "custom",
      tokenizer: "standard",
      filter: [DocFilter.Lowercase, DocFilter.Porter],
    },
    [DocAnalyzer.Stop]: {
      type: "custom",
      tokenizer: "standard",
      filter: [DocFilter.Lowercase, DocFilter.Stop],
    },
    [DocAnalyzer.PorterStop]: {
      type: "custom",
      tokenizer: "standard",
      filter: [DocFilter.Lowercase, DocFilter.Porter, DocFilter.Stop],
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
  },
};

export default docAnalysis;

export const DocAnalyzerValues = Object.values(DocAnalyzer) as [
  DocAnalyzer,
  ...DocAnalyzer[]
];
