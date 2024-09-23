"use client";

import React from "react";
import { useForm } from "react-hook-form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SectionExample = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    // POST the file to /api/upload by using `fetch`

    const formData = new FormData();
    formData.append("file", data.file[0]);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="w-full" id="contact-us">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-12">
        <h1 className="flex flex-col items-center justify-center text-3xl font-semibold sm:flex-row sm:text-4xl lg:text-5xl">
          Section Example
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-start justify-center gap-16"
        >
          <Input type="file" {...register("file")} />
          <Button type="submit" className="btn btn-primary">
            Upload
          </Button>
        </form>
      </MaxWidthWrapper>
    </section>
  );
};

export default SectionExample;
