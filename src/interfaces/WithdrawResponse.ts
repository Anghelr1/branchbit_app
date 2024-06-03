export interface WithdrawResponse {
    status:     string;
    statusCode: number;
    message:    string;
    dataCount:  number;
    data:       Datum[];
}

export interface Datum {
    type:       string;
    quantity:   number;
    value:      number;
    totalValue: number;
}
