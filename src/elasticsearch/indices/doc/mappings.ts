import { MappingTypeMapping } from "@elastic/elasticsearch/lib/api/types";

const docMappings: MappingTypeMapping = {
  properties: {
    doc_id: { type: "integer" },
    doc_type: { type: "keyword", normalizer: "lowercase" },
    sentences: {
      type: "text",
      analyzer: "default_analyzer",
      search_analyzer: "stop_analyzer",
      search_quote_analyzer: "default_analyzer",
    },
  },
};

export default docMappings;
