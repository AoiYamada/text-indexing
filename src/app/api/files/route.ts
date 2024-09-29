import { searchFileService } from "@/container";
import { NextRequest, NextResponse } from "next/server";
import { SearchFileQueryParser, SearchFileResponseParser } from "./_types";

export async function GET(request: NextRequest) {
  const rawFilename = request.nextUrl.searchParams.get("filename");
  const rawPage = request.nextUrl.searchParams.get("page");
  const rawSize = request.nextUrl.searchParams.get("size");
  // we don't accept indices array
  const rawOrderBy =
    request.nextUrl.searchParams.getAll("orderBy").length > 0
      ? request.nextUrl.searchParams.getAll("orderBy")
      : request.nextUrl.searchParams.getAll("orderBy[]");

  const parsedQuery = SearchFileQueryParser.safeParse({
    filename: rawFilename,
    page: rawPage,
    size: rawSize,
    orderBy: rawOrderBy,
  });

  if (!parsedQuery.success) {
    return NextResponse.json(
      {
        message: `Invalid query string: ${JSON.stringify(parsedQuery.error)}`,
      },
      { status: 400 }
    );
  }

  const query = parsedQuery.data;

  const result = await searchFileService.execute(
    { filename: query.filename || undefined },
    { page: query.page, size: query.size, orderBy: query.orderBy || undefined }
  );

  return NextResponse.json(SearchFileResponseParser.parse(result));
}
