import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OverallStatsSection from "@/components/sections/OverallStatsSection";
import SearchSection from "@/components/sections/SearchSection";
import UploadSection from "@/components/sections/UploadSection";

export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center gap-16">
      <OverallStatsSection />
      <UploadSection />
      <SearchSection />
    </MaxWidthWrapper>
  );
}

export const revalidate = 0;
