"use"

import type { StarMatrix } from "~/lib/types";
import StarModel from "./StarModel";
import { useEffect, useState } from "react";
import { GetStarMatrix } from "data-processing/starMatrix";

const StarField = () => {
    let [matrix, setMatrix] = useState<StarMatrix|undefined>(undefined);
    useEffect(() => {
      GetStarMatrix().then(setMatrix);
    }, [])
  
  return matrix ? (
    <>
      {matrix.objects.map((starObj, index) => (
        <StarModel
          key={index}
          {...starObj}
          index={index}
        />
      ))}
    </>
  ) : <></>;
};

export default StarField;
