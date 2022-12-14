export interface ListOfParticipants {
  id: string;
  description: string;
  expenses: string | number;
  icon: string | null;
  participant: string;
  thumbPhoto?: Uint8Array;
}

export interface ParticipantsShare {
  participants: string[];
  expenseName: string;
  icon: string;
}

export interface Participant {
  name: string;
  value: number;
}

export interface FindHowManyPayWithoutDiferences {
  expenseName: string;
  participants: Participant[];
  icon?: string;
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

export interface ListCard {
  name: string;
  expenseCard: ExpenseCard[];
}

export interface ExpenseCard {
  id: string;
  description: string;
  expenses: string | number;
  icon: string | null;
  thumbPhoto?: Uint8Array;
}
