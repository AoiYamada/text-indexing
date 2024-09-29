import { searchFileService } from "@/container";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

export const SearchFileQueryParser = z.object({
  filename: z.string().nullable(),
  page: z.preprocess(
    (val) => (val ? parseInt(val as string) : undefined),
    z.number().int().min(1).default(1)
  ),
  size: z.preprocess(
    (val) => (val ? parseInt(val as string) : undefined),
    z.number().int().min(1).default(20)
  ),
  orderBy: z
    .tuple([z.enum(["id", "filename", "createdAt"]), z.enum(["asc", "desc"])])
    .nullable(),
});

export type SearchFileQuery = z.infer<typeof SearchFileQueryParser>;

const FileParser = z.object({
  id: z.number().int(),
  filename: z.string(),
  createdAt: z.preprocess((val) => new Date(val as string), z.date()),
});

export const SearchFileResponseParser = z.object({
  items: z.array(FileParser),
  total: z.number().int(),
});

export type SearchFileResponse = z.infer<typeof SearchFileResponseParser>;
