export type BillType = 'hr' | 's';
export type Party = 'D' | 'R' | 'I';
export type State = 'introduced' | 'house' | 'senate' | 'conference' | 'conference_house' | 'conference_senate' | 'conference_passed' | 'president' | 'veto' | 'veto_house' | 'veto_senate' | 'veto_overridden' | 'law';
export type Date = {
    year: number;
    month: number;
    day: number;
};
export type Bill = {
    uid?: string;
    congress: number;
    type: BillType;
    number: number;
    title: string;
    description: string;
    sponsors: string[];
    committees: string[];
    cosponsors: string[];
    states: State[];
    lastTransition: Date;
    houseVote?: string;
    senateVote?: string;
};
export type Vote = {
    uid: string;
    yeas: string[];
    nays: string[];
    yea_count: number;
    nay_count: number;
    date: Date;
};
export type Representative = {
    uid: string;
    name: string;
    state: string;
    party: Party;
};
//# sourceMappingURL=sqlTypes.d.ts.map