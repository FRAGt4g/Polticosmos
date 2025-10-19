export function attachBillUID(bill) {
    return {
        ...bill,
        uid: generateBillUID(bill.congress, bill.type, bill.number)
    };
}
export function generateBillUID(congress, type, number) {
    return `${congress}-${type}-${number}`;
}
export function generateVoteUID(raw) {
    return `${raw.date.split('-')[0]}-${raw.congress}-${raw.sessionNumber}-${raw.rollNumber}`;
}
export function parseVoteUID(uid) {
    return {
        year: parseInt(uid.split('-')[0]),
        congress: parseInt(uid.split('-')[1]),
        session: parseInt(uid.split('-')[2]),
        rollNumber: parseInt(uid.split('-')[3]),
    };
}
export function parseRawRep(raw) {
    return {
        uid: getRepUID(raw),
        name: raw.fullName,
        state: raw.state,
        party: sqlizeParty(raw.party),
    };
}
export function sqlizeParty(party) {
    return party == 'D' ? 'D' : party == 'R' ? 'R' : 'I';
}
export function getRepUID(raw) {
    return raw.bioguideId;
}
//# sourceMappingURL=generateUID.js.map