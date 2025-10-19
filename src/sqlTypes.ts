export type BillType = 'hr' | 's';
export type Party = 'D' | 'R' | 'I';
export type State = 'introduced' // introduced in house or senate
    | 'house' // passed house
    | 'senate' // passed senate
    | 'conference' // sent to conference
    | 'conference_house' // passed only house conference
    | 'conference_senate' // passed only senate conference
    | 'conference_passed' // passed both house and senate conference
    | 'president' // sent to president
    | 'veto' // vetoed by president
    | 'veto_house' // veto overridden by house
    | 'veto_senate' // veto overridden by senate
    | 'veto_overridden' // veto overridden by both house and senate
    | 'law'; // became public law

export type Date = {
    year: number,
    month: number,
    day: number,
}

export type Bill = {
    uid?: string,
    congress: number,
    type: BillType,
    number: number,
    title: string,
    description: string,
    sponsors: string[],
    committees: string[],
    cosponsors: string[],
    states: State[],
    lastTransition: Date,
    houseVote?: string,
    senateVote?: string,
}

export type Vote = {
    uid: string,
    yeas: string[],
    nays: string[],
    yea_count: number,
    nay_count: number,
    date: Date,
}

export type Representative = {
    uid: string,
    name: string,
    state: string,
    party: Party
}