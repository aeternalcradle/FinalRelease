import React from "react";
import {Card} from "antd";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre >
          {(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre >
          {(outputDetails.stdout) !== null
            ? `${(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre >
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre >
          {(outputDetails?.stdout)}
        </pre>
      );
    }
  };
  return (

    <>
      <h1 >
        <font color="black">Output</font>
      </h1>
      <div >
      <Card>
        <h1 >
        <p color="black"> {outputDetails ? <>{getOutput()}</> : null}  </p>
        </h1>
      </Card>
      </div>
    </>
  );
};

export default OutputWindow;
