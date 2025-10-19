import type {BillType, Date, Representative} from "./sqlTypes.js";
import {scrapeBill, scrapeHouseRep, scrapeHouseVote, scrapeSenateVote} from "./scrapeBill.js";

import {type Pool} from 'pg'
import {generateBillUID} from "./generateUID.js";

async function insertRepRefs(pool: Pool, repRefs: Representative[]) {
    for (const rep of repRefs) {
        if (await hasRep(pool, rep.uid)) continue;
        try {
            await pool.query("INSERT INTO reps VALUES ($1, $2, $3, $4)", [rep.uid, rep.name, rep.state, rep.party])
            reps.push(rep.uid);
        } catch (e) {
            if (e instanceof Error && e.message.includes("duplicate key value violates unique constraint")) continue;
            throw e;
        }
    }
}

function sqlDate(date: Date) {
    return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`
}

let reps: string[] = []
async function hasRep(pool: Pool, uid: string) {
    if (reps.length == 0) reps = (await pool.query("SELECT uid FROM reps")).rows.map(r => r.uid) as string[];

    return reps.includes(uid);
}

export async function writeBillToSQL(pool: Pool, congress: number, type: BillType, number: number,) {
    if ((await pool.query("SELECT uid FROM bills WHERE uid=$1", [generateBillUID(congress, type, number)])).rowCount) throw 'exists';
    const bill = await scrapeBill(congress, type, number);
    await insertRepRefs(pool, bill.repRefs);

    if (bill.bill.houseVote) {
        if (!(await pool.query("SELECT uid FROM votes WHERE uid=$1", [bill.bill.houseVote])).rowCount) {
            const vote = await scrapeHouseVote(bill.bill.houseVote);
            await pool.query("INSERT INTO votes VALUES ($1, $2, $3, $4, $5, $6)", [vote.vote.uid, vote.vote.yeas, vote.vote.nays, vote.vote.yea_count, vote.vote.nay_count, sqlDate(vote.vote.date)])
            for (const uid of vote.repRefs) {
                if (await hasRep(pool, uid)) continue;
                const rep = await scrapeHouseRep(uid);
                reps.push(rep.uid);
                await pool.query("INSERT INTO reps VALUES ($1, $2, $3, $4)", [rep.uid, rep.name, rep.state, rep.party])
            }
        }
    }
    if (bill.bill.senateVote) {
        if (!(await pool.query("SELECT uid FROM votes WHERE uid=$1", [bill.bill.senateVote])).rowCount) {
            const vote = await scrapeSenateVote(bill.bill.senateVote);
            await pool.query("INSERT INTO votes VALUES ($1, $2, $3, $4, $5, $6)", [vote.vote.uid, vote.vote.yeas, vote.vote.nays, vote.vote.yea_count, vote.vote.nay_count, sqlDate(vote.vote.date)])
            await insertRepRefs(pool, vote.repRefs);
        }
    }

    await pool.query("INSERT INTO bills VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)", [bill.bill.uid!, bill.bill.congress, bill.bill.type, bill.bill.number, bill.bill.title, bill.bill.description, bill.bill.sponsors, bill.bill.committees, bill.bill.cosponsors ?? [], bill.bill.states, sqlDate(bill.bill.lastTransition), bill.bill.houseVote, bill.bill.senateVote])
}