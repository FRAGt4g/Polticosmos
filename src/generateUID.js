"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBillUID = generateBillUID;
exports.generateVoteUUID = generateVoteUUID;
exports.parseRawRep = parseRawRep;
const sqlTypes_ts_1 = require("./sqlTypes.ts");
const queryTypes_ts_1 = require("./queryTypes.ts");
function generateBillUID(bill) {
    return {
        ...bill,
        uid: `${bill.congress}-${bill.type}-${bill.number}`,
    };
}
function generateVoteUUID(raw) {
    return `${raw.date.split('-')[0]}-${raw.congress}-${raw.sessionNumber}-${raw.rollNumber}`;
}
function parseRawRep(raw) {
    return {
        uid: raw.bioguideId,
        name: raw.fullName,
        state: raw.state,
        party: raw.party,
    };
}
//# sourceMappingURL=generateUID.js.map