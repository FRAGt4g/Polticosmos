"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTION_CODE_MAP = void 0;
exports.scrapeBill = scrapeBill;
const queryTypes_ts_1 = require("./queryTypes.ts");
const sqlTypes_ts_1 = require("./sqlTypes.ts");
const generateUID_ts_1 = require("./generateUID.ts");
exports.ACTION_CODE_MAP = {
    "1000": 'introduced', // introduced in house
    "1010": 'introduced', // reported by house committee
    "8000": 'house', // passed house
    "9000": null, // failed house
    "10000": 'introduced', // introduced in senate
    "10010": 'introduced', // reported by senate committee
    "17000": 'senate', // passed senate
    "18000": null, // failed senate
    "28000": 'president', // sent to president
    "29000": 'law', // signed by president
    "20900": 'conference', // HR+S agreed to conference
    "21000": 'conference_house', // house passed conference report
    "22000": null, // house rejected conference report
    "23000": 'conference_senate', // senate passed conference report
    "24000": null, // senate rejected conference report
    "31000": 'veto', // vetoed by president
    "32000": 'veto_house', // veto overridden by house
    "33000": null, // veto not overridden by house
    "34000": 'veto_senate', // veto overridden by senate
    "35000": null, // veto not overridden by senate
    "36000": 'law', // became public law
    "37000": 'law',
    "38000": 'law',
    "39000": 'law',
    "40000": 'law',
    "41000": 'law',
    "42000": 'law',
    "43000": 'law',
    "44000": 'law',
    "45000": 'law',
};
const API_KEY = "5PvNUOOBQZpJe5hgaHAci3icUgVs4w6iwUkOYo0W";
const API_BASE = "https://api.congress.gov/v3";
const PAGINATION_MAX = 250;
const BILL_BASE = "/bill/{congress}/{billType}/{billNumber}";
async function query(api, params) {
    const queryString = new URLSearchParams({
        format: "json",
        api_key: API_KEY,
    });
    const url = API_BASE + api.replace(/{(.*?)}/g, (_, key) => params[key]) + `?${queryString}`;
    return await (await fetch(url)).json();
}
async function queryPaginated(data, paginateUpon) {
    const queryString = new URLSearchParams({
        api_key: API_KEY,
        limit: PAGINATION_MAX.toString()
    });
    let start = 0;
    let count = data.count ?? 1;
    let result = undefined;
    while (start < count) {
        const res = (await (await fetch(data.url + `&${queryString}&offset=${start}`)).json());
        if (!result)
            result = res; // @ts-ignore
        else
            result[paginateUpon] = result[paginateUpon].concat(res[paginateUpon]);
        count = res.pagination.count;
        start += PAGINATION_MAX;
    }
    return result;
}
async function scrapeBill(congress, type, number) {
    const bill = (await query(BILL_BASE, { congress, billType: type, billNumber: number })).bill;
    const actions = (await queryPaginated(bill.actions, "actions"));
    const committees = await queryPaginated(bill.committees, "committees");
    const cosponsors = await queryPaginated(bill.cosponsors, "cosponsors");
    let houseVote = undefined;
    let senateVote = undefined;
    let lastTransition = undefined;
    const stateHistory = [];
    for (const action of actions.actions) {
        if (action.sourceSystem.code != 9)
            continue; // LoC events only
        const state = exports.ACTION_CODE_MAP[action.actionCode];
        if (state === undefined)
            continue;
        if (lastTransition == undefined) {
            let date = action.actionDate.split('-').map(Number);
            lastTransition = {
                year: date[0],
                month: date[1],
                day: date[2],
            };
        }
        if (state !== null)
            stateHistory.push(state);
        if (action.recordedVotes) {
            for (const vote of action.recordedVotes) {
                if (vote.chamber == "House")
                    houseVote ??= (0, generateUID_ts_1.generateVoteUUID)(vote);
                if (vote.chamber == "Senate")
                    senateVote ??= (0, generateUID_ts_1.generateVoteUUID)(vote);
            }
        }
    }
    return {
        bill: (0, generateUID_ts_1.generateBillUID)({
            congress,
            type,
            number,
            title: bill.title,
            description: "", //TODO
            sponsors: bill.sponsors.map(s => s.bioguideId),
            committees: committees.committees.map(c => c.name),
            cosponsors: cosponsors.cosponsors.map(c => c.bioguideId),
            states: stateHistory,
            lastTransition: lastTransition,
            houseVote,
            senateVote
        }),
        repRefs: bill.sponsors.map(generateUID_ts_1.parseRawRep).concat(bill.sponsors.map(generateUID_ts_1.parseRawRep)),
        voteRefs: (houseVote ? [houseVote] : []).concat((senateVote ? [senateVote] : [])),
    };
}
//# sourceMappingURL=scrapeBill.js.map