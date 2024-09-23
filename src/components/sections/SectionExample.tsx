"use client";

import { useToast } from "@/hooks/use-toast";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SectionExample = () => {
  const { register, reset, handleSubmit } = useForm();
  const { toast } = useToast();

  const onSubmit = (data: any) => {
    // POST the files to /api/upload by using `fetch`

    const formData = new FormData();
    Array.from(data.files as File[]).forEach((file) => {
      formData.append("files", file);
    });

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
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
        className="flex w-full flex-col items-start justify-center gap-16"
      >
        <Input type="file" multiple {...register("files")} />
        <Button type="submit" className="btn btn-primary">
          Upload
        </Button>
      </form>
    </section>
  );
};

export default SectionExample;
