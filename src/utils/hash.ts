import crypto from "crypto";

function hash(data: string): string {
  return crypto.createHash("sha1").update(data).digest("base64");
}

export default hash;
