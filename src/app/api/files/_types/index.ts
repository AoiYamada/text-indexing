import { z } from "zod";

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
