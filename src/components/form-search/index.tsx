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
  });

  const queryValue = watch(FormFieldNamed.QUERY);
  const [debouncedQuery] = useDebounceValue(queryValue, 500);

  // set query in params
  useEffect(() => {
    if (debouncedQuery) {
      router.push(`?q=${encodeURIComponent(debouncedQuery)}`);
    }
    // clear query value
    if (!debouncedQuery && !currentQuery) {
      router.push("?q=");
    }
  }, [debouncedQuery, router]);

  return (
    <div>
      <form>
        <input
          type="text"
          {...register(FormFieldNamed.QUERY, { required: true })}
          placeholder="Search spotify..."
        />
      </form>
    </div>
  );
};
