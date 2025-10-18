import { type BillSideBarInfo } from "../lib/types";

const BillInfo = ({ bill }: { bill: BillSideBarInfo }) => {
  return (
    <div>
      <h1>{bill.name}</h1>
      <p>{bill.committeeOrigination}</p>
      <p>{bill.sponsors.join(", ")}</p>
      <p>{bill.summary}</p>
    </div>
  );
};

export default BillInfo;
