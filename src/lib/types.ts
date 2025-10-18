export type BillSideBarInfo = {
  name: string;
  committeeOrigination: string;
  sponsors: string[];
  summary: string;
  republicanSponsors: number;
  democratSponsors: number;
  independentSponsors: number;
  sponsorshipPercentageBar: VoterPercentageBar;
  houseVoterPercentageBar: VoterPercentageBar;
  senateVoterPercentageBar: VoterPercentageBar;
  mediaCoverage: string;
  linkToPdf: URL;
  status: "Introduced" | "House" | "Senate" | "President" | "Failed" | "Passed";
};

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
