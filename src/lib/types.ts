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
  uid: string;
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

export type ExtraBillInformation = {
  category: string;
  summary: string;
  tags: Tag[];
};

export type Tag = string;

export type ConcatenatedBillStates = string;

export const FutureBillStates = {
  introduced: (bill: Bill) =>
    bill.type === "hr"
      ? ["house", "senate", "president", "law"]
      : ["senate", "house", "president", "law"],
  house: (_: Bill) => ["senate", "president", "law"],
  senate: (_: Bill) => ["house", "president", "law"],
  conference: (bill: Bill) =>
    bill.type === "hr"
      ? [
          "conference_house",
          "conference_senate",
          "conference_passed",
          "president",
          "law",
        ]
      : [
          "conference_senate",
          "conference_house",
          "conference_passed",
          "president",
          "law",
        ],
  conference_house: (_: Bill) => [
    "conference_senate",
    "conference_passed",
    "president",
    "law",
  ],
  conference_senate: (_: Bill) => [
    "conference_house",
    "conference_passed",
    "president",
    "law",
  ],
  conference_passed: (_: Bill) => ["president", "law"],
  president: (_: Bill) => ["law"],
  veto: (_: Bill) => [],
  veto_house: (_: Bill) => [],
  veto_senate: (_: Bill) => [],
  veto_overridden: (_: Bill) => [],
  law: (_: Bill) => [],
} as const satisfies Record<BillState, (_: Bill) => BillState[]>;

export const HumanReadableBillStates = {
  introduced: "Introduced",
  house: "Passed House",
  senate: "Passed Senate",
  conference: "Conference",
  conference_house: "Passed House",
  conference_senate: "Passed Senate",
  conference_passed: "Passed Conference",
  president: "President",
  veto: "Veto",
  veto_house: "House Overridden",
  veto_senate: "Senate Overridden",
  veto_overridden: "Veto Overridden",
  law: "Law",
} as const satisfies Record<BillState, string>;

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
  rep_perc: number;
  name: string;
  billId: string;
}

export type StarMatrix = {
  objects: StarObject[];
};
