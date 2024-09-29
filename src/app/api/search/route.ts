import DocType from "@/constants/DocType";
import { searchDocService } from "@/container";
import PageParser from "@/types/Page";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const rawQuery = request.nextUrl.searchParams.get("q");
  const rawPage = request.nextUrl.searchParams.get("page");

  const parsedQuery = GetStatsQueryParser.safeParse(rawQuery);

  if (!parsedQuery.success) {
    return NextResponse.json(
      { message: "Invalid query string" },
      { status: 400 }
    );
  }

  const parsedPage = PageParser.safeParse(rawPage);

  if (!parsedPage.success) {
    return NextResponse.json(
      { message: "Invalid page number" },
      { status: 400 }
    );
  }

  const query = parsedQuery.data;
  const page = parsedPage.data;
  const result = await searchDocService.execute(query, page);

  return NextResponse.json(SearchResponseParser.parse(result));
}

const GetStatsQueryParser = z.string().default("");

const SearchResponseParser = z.object({
  items: z.array(
    z.object({
      id: z.number(),
      type: z.enum([DocType.pubmed, DocType.twitter]),
      sentences: z.array(z.string()),
    })
  ),
  total: z.number(),
});

export type SearchResponse = z.infer<typeof SearchResponseParser>;
