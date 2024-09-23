import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UploadSection from "@/components/sections/UploadSection";

export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center gap-12">
      <UploadSection />
    </MaxWidthWrapper>
  );
}
