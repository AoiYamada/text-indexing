"use client";

import { useToast } from "@/hooks/use-toast";
import { SearchResponse } from "@/app/api/search/route";
import SearchBar from "@/components/SearchBar";
import frontendConfig from "@/configs/frontend-config";
import { useCallback, useState } from "react";

const SearchForm = () => {
  const [
    page,
    // setPage
  ] = useState(1);
  const { toast } = useToast();
  const [result, setResult] = useState<SearchResponse>({
    items: [],
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(
    (value: string) => {
      if (value === "") {
        toast({
          title: "Search query cannot be empty",
          description:
            "Enter a stock code, company name, or keyword to get started.",
        });

        return;
      }

      setLoading(true);
      fetch(`${frontendConfig.apiUrl}/search?q=${value}&page=${page}`).then(
        async (resp) => {
          setLoading(false);
          const data = await resp.json();

          if (resp.ok) {
            setResult(data);
          } else {
            toast({
              title: "An error occurred",
              description: data.message,
            });
          }
        }
      );
    },
    [page, toast]
  );

  return (
    <div className="w-full flex flex-col justify-center gap-8">
      <div className="z-10 w-full mx-auto">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : result.items.length === 0 ? (
          <p>No results</p>
        ) : (
          <ul className=" list-none p-0">
            {result.items.map((item) => (
              <li
                key={item.id}
                className="border-[#ccc] border-solid border rounded-lg p-4 mb-4"
              >
                <div>
                  <div>
                    Filename: <span className="font-medium">{item.filename}</span>
                  </div>
                  <div>
                    Doc type: <span className="font-medium">{item.type}</span>
                  </div>
                  <div>
                    Matched text:
                    {item.sentences.map((sentence) => (
                      <p
                        key={sentence}
                        dangerouslySetInnerHTML={{ __html: sentence }}
                        className="m-0"
                      />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
