import { XMLParser } from "fast-xml-parser";
const URL = "https://www.senate.gov/about/senator-lookup.xml";
const BY_LIS = {};
const SENATORS = {};
let cached = false;
export async function cacheBioguideData() {
    const xml = new XMLParser().parse(await (await fetch(URL)).text());
    for (const senator of xml.senators.senator) {
        const data = { bioguide: senator.bioguide };
        if (senator.publication_name.middle_name)
            data.middle = ` ${senator.publication_name.middle_name}`;
        if (senator.lisid)
            BY_LIS[senator.lisid] = data;
        else {
            let dict = SENATORS;
            dict = (dict[senator.party] ??= {});
            dict = (dict[senator.state] ??= {});
            dict = (dict[senator.full_name.last_name] ??= {});
            dict[senator.full_name.first_name] = data;
        }
    }
    cached = true;
}
function getData(senator) {
    if (BY_LIS[senator.lis_member_id])
        return BY_LIS[senator.lis_member_id];
    return SENATORS[senator.party][senator.state][senator.last_name][senator.first_name];
}
export async function getBioguide(senator) {
    if (!cached)
        await cacheBioguideData();
    return getData(senator).bioguide;
}
export async function getFullName(senator) {
    if (!cached)
        await cacheBioguideData();
    return `Sen. ${senator.last_name}, ${senator.last_name}${getData(senator).middle ?? ''} [${senator.party}-${senator.state}]`;
}
//# sourceMappingURL=senatorUtil.js.map