import type { Bill, BillType, Party, Representative } from "./sqlTypes.js";
import type { RawRepresentative, RawVote } from "./queryTypes.js";
export declare function attachBillUID(bill: Bill): Bill;
export declare function generateBillUID(congress: number, type: BillType, number: number): string;
export declare function generateVoteUID(raw: RawVote): string;
export declare function parseVoteUID(uid: string): {
    year: number;
    congress: number;
    session: number;
    rollNumber: number;
};
export declare function parseRawRep(raw: RawRepresentative): Representative;
export declare function sqlizeParty(party: string): Party;
export declare function getRepUID(raw: RawRepresentative): string;
//# sourceMappingURL=generateUID.d.ts.map