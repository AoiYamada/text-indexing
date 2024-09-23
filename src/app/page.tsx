import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OverallStatsSection from "@/components/sections/OverallStatsSection";
import UploadSection from "@/components/sections/UploadSection";

export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center gap-12">
      <OverallStatsSection />
      <UploadSection />
    </MaxWidthWrapper>
  );
}

export const revalidate = 0;
