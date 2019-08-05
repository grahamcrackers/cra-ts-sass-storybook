export interface MessageType {
    id: number;
    isActive: boolean;
    isGoalMet: boolean;
    hasTwelveHoursLeft: boolean;
    hasThreeDaysLeft: boolean;
}

export interface MessageDTO {
    id?: number;
    text: string;
    language: string;
    type: MessageType;
}
