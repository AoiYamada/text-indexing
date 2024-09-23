import DocType from "@/constants/DocType";
import { createDocEmitter, createDocWorker } from "@/container";
import PubmedParser from "@/utils/parsers/PubmedParser";
import { writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(`data-source/${file.name}`, fileBuffer);

  //   DO SOMETHING
  // parse xml
  const articles = new PubmedParser().parse(fileBuffer);
//   console.log(articles) // verify

  createDocWorker.start();

  for (const article of articles) {
    createDocEmitter.emitCreateDocEvent({
      type: DocType.pubmed,
      title: article.title,
      abstract: article.abstract,
    });
  }

  createDocEmitter.emitDoneEvent();

  return NextResponse.json({ message: "File uploaded successfully" });
}
