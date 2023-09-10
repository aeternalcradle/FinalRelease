import React from "react";
import { classnames } from "../utils/general";

const ExpectedOutput = ({ expectedOutput, setexpectedOutput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={expectedOutput}
        onChange={(e) => setexpectedOutput(e.target.value)}
        placeholder={`Expected output`}
        className={classnames(
          "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
        )}
      ></textarea>
    </>
  );
};

export default ExpectedOutput;
