export interface Participant {
    name: string;
    value: number;
}

export interface FindHowManyPayWithoutDiferences {
    expenseName: string;
    participants: Participant[];
}

export interface OnlyParticipants {
    name: string;
    value: number;
}
export interface SumOfPaids {
    name: string;
    value: number;
}
export interface Total {
    name: string;
    value: number;
}