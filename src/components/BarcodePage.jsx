import React, { useEffect, useState } from "react";

export const BarcodePage = ({ isError, latestPillCompleted }) => {
  // useEffect(() => {
  //   console.log("hello");
  // }, [showClue]);
  console.log({ latestPillCompleted });
  const [test, setTest] = useState(false);
  return <button onClick={() => setTest((prev) => !prev)}>Barcode</button>;
};
