export type BillReference = string;
export type RepReference = string;
export type VoteReference = string;
export type PartyAffiliation = "R" | "D" | "I";
export const BillTypes = ["hr", "s"] as const;
export type BillType = (typeof BillTypes)[number];
export type State = string;

export type Rep = {
  uid: string;
  name: string;
  state: State;
  party: PartyAffiliation;
};

export type VoteResolution = {
  yeas: RepReference[];
  nays: RepReference[];
  yea_count: number;
  nay_count: number;
  date: Date;
};

export type Bill = {
  uid: string;
  congress: number;
  type: BillType;
  number: number;
  title: string;
  description: string;
  sponsors: RepReference[];
  committees: string[];
  cosponsors: RepReference[];
  states: BillState[];
  last_transition: Date;
  house_vote: VoteReference;
  senate_vote: VoteReference;
};

export const BillState = [
  "introduced", // introduced in house or senate
  "house", // passed house
  "senate", // passed senate
  "conference", // sent to conference
  "conference_house", // passed only house conference
  "conference_senate", // passed only senate conference
  "conference_passed", // passed both house and senate conference
  "president", // sent to president
  "veto", // vetoed by president
  "veto_house", // veto overridden by house
  "veto_senate", // veto overridden by senate
  "veto_overridden", // veto overridden by both house and senate
  "law", // became public law
] as const;

export type BillState = (typeof BillState)[number];

export type VoterPercentageBar = {
  yays: {
    republican: number;
    democrat: number;
    independent: number;
  };
  nays: {
    republican: number;
    democrat: number;
    independent: number;
  };
  other: {
    republican: number;
    democrat: number;
    independent: number;
  };
};

export type Star = {
  id: string;
  name: string;
  constellation: string;
  distance: string;
  magnitude: number;
  spectralType: string;
  description: string;
  facts: string[];
  x: number;
  y: number;
  size: number;
  color: string;
  twinkleDelay: number;
  bill?: BillReference;
};

export type Preferences = {
  theme: PREFERENCE_Theme;
  sidebarLocation: PREFERENCE_SidebarChoice;
};

export type PREFERENCE_Theme = "dark" | "light" | "system";
export type PREFERENCE_SidebarChoice = "left" | "right";

export interface StarObject {
  position: [number, number, number];
  scale: number;
  billId: string;
}

export type StarMatrix = {
  objects: StarObject[];
};
