import { statsService } from "@/container";
import PageParser from "@/types/Page";
import { NextRequest, NextResponse } from "next/server";
import { GetStatsFilterParser, GetStatsResponseParser } from "./_types";

export async function GET(request: NextRequest) {
  const rawPage = request.nextUrl.searchParams.get("page");
  const rawFilter: Record<string, string> = {};
  // Extract all filter parameters in the form of filter[key]=value
  request.nextUrl.searchParams.forEach((value, key) => {
    const startsWith ="filter[";
    if (key.startsWith(startsWith)) {
      const filterKey = key.slice(startsWith.length, -1); // Extract the key inside the brackets
      rawFilter[filterKey] = value;
    }
  });

  const parsedPage = PageParser.safeParse(rawPage);
  const parsedFilter = GetStatsFilterParser.safeParse(rawFilter);

  if (!parsedPage.success) {
    return NextResponse.json(
      { message: "Invalid page number" },
      { status: 400 }
    );
  }

  if (!parsedFilter.success) {
    return NextResponse.json(
      { message: "Invalid filter", errors: parsedFilter.error },
      { status: 400 }
    );
  }

  const page = parsedPage.data;
  const filter = parsedFilter.data;

  const stats = await statsService.execute(page, filter);

  return NextResponse.json(GetStatsResponseParser.parse(stats));
}
