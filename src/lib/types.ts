export interface StarObject {
  position: [number, number, number];
  scale: number;
  billId: string;
}

export type StarMatrix = {
  objects: StarObject[];
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
  bill?: Bill;
};

export type Senator = {
  id: number;
  name: string;
  state: string;
  party: "Republican" | "Democrat" | "Independent";
  bills: Bill[];
};

export type Bill = {
  id: string;
  name: string;
  committeeOrigination: string;
  sponsors: BillSponsor[];
  summary: string;
  republicanSponsors: number;
  democratSponsors: number;
  independentSponsors: number;
  sponsorshipPercentageBar: VoterPercentageBar;
  houseVoterPercentageBar: VoterPercentageBar;
  senateVoterPercentageBar: VoterPercentageBar;
  mediaCoverage: string;
  linkToPdf: URL;
  statusHistory: BillStatus[];
};

export type BillSponsor = {
  name: string;
  party: "Republican" | "Democrat" | "Independent";
};

export type BillStatus =
  | "Introduced"
  | "House"
  | "Senate"
  | "President"
  | "Failed"
  | "Passed";

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

export type Preferences = {
  theme: PREFERENCE_Theme;
  sidebarLocation: PREFERENCE_SidebarChoice;
};

export type PREFERENCE_Theme = "dark" | "light" | "system";
export type PREFERENCE_SidebarChoice = "left" | "right";
