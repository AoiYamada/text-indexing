"use client";

import { SearchFileResponse } from "@/app/api/files/_types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import React, { FC, useState } from "react";

const FilesList: FC<FilesListProps> = ({ className, defaultFiles }) => {
  const [files] = useState(defaultFiles.items);

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/files/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      // Handle error
      console.error("Failed to delete file");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center gap-2",
        className
      )}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#Id</TableHead>
            <TableHead>Filename</TableHead>
            <TableHead>Create time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell>{file.id}</TableCell>
              <TableCell>{file.filename}</TableCell>
              <TableCell>
                {format(file.createdAt, "yyyy-MM-dd HH:mm")}
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(file.id)}
                >
                  <Trash2 className="w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* TODO: pagination */}
      </Table>
    </div>
  );
};

export default FilesList;

export type FilesListProps = {
  className?: string;
  defaultFiles: SearchFileResponse;
};
