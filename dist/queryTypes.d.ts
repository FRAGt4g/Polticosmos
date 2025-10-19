export type RawRepresentative = {
    bioguideId: string;
    district?: number;
    firstName: string;
    fullName: string;
    isByRequest: string;
    lastName: string;
    middleName?: string;
    party: string;
    state: string;
    url: string;
};
export type RawBill = {
    actions: PaginationReference;
    amendments: {
        count: number;
        url: string;
    };
    cboCostEstimates: {
        description: string;
        pubDate: string;
        title: string;
        url: string;
    }[];
    committeeReports: {
        citation: string;
        url: string;
    }[];
    committees: PaginationReference;
    congress: number;
    constitutionalAuthorityStatementText: string;
    cosponsors: PaginationReference;
    introducedDate: string;
    latestAction: {
        actionDate: string;
        text: string;
    };
    laws: {
        number: string;
        type: string;
    }[];
    legislationUrl: string;
    number: string;
    originChamber: string;
    policyArea: {
        name: string;
    };
    relatedBills: PaginationReference;
    sponsors: RawRepresentative[];
    subjects: PaginationReference;
    summaries: PaginationReference;
    textVersions: PaginationReference;
    title: string;
    titles: PaginationReference;
    type: string;
    updateDate: string;
    updateDateIncludingText: string;
};
export type RawVote = {
    chamber: string;
    congress: number;
    date: string;
    rollNumber: number;
    sessionNumber: number;
    url: string;
};
export type RawAction = {
    actionCode: string;
    actionDate: string;
    sourceSystem: {
        code: number;
        name: string;
    };
    committees?: {
        name: string;
        systemCode: string;
        url: string;
    }[];
    calendarNumber?: {
        calendar: string;
    };
    recordedVotes?: RawVote[];
    text: string;
    type: string;
};
export type RawCommittee = {
    activities: {
        date: string;
        name: string;
    }[];
    chamber: string;
    name: string;
    systemCode: string;
    type: string;
    url: string;
};
export type PaginationReference = {
    count: number;
    url: string;
};
export type PaginationData = {
    count: number;
    next?: string;
};
export type Paginated = {
    pagination: PaginationData;
};
export type BillBaseResponse = {
    bill: RawBill;
    request: any;
};
export type BillActionsResponse = {
    actions: RawAction[];
    request: any;
} & Paginated;
export type BillCommitteesResponse = {
    committees: RawCommittee[];
    request: any;
} & Paginated;
export type BillCosponsorsResponse = {
    cosponsors: RawRepresentative[];
    request: any;
} & Paginated;
export type VoteMembersResponse = {
    houseRollCallMemberVotes: {
        congress: number;
        identifier: number;
        legislationNumber: string;
        legislationType: string;
        legislationUrl: string;
        results: {
            bioguideID: string;
            firstName: string;
            lastName: string;
            voteCast: string;
            voteParty: string;
            voteState: string;
        }[];
        result: string;
        rollCallNumber: number;
        sessionNumber: number;
        sourceDataURL: string;
        startDate: string;
        updateDate: string;
        voteQuestion: string;
        voteType: string;
    };
};
export type MemberResponse = {
    member: {
        bioguideId: string;
        birthYear: string;
        cosponsoredLegislation: PaginationReference;
        depiction: {
            attribution: string;
            imageUrl: string;
        };
        directOrderName: string;
        currentMember?: boolean;
        district?: number;
        firstName: string;
        invertedOrderName: string;
        lastName: string;
        leadership: {
            congress: number;
            type: string;
        }[];
        partyHistory: {
            partyAbbreviation: string;
            partyName: string;
            startYear: string;
        }[];
        sponsoredLegislation: PaginationReference;
        state: string;
        terms: {
            chamber: string;
            congress: number;
            endYear: number;
            memberType: string;
            startYear: number;
            stateCode: string;
            stateName: string;
        }[];
        updateDate: string;
    };
};
//# sourceMappingURL=queryTypes.d.ts.map