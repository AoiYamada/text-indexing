import DocType from "@/constants/DocType";
import { z } from "zod";

export const StatsResponseParser = z.array(
  z.object({
    id: z.number(),
    docType: z.enum([DocType.pubmed, DocType.twitter]),
    term: z.string().default("N/A"),
    count: z.number().default(0),
  })
);

export type StatsResponse = z.infer<typeof StatsResponseParser>;
export type StatsItem = StatsResponse[number];
