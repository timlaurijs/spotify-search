import { FormSearch } from "components/form-search";
import { cachedSearchSpotify } from "service/spotify";

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">HHR</h1>
      <FormSearch />
    </div>
  );
}
