"use client";

import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

const UploadSection = () => {
  const { register, reset, handleSubmit } = useForm();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    // POST the files to /api/upload by using `fetch`

    const formData = new FormData();
    Array.from(data.files as File[]).forEach((file) => {
      formData.append("files", file);
    });

    setIsLoading(true);
    setProgress(0);
    const slowGrowth = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(slowGrowth);
          return 100;
        }

        // tends to 100 but never reaches it
        return prev + (98 - prev) * 0.05;
      });
    }, 100);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        setProgress(100);
        clearInterval(slowGrowth);
        setIsLoading(false);

        if (!res.ok) {
          throw new Error("Failed to upload the files");
        }

        return res.json();
      })
      .then((res) => {
        // toasting the response
        toast({
          description: res.message,
          className: "bg-green-600 text-white",
        });

        // reset the form
        reset();

        // refresh the page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.error(err);

        toast({
          description: "Failed to upload the files",
          variant: "destructive",
          className: "bg-red-600",
        });
      });
  };

  return (
    <section
      className="w-full flex flex-col items-center justify-center gap-12"
      id="contact-us"
    >
      <h1 className="flex flex-col items-center justify-center text-3xl font-semibold sm:flex-row sm:text-4xl lg:text-5xl">
        Upload Hw Xml files
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-row items-start justify-center gap-8"
      >
        <Input
          type="file"
          multiple
          {...register("files")}
          className="w-[300px]"
        />
        <div className="flex flex-col justify-center gap-2">
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
          {isLoading && <Progress value={progress} className="w-28" />}
        </div>
      </form>
    </section>
  );
};

export default UploadSection;
