import { Bill, Representative } from "./sqlTypes.ts";
import { RawRepresentative, RawVote } from "./queryTypes.ts";
export declare function generateBillUID(bill: Bill): Bill;
export declare function generateVoteUUID(raw: RawVote): string;
export declare function parseRawRep(raw: RawRepresentative): Representative;
//# sourceMappingURL=generateUID.d.ts.map