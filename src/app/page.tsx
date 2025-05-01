import { FormSearch } from "components/form-search";
import { SearchResult } from "components/search-results";
import { Header } from "components/header";
import { Loader } from "components/loader";
import * as React from "react";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}
export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className=" flex flex-col items-center justify-center mx-40">
      <Header />
      <FormSearch />
      <Suspense key={resolvedSearchParams?.q} fallback={<Loader />}>
        {resolvedSearchParams.q && (
          <SearchResult query={resolvedSearchParams?.q} />
        )}
      </Suspense>
    </div>
  );
}
