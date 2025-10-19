import { attachBillUID, generateVoteUID, getRepUID, parseRawRep, parseVoteUID, sqlizeParty } from "./generateUID.js";
import { XMLParser } from "fast-xml-parser";
import { getBioguide, getFullName } from "./senatorUtil.js";
export const ACTION_CODE_MAP = {
    "1000": 'introduced', // introduced in house
    "1010": 'introduced', // reported by house committee
    "8000": 'house', // passed house
    "9000": null, // failed house
    "10000": 'introduced', // introduced in senate
    "10010": 'introduced', // reported by senate committee
    "17000": 'senate', // passed senate
    "18000": null, // failed senate
    "19000": 'house', // passed house resolving differences
    "19500": 'house', // passed house resolving differences
    "20000": 'senate', // passed senate resolving differences
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
// const API_KEY = "WigsOt5FfADUNtwgdOEmhCQ7tY8ElkPxDateMZKI";
// const API_KEY = "zIKg3hZ8DPaVRGAfrKEGfg4SkkpeTSW0nCLmKAdl";
const API_BASE = "https://api.congress.gov/v3";
const PAGINATION_MAX = 250;
const HOUSE_VOTE = "https://clerk.house.gov/evs/{year}/roll{rollNumber}.xml";
const SENATE_VOTE = "https://www.senate.gov/legislative/LIS/roll_call_votes/vote{congress}{session}/vote_{congress}_{session}_{rollNumber}.xml";
const BILL_BASE = "/bill/{congress}/{billType}/{billNumber}";
const MEMBER_BASE = "/member/{bioguideId}";
function fillAPI(api, params) {
    return api.replace(/{(.*?)}/g, (_, key) => params[key]);
}
async function query(api, params) {
    const queryString = new URLSearchParams({
        format: "json",
        api_key: API_KEY,
    });
    const url = API_BASE + fillAPI(api, params) + `?${queryString}`;
    const res = await (await fetch(url)).text();
    if (res.startsWith("<")) {
        throw "html";
    }
    return JSON.parse(res);
}
async function queryPaginated(data, paginateUpon) {
    if (data === undefined)
        return undefined;
    const queryString = new URLSearchParams({
        api_key: API_KEY,
        limit: PAGINATION_MAX.toString()
    });
    let start = 0;
    let count = data.count ?? 1;
    let result = undefined;
    while (start < count) {
        const f = await (await fetch(data.url + `&${queryString}&offset=${start}`)).text();
        if (f.startsWith("<")) {
            throw "html";
        }
        const res = JSON.parse(f); //(await (f).json()) as T;
        if (!result)
            result = res; // @ts-ignore
        else
            result[paginateUpon] = result[paginateUpon].concat(res[paginateUpon]);
        count = res.pagination.count;
        start += PAGINATION_MAX;
    }
    return result;
}
export async function scrapeBill(congress, type, number) {
    const bill = (await query(BILL_BASE, { congress, billType: type, billNumber: number })).bill;
    if (!bill) {
        console.log(`bill ${congress}-${type}-${number} not found`);
        throw "ratelimit";
    }
    if (!bill.actions)
        throw "reserved";
    const actions = (await queryPaginated(bill.actions, "actions"));
    const committees = bill.committees && (await queryPaginated(bill.committees, "committees"));
    const cosponsors = bill.cosponsors && await queryPaginated(bill.cosponsors, "cosponsors");
    let houseVote = undefined;
    let senateVote = undefined;
    let lastTransition = undefined;
    const stateHistory = [];
    const conferenceArr = ['conference_house', 'conference_senate'];
    const vetoArr = ['veto_house', 'veto_senate'];
    for (const action of actions.actions) {
        if (action.sourceSystem?.code != 9)
            continue; // LoC events only
        const state = ACTION_CODE_MAP[action.actionCode];
        if (state === undefined)
            continue;
        if (lastTransition == undefined) {
            let date = action.actionDate.split('-').map(n => parseInt(n));
            lastTransition = {
                year: date[0],
                month: date[1],
                day: date[2],
            };
        }
        if (state !== null) {
            if (stateHistory.length > 0) {
                if (state == 'law' && stateHistory[0] == 'law')
                    continue; // skip duplicate
                if ((conferenceArr.indexOf(state) ^ conferenceArr.indexOf(stateHistory.at(-1))) == 1) {
                    stateHistory.pop();
                    stateHistory.push('conference_passed');
                    continue;
                }
                if ((vetoArr.indexOf(state) ^ vetoArr.indexOf(stateHistory.at(-1))) == 1) {
                    stateHistory.pop();
                    stateHistory.push('veto_overridden');
                    continue;
                }
            }
            stateHistory.push(state);
        }
        if (action.recordedVotes) {
            for (const vote of action.recordedVotes) {
                if (vote.chamber == "House")
                    houseVote ??= generateVoteUID(vote);
                if (vote.chamber == "Senate")
                    senateVote ??= generateVoteUID(vote);
            }
        }
    }
    return {
        bill: attachBillUID({
            congress,
            type,
            number,
            title: bill.title.replace("\r\n", ""),
            description: "", //TODO
            sponsors: bill.sponsors.map(getRepUID),
            committees: committees?.committees.map(c => c.name) ?? [],
            cosponsors: cosponsors?.cosponsors.map(getRepUID) ?? [],
            states: stateHistory,
            lastTransition: lastTransition,
            houseVote,
            senateVote
        }),
        repRefs: bill.sponsors.map(parseRawRep).concat(cosponsors?.cosponsors.map(parseRawRep) ?? []),
    };
}
export async function scrapeSenateVote(uid) {
    const { congress, session, rollNumber } = parseVoteUID(uid);
    const json = new XMLParser().parse(await (await fetch(fillAPI(SENATE_VOTE, { congress, session, rollNumber: rollNumber.toString().padStart(5, '0') }))).text())['roll_call_vote'];
    const date = new Date(json['vote_date']);
    const votes = json['members']['member'];
    const yeas = await Promise.all(votes.filter((v) => v['vote_cast'] == 'Yea').map(getBioguide));
    const nays = await Promise.all(votes.filter((v) => v['vote_cast'] == 'Nay').map(getBioguide));
    return {
        vote: {
            uid,
            yeas,
            nays,
            yea_count: json['count']['yeas'] + (json['tie_breaker']['tie_breaker_vote'] == 'Yea' ? 1 : 0),
            nay_count: json['count']['nays'] + (json['tie_breaker']['tie_breaker_vote'] == 'Nay' ? 1 : 0),
            date: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDay(),
            }
        },
        repRefs: await Promise.all(votes.map(async (v) => {
            return {
                uid: await getBioguide(v),
                name: await getFullName(v),
                state: v.state,
                party: sqlizeParty(v.party),
            };
        }))
    };
}
export async function scrapeHouseVote(uid) {
    const { year, rollNumber } = parseVoteUID(uid);
    let resp = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' }).parse(await (await fetch(fillAPI(HOUSE_VOTE, { year, rollNumber: rollNumber.toString().padStart(3, '0') }))).text());
    resp = resp['rollcall-vote'];
    const date = new Date(resp['vote-metadata']['action-date']);
    const votes = resp['vote-data']['recorded-vote'];
    return {
        vote: {
            uid,
            yeas: votes.filter((v) => v.vote == 'Yea' || v.vote == 'Aye').map((v) => v.legislator['@_name-id']),
            nays: votes.filter((v) => v.vote == 'Nay' || v.vote == 'No').map((v) => v.legislator['@_name-id']),
            yea_count: resp['vote-metadata']['vote-totals']['totals-by-vote']['yea-total'],
            nay_count: resp['vote-metadata']['vote-totals']['totals-by-vote']['nay-total'],
            date: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDay(),
            }
        },
        repRefs: votes.map((v) => v.legislator['@_name-id']),
    };
}
export async function scrapeHouseRep(bioguideId) {
    const { member } = await query(MEMBER_BASE, { bioguideId });
    const state = member.terms.at(-1).stateCode;
    const party = member.partyHistory.at(-1).partyAbbreviation;
    return {
        uid: member.bioguideId,
        name: `Rep. ${member.invertedOrderName} [${party}-${state}-${member.district ?? 'At Large'}]`,
        state,
        party: sqlizeParty(party),
    };
}
//# sourceMappingURL=scrapeBill.js.map