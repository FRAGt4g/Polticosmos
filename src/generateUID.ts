import type {Bill, BillType, Party, Representative} from "./sqlTypes.js";
import type {RawRepresentative, RawVote} from "./queryTypes.js";

export function attachBillUID(bill: Bill): Bill {
    return {
        ...bill,
        uid: generateBillUID(bill.congress, bill.type, bill.number)
    }
}

export function generateBillUID(congress: number, type: BillType, number: number): string {
    return `${congress}-${type}-${number}`
}

export function generateVoteUID(raw: RawVote): string {
    return `${raw.date.split('-')[0]}-${raw.congress}-${raw.sessionNumber}-${raw.rollNumber}`
}

export function parseVoteUID(uid: string) {
    return {
        year: parseInt(uid.split('-')[0]!),
        congress: parseInt(uid.split('-')[1]!),
        session: parseInt(uid.split('-')[2]!),
        rollNumber: parseInt(uid.split('-')[3]!),
    }
}

export function parseRawRep(raw: RawRepresentative): Representative {
    return {
        uid: getRepUID(raw),
        name: raw.fullName,
        state: raw.state,
        party: sqlizeParty(raw.party),
    };
}

export function sqlizeParty(party: string): Party {
    return party == 'D' ? 'D' : party == 'R' ? 'R' : 'I';
}

export function getRepUID(raw: RawRepresentative): string {
    return raw.bioguideId;
}