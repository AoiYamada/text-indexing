import { Info, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
  tooltip?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
};

const SearchBar = ({
  defaultValue,
  placeholder,
  tooltip,
  onFocus,
  onBlur,
  onSearch,
  onChange,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue ?? "");

  const handleFocus = useCallback(() => {
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    onBlur?.();
  }, [onBlur]);

  const handleSearch = useCallback(() => {
    if (inputRef?.current?.value) {
      inputRef.current?.blur();
    }

    onSearch?.(inputRef?.current?.value ?? "");
  }, [onSearch, inputRef]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const handleEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  useEffect(() => {
    if (inputRef.current) {
      // react doesn't support onsearch event, firefox is not supported too
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      inputRef.current.onsearch = handleSearch;
    }
  }, [handleSearch, inputRef]);

  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue]);

  return (
    <div className="relative flex flex-row justify-start align-middle w-full">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder || "Search"}
        className={cn("bg-white pl-8 w-full", {
          "pr-[4.5rem]": tooltip,
          "pr-12": !tooltip,
        })}
        ref={inputRef}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="absolute right-10 top-0"
              aria-label="Supported operators info"
            >
              <div className="p-2.5 text-muted-foreground">
                <Info className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[17.5rem] bg-slate-700 bg-opacity-90 text-sm md:max-w-[30rem] md:text-base">
              {tooltip}
              <TooltipArrow className="fill-slate-700 opacity-90" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <Button
        variant="outline"
        className="absolute right-0 top-0 rounded-l-none p-2.5 shadow-none"
        onClick={handleSearch}
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
