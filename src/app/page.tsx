import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OverallStatsSection from "@/components/sections/OverallStatsSection";
import SearchSection from "@/components/sections/SearchSection";
import UploadSection from "@/components/sections/UploadSection";

export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-16">
      <div className="flex flex-col items-start justify-start gap-12">
        <UploadSection />
        <OverallStatsSection />
      </div>
      <div>
        <SearchSection />
      </div>
    </MaxWidthWrapper>
  );
}

export const revalidate = 0;
