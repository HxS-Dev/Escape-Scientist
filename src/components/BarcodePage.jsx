import React, { useEffect, useState } from "react";

export const BarcodePage = ({ isError }) => {
  const [test, setTest] = useState(false);
  console.log(isError);
  return <button onClick={() => setTest((prev) => !prev)}>Barcode</button>;
};
