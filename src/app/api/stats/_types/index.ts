import{ DocTypeValues } from "@/constants/DocType";
import { DocAnalyzerValues } from "@/elasticsearch/indices/doc/analysis";
import { z } from "zod";

export const GetStatsResponseParser = z.array(
  z.object({
    id: z.number(),
    docType: z.enum(DocTypeValues),
    term: z.string().default("N/A"),
    count: z.number().default(0),
  })
);

export type GetStatsResponse = z.infer<typeof GetStatsResponseParser>;
export type StatsItem = GetStatsResponse[number];

export const GetStatsFilterParser = z.object({
  docType: z.enum(DocTypeValues).optional(),
  docAnalyzer: z.enum(DocAnalyzerValues).optional(),
});

export type GetStatsFilter = z.infer<typeof GetStatsFilterParser>;
