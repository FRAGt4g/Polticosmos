import { writeBillToSQL } from "./writeBillToSQL.js";
import { Pool } from "pg";
import { setGlobalDispatcher, Agent } from 'undici';
import { scrapeSenateVote } from "./scrapeBill.js";
import { cacheBioguideData } from "./senatorUtil.js";
setGlobalDispatcher(new Agent({ connect: { timeout: 1_000_000 } }));
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "dev",
    port: 5432,
});
async function safeWrite(congress, type, number) {
    try {
        await writeBillToSQL(pool, congress, type, number);
        console.log(`wrote ${congress}-${type}-${number}`);
    }
    catch (e) {
        if (e == 'reserved')
            console.log(`reserved ${congress}-${type}-${number}`);
        else if (e == 'ratelimit')
            console.log('ratelimited! reset API key');
        else if (e == 'exists')
            console.log(`exists ${congress}-${type}-${number}`);
        else { } //throw e;
    }
}
await cacheBioguideData();
console.log("bioguide data received");
const promises = [];
for (let hr = 1; hr <= 5793; hr++) {
    await safeWrite(119, 'hr', hr);
}
for (let s = 1; s <= 3016; s++) {
    // if (1 <= s && s <= 20 && s != 5 && s != 6 && s != 9) continue;
    await safeWrite(119, 's', s);
}
// console.log(await scrapeSenateVote('2025-119-1-570'));
// await safeWrite(119, 's', 2296);
// await Promise.all(promises);
//# sourceMappingURL=index.js.map