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
export interface ListForResult {
  participant: string;
  expenses: number;
}

export interface Sugestion {
  name: string;
  value?: number;
  pays?: Pays;
  receives?: Receives;
}

export interface Receives {
  receiveFrom?: string;
  receiveValue?: number;
}

export interface Pays {
  pays?: string;
  payValue?: number;
}
