import frontendConfig from "@/configs/frontend-config";
import React, { FC } from "react";
import FilesList from "./FilesList";
import { SearchFileResponseParser } from "@/app/api/files/_types";
import { cn } from "@/lib/utils";

const UploadedFiles: FC<UploadFilesProps> = async ({ className }) => {
  const data = await fetch(`${frontendConfig.apiUrl}/files?page=1`);
  const rawFiles = await data.json();
  const files = SearchFileResponseParser.parse(rawFiles);

  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center gap-12",
        className
      )}
    >
      <h1 className="flex flex-col items-center justify-center text-xl font-semibold sm:flex-row sm:text-2xl lg:text-3xl">
        Uploaded Files
      </h1>
      <FilesList className="w-full" defaultFiles={files} />
    </section>
  );
};

export default UploadedFiles;

export type UploadFilesProps = {
  className?: string;
};
