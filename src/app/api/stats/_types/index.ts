import DocType from "@/constants/DocType";
import { z } from "zod";

export const GetStatsResponseParser = z.array(
  z.object({
    id: z.number(),
    docType: z.enum(Object.values(DocType) as [string, ...string[]]),
    term: z.string().default("N/A"),
    count: z.number().default(0),
  })
);

export type GetStatsResponse = z.infer<typeof GetStatsResponseParser>;
export type StatsItem = GetStatsResponse[number];
