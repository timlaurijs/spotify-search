// @flow
import * as React from "react";

type Props = {
  message?: string;
};

export const Loader = ({ message }: Props) => {
  return (
    <div>
      <h1>Loading....</h1>
      {message && <p>{message}</p>}
    </div>
  );
};
