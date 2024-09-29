import { statsService } from "@/container";
import PageParser from "@/types/Page";
import { NextRequest, NextResponse } from "next/server";
import { GetStatsResponseParser } from "./_types";

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

  return NextResponse.json(GetStatsResponseParser.parse(stats));
}
