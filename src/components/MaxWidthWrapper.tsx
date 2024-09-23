import { cn } from "@/lib/utils";

type MaxWidthWrapperProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const MaxWidthWrapper = ({ id, className, children }: MaxWidthWrapperProps) => {
  return (
    <div
      id={id}
      className={cn(
        "mx-auto w-full max-w-screen-xl px-5 py-16 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
