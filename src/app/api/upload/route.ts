import { writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  // TODO: Handle file processing here?
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(`data-source/${file.name}`, fileBuffer);

  return NextResponse.json({ message: "File uploaded successfully" });
}
