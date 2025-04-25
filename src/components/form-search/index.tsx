"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";

enum FormFieldNamed {
  QUERY = "q",
}

interface FormValues {
  [FormFieldNamed.QUERY]: string;
}

export const FormSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Access query parameters
  const currentQuery = searchParams.get(FormFieldNamed.QUERY) || "";

  const { register, watch } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      [FormFieldNamed.QUERY]: currentQuery,
    },
  });

  const queryValue = watch(FormFieldNamed.QUERY);
  const [debouncedQuery] = useDebounceValue(queryValue, 500);

  // set query in params
  useEffect(() => {
    if (debouncedQuery) {
      router.push(`?q=${encodeURIComponent(debouncedQuery)}`);
    }
    // clear query value
    if (!debouncedQuery) {
      router.push("?q=");
    }
  }, [debouncedQuery, router]);

  return (
    <div className="min-w-[33vw] flex justify-center items-center m-8">
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Spotify
        </label>
        <input
          type="text"
          {...register(FormFieldNamed.QUERY, { required: true })}
          placeholder="Search spotify..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </form>
    </div>
  );
};
