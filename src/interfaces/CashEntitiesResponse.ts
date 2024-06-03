export interface CashEntitiesResponse {
  status: string;
  statusCode: number;
  message: string;
  dataCount: number;
  data: Datum[];
}

export interface Datum {
  type: Type;
  quantity: number;
  value: number;
  totalValue: number;
}

export enum Type {
  Bill = 'BILL',
  Coin = 'COIN',
}
