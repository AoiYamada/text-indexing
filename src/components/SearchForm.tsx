"use client";

import { useToast } from "@/hooks/use-toast";
import { SearchResponse } from "@/app/api/search/route";
import config from "@/configs";
import { useCallback, useState } from "react";
import SearchBar from "./SearchBar";

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
      fetch(`${config.app.apiUrl}/search?q=${value}&page=${page}`).then(
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
      <div className="z-10 w-[40rem] mx-auto">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : result.items.length === 0 ? (
          <p>No results</p>
        ) : (
          <ul>
            {result.items.map((item) => (
              <li key={item.id}>
                <div>
                  <div>
                    Doc type: <span>{item.type}</span>
                  </div>
                  <div>
                    Matched text:
                    {item.sentences.map((sentence) => (
                      <p
                        key={sentence}
                        dangerouslySetInnerHTML={{ __html: sentence }}
                      />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <style jsx>
        {`
          ul {
            list-style: none;
            padding: 0;
          }

          li {
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            padding: 1rem;
          }

          p {
            margin: 0;
          }

          span {
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default SearchForm;
