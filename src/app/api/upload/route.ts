import DocType from "@/constants/DocType";
import { createDocEmitter, createDocWorker } from "@/container";
import PubmedParser from "@/utils/parsers/PubmedParser";
import { writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const files = data.getAll("files");

  // For production, you should validate the files

  if (
    !files ||
    files.length === 0 ||
    files.find((file) => typeof file === "string")
  ) {
    return NextResponse.json(
      { message: "Some file malformed" },
      { status: 400 }
    );
  }

  let resolver: () => void;

  const defer = new Promise((resolve) => {
    resolver = () => resolve(null);
  });

  // Not ideal for production, use a queue system instead
  createDocWorker.start(resolver!);

  for (const file of files) {
    if (typeof file === "string") continue;

    // wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    writeFileSync(`data-source/${file.name}`, fileBuffer);

    // parse xml
    const articles = new PubmedParser().parse(fileBuffer);

    for (const article of articles) {
      createDocEmitter.emitCreateDocEvent({
        type: DocType.pubmed,
        title: article.title,
        abstract: article.abstract,
      });
    }
  }

  createDocEmitter.emitDoneEvent();

  await defer;

  return NextResponse.json({ message: "File uploaded successfully" });
}
