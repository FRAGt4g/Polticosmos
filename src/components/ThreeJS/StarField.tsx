import type { StarMatrix } from "~/lib/types";
import StarModel from "./StarModel";

const StarField = ({ matrix }: { matrix: StarMatrix }) => {
  return (
    <>
      {matrix.objects.map((starObj, index) => (
        <StarModel
          key={index}
          position={starObj.position}
          scale={starObj.scale}
          billId={starObj.billId}
        />
      ))}
    </>
  );
};

export default StarField;
