import { z } from "zod";

const LimitParser = z.preprocess((val) => {
  const num = parseInt(String(val), 10);

  if (isNaN(num)) {
    return 50;
  }

  if (num > 250) {
    return 250;
  }

  return num;
}, z.number().int().min(1).default(50));

export default LimitParser;

export type Limit = z.infer<typeof LimitParser>;
