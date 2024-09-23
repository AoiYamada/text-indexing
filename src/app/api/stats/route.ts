import DocType from "@/constants/DocType";
import { statsService } from "@/container";
import PageParser from "@/types/Page";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const rawPage = request.nextUrl.searchParams.get("page");

  const parsedPage = PageParser.safeParse(rawPage);

  if (!parsedPage.success) {
    return NextResponse.json(
      { message: "Invalid page number" },
      { status: 400 }
    );
  }

  const page = parsedPage.data;

  const stats = await statsService.execute(page);

  return NextResponse.json(StatsResponseParser.parse(stats));
}

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
