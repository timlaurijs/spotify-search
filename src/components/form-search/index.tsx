"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";
import { useSpeechToText } from "../../hooks/use-speech-to-text";

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
  const { transcript, startListening, listening } = useSpeechToText();

  const { register, watch, setValue } = useForm<FormValues>({
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
      router.push(`?q=${encodeURIComponent(debouncedQuery.trim())}`);
    }
    // clear query value
    if (!debouncedQuery) {
      router.push("?q=");
    }
  }, [debouncedQuery, router]);

  useEffect(() => {
    if (currentQuery !== queryValue) {
      setValue(FormFieldNamed.QUERY, currentQuery);
    }
  }, [currentQuery]);

  useEffect(() => {
    if (transcript) {
      setValue(FormFieldNamed.QUERY, transcript);
    }
  }, [transcript]);

  return (
    <div className="min-w-[50vw] flex justify-center items-center my-8">
      <form className="w-full bg-white p-8 rounded-lg shadow-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Spotify
        </label>
        <div className="flex ">
          <input
            type="text"
            {...register(FormFieldNamed.QUERY, { required: true })}
            placeholder="Search spotify..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={startListening}
            style={{ color: "red" }}
            className=" pl-6 text-5xl"
          >
            {listening ? "◎" : "◉"}
          </button>
        </div>
      </form>
    </div>
  );
};
