import type { Bill, BillType, Representative, State, Vote } from "./sqlTypes.js";
export declare const ACTION_CODE_MAP: {
    [c: string]: State | null;
};
export type BillResponse = {
    bill: Bill;
    repRefs: Representative[];
};
export declare function scrapeBill(congress: number, type: BillType, number: number): Promise<BillResponse>;
export type SenatorVoteResponse = {
    vote: Vote;
    repRefs: Representative[];
};
export declare function scrapeSenateVote(uid: string): Promise<SenatorVoteResponse>;
export type HouseVoteResponse = {
    vote: Vote;
    repRefs: string[];
};
export declare function scrapeHouseVote(uid: string): Promise<HouseVoteResponse>;
export declare function scrapeHouseRep(bioguideId: string): Promise<Representative>;
//# sourceMappingURL=scrapeBill.d.ts.map