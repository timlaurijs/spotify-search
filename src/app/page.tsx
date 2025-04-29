import { FormSearch } from "components/form-search";
import { cachedSearchSpotify } from "service/spotify";
import { SearchResults } from "components/search-results";
import { Header } from "components/header";

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

  return (
    <div className=" flex flex-col items-center justify-center mx-40">
      <Header />
      <FormSearch />
      <SearchResults results={results} />
    </div>
  );
}
