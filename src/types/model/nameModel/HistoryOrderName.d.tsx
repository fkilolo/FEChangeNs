export interface IHistoryOrderName {
    id?: number;
    createDate?: Date;
    status?: string;
    currency?: string;
    authAmount?: number;
    totalCapture?: number;
    finalAmount?: string;
    orderItems?: IHistoryOrderItems[];
}

export interface IHistoryOrderItems {
    id?: number;
    status?: string;
    name?: string;
    tld?: string;
    type?: string;
    price?: number;
    quantity?: number;
    duration?: number;
    interval?: string;
}
