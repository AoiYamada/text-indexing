import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SectionExample from "@/components/sections/SectionExample";

export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center gap-12">
      <SectionExample />
    </MaxWidthWrapper>
  );
}
