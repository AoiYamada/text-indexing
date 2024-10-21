import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OverallStatsSection from "@/components/sections/OverallStatsSection";
import SearchSection from "@/components/sections/SearchSection";
import UploadedFiles from "@/components/sections/UploadedFiles";
import UploadSection from "@/components/sections/UploadSection";

// import ChartSection from "@/components/sections/ChartSection";

export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-16">
      <div className="flex flex-col items-center justify-start gap-12">
        <UploadSection />
        <OverallStatsSection />
        {/* <ChartSection /> */}
      </div>
      <div className="flex flex-col items-center justify-start gap-12">
        <UploadedFiles className="w-full" />
        <SearchSection />
      </div>
    </MaxWidthWrapper>
  );
}

export const revalidate = 0;
