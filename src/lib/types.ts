export interface StarObject {
  position: [number, number, number];
  scale: number;
  name: string;
  constellation?: string;
  distance?: string;
  magnitude?: number;
  spectralType?: string;
  description?: string;
  facts?: string[];
  color?: string;
  twinkleDelay?: number;
  bill?: BillSideBarInfo;
}

export type StarMatrix = {
  objects: StarObject[];
};

export type BillSideBarInfo = {
  name: string;
  committeeOrigination: string;
  sponsors: Sponsor[];
  summary: string;
  republicanSponsors: number;
  democratSponsors: number;
  independentSponsors: number;
  sponsorshipPercentageBar: VoterPercentageBar;
  houseVoterPercentageBar: VoterPercentageBar;
  senateVoterPercentageBar: VoterPercentageBar;
  mediaCoverage: string;
  linkToPdf: URL;
  status: BillStatus;
};

export type Sponsor = {
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

export interface Star {
  id: number;
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
  bill?: BillSideBarInfo;
}
