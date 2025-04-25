// @flow
import * as React from "react";

export const Header = () => {
  return (
    <h1
      className="text-4xl font-bold text-blue-600 text-center my-8"
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
  );
};
