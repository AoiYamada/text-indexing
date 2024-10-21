import DocType from "@/constants/DocType";
import {
  createDocEmitter,
  createDocWorker,
  createFileService,
} from "@/container";
import { CreateDocPayload } from "@/services/CreateDocService";
import GdeltParser from "@/utils/parsers/GdeltParser";
import PubmedParser from "@/utils/parsers/PubmedParser";
// import { writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const files = data.getAll("files");
  const docType = data.get("source") as DocType;

  // For production, you should validate the files
  // 1. Check the filename, which should be a string satisfying /^[a-zA-Z0-9-_]+\.(xml|json)$/ to prevent path traversal
  // 2. Check the mimetype, which should be "application/xml" for Pubmed XML files or "application/json" for Twitter JSON files to prevent file type spoofing
  // 3. Check the file size, which should be less than 10MB to prevent DoS attacks?
  // 4. Check the file content, which should be a valid XML or JSON file to prevent malformed data
  // 5. Check the file content, which should be a valid Pubmed XML or Twitter JSON file to prevent invalid data

  if (!files || files.length === 0) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  if (files.find((file) => typeof file === "string")) {
    return NextResponse.json(
      { message: "Some file malformed" },
      { status: 400 }
    );
  }

  if (files.length > 10) {
    return NextResponse.json(
      { message: "Too many files uploaded" },
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

    if (
      (file.type !== "text/xml" && file.type !== "application/json") ||
      !file.name.match(/^[a-zA-Z0-9-_]+\.(xml|json)$/)
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid file, only Pubmed XML or Twitter JSON files with filename in the format of /^[a-zA-Z0-9-_]+\\.(xml|json)$/ are allowed",
        },
        { status: 400 }
      );
    }
  }

  const parser = new {
    [DocType.pubmed]: PubmedParser,
    [DocType.gdelt]: GdeltParser,
    // Add more parsers heres
  }[docType]();

  for (const file of files) {
    if (typeof file === "string") continue;

    // wait 1 second to simulate processing time, keep this for testing
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    // just for testing, write the file to disk for inspection
    // writeFileSync(`data-source/${file.name}`, fileBuffer);

    // TODO: validate DocType

    const articles = parser.parse(fileBuffer);

    if (!articles) {
      continue;
    }

    const { id: fileId } = await createFileService.execute({
      filename: file.name,
    });

    for (const article of articles) {
      createDocEmitter.emitCreateDocEvent({
        type: docType,
        fileId,
        ...article,
      } as CreateDocPayload);
    }
  }

  createDocEmitter.emitDoneEvent();

  await defer;

  return NextResponse.json({ message: "File uploaded successfully" });
}
