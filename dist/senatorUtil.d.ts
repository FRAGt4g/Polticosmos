export declare function cacheBioguideData(): Promise<void>;
export type Senator = {
    last_name: string;
    first_name: string;
    party: string;
    state: string;
    lis_member_id: string;
};
export declare function getBioguide(senator: Senator): Promise<string>;
export declare function getFullName(senator: Senator): Promise<string>;
//# sourceMappingURL=senatorUtil.d.ts.map