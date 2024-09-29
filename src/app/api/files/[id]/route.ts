import { deleteFileService } from "@/container";
import { int } from "@/types/alias";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextRequest,
  { params }: { params: { id: int } }
) {
  const parsedParams = DeleteFileParamsParser.safeParse(params);

  if (!parsedParams.success) {
    return NextResponse.json({ message: "Invalid parameter" }, { status: 400 });
  }

  const { id } = parsedParams.data;

  await deleteFileService.execute(id);

  return NextResponse.json(undefined, { status: 200 });
}

const DeleteFileParamsParser = z.object({
  id: z.preprocess((val) => parseInt(val as string), z.number().int().min(1)),
});

export type DeleteFileParams = z.infer<typeof DeleteFileParamsParser>;
