import { useCosmosContext } from "~/components/providers/cosmos-provider";

import type { StarMatrix } from "~/lib/types";
import StarModel from "./StarModel";
import { useEffect, useState } from "react";
import { GetStarMatrix } from "~/components/ThreeJS/starMatrix";

const StarField = () => {
    const [matrix, setMatrix] = useState<StarMatrix|undefined>(undefined);
    useEffect(() => {
      void GetStarMatrix().then(setMatrix);
    }, [])

  const {loadedBills, lawOnly} = useCosmosContext();
  
  return matrix ? (
    <>
      {matrix.objects.map((starObj, index) => {
        const law = loadedBills[starObj.billId]?.states.includes('law');
        return (!lawOnly || law ?
          <StarModel
            key={index}
            {...starObj}
            scale={lawOnly && law ? starObj.scale * 10 : starObj.scale}
            index={index}
          /> : <></>
        )
      })}
    </>
  ) : <></>;
};

export default StarField;
