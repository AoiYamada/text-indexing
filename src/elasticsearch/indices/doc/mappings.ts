import { MappingTypeMapping } from "@elastic/elasticsearch/lib/api/types";

const docMappings: MappingTypeMapping = {
  properties: {
    doc_id: { type: "integer" },
    doc_type: { type: "keyword", normalizer: "lowercase" },
    // Filter results in array fields is only available in nested objects
    // Reference: https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html
    sentences: {
      type: "nested",
      properties: {
        content: {
          type: "text",
          analyzer: "default_analyzer",
          search_analyzer: "stop_analyzer",
          search_quote_analyzer: "default_analyzer",
        },
      },
    },
  },
};

export default docMappings;
