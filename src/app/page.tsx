import { FormSearch } from "components/form-search";
import { cachedSearchSpotify } from "service/spotify";
import { SearchResults } from "components/search-results";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}
export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const results = resolvedSearchParams?.q
    ? await cachedSearchSpotify(resolvedSearchParams.q)
    : null;
  console.log("results", results);

  return (
    <div className=" flex flex-col items-center justify-center m-40">
      <h1
        className="text-4xl font-bold text-blue-600 mb-6"
        style={{ fontFamily: "'arial narrow'" }}
      >
        <span
          className="text-yellow-500"
          style={{ fontFamily: "'Old English Text MT', 'Gothic', serif" }}
        >
          H
        </span>
        out
        <span
          className="text-yellow-500"
          style={{ fontFamily: "'Old English Text MT', 'Gothic', serif" }}
        >
          H
        </span>
        aven
        <span
          className="text-yellow-500"
          style={{ fontFamily: "'Old English Text MT', 'Gothic', serif" }}
        >
          R
        </span>
        ecords
      </h1>
      <FormSearch />
      <SearchResults results={results} />
    </div>
  );
}
