import React from "react";
import SearchForm from "./SearchForm";

const SearchSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-12">
      <h1 className="flex flex-col items-center justify-center text-xl font-semibold sm:flex-row sm:text-2xl lg:text-3xl">
        Search by keyword(s)
      </h1>
      <SearchForm />
    </section>
  );
};

export default SearchSection;
