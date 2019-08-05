export interface FundraiserDTO {
    id: string;
    title: string;
    campaignOwnerName: string;
    amountRaised?: number;
    goal?: number;
    daysLeft?: number;
    language?: string;
    skipped: boolean;
    thanked: boolean;
    manualNeeded: boolean;
    observation?: string;
    story?: string;
    chargeDate: string;
    invited?: string;
}
