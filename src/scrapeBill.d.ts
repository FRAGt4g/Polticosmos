import { Bill, BillType, Representative, State } from "./sqlTypes.ts";
export declare const ACTION_CODE_MAP: {
    [c: string]: State | null;
};
export type BillResponse = {
    bill: Bill;
    repRefs: Representative[];
    voteRefs: string[];
};
export declare function scrapeBill(congress: number, type: BillType, number: number): Promise<BillResponse>;
//# sourceMappingURL=scrapeBill.d.ts.map