import { FormSearch } from "components/form-search";
import { searchSpotify } from "service/spotify";

interface Props {
  searchParams: {
    q?: string;
  };
}
export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const results = resolvedSearchParams?.q
    ? await searchSpotify(resolvedSearchParams.q)
    : null;

  console.log("results", results);

  return (
    <div>
      <h1>HHR</h1>
      <FormSearch />
    </div>
  );
}
