import type { StarMatrix } from "~/lib/types";
import StarModel from "./StarModel";

const StarField = ({ matrix }: { matrix: StarMatrix }) => {
  return (
    <>
      {matrix.objects.map((starObj, index) => (
        <StarModel
          key={index}
          {...starObj}
          index={index}
        />
      ))}
    </>
  );
};

export default StarField;
