import crypto from "crypto";

function hash(data: string): string {
  return crypto.createHash("sha1").update(data).digest("hex");
}

export default hash;
