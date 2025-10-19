"use";

import { GetStarMatrix } from "data-processing/starMatrix";
import { useEffect, useState } from "react";
import type { StarMatrix } from "~/lib/types";
import StarModel from "./StarModel";

const StarField = () => {
  const [matrix, setMatrix] = useState<StarMatrix | undefined>(undefined);
  useEffect(() => {
    void GetStarMatrix().then(setMatrix);
  }, []);

  return matrix ? (
    <>
      {matrix.objects.map((starObj, index) => (
        <StarModel key={index} {...starObj} index={index} />
      ))}
    </>
  ) : (
    <></>
  );
};

export default StarField;
