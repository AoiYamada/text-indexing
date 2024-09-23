import { z } from "zod";

const PageParser = z.preprocess((val) => {
  const num = parseInt(String(val), 10);

  return isNaN(num) ? 1 : num;
}, z.number().int().min(1).default(1));

export default PageParser;

export type Page = z.infer<typeof PageParser>;
