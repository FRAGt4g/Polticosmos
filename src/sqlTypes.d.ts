export type BillType = 'hr' | 's';
export type Party = 'D' | 'R' | 'I';
export type State = 'introduced' | 'house' | 'senate' | 'conference' | 'conference_house' | 'conference_senate' | 'president' | 'veto' | 'veto_house' | 'veto_senate' | 'law';
export type Date = {
    year: number;
    month: number;
    day: number;
};
export type Bill = {
    uid?: string;
    type: BillType;
    congress: number;
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
    yays: string[];
    nays: string[];
    novotes: string[];
    date: Date;
};
export type Representative = {
    uid: string;
    name: string;
    state: string;
    party: Party;
};
//# sourceMappingURL=sqlTypes.d.ts.map