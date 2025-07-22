export interface IHistoryOrder {
    Currency?: string;
    OrderId?: string;
    PaymentMethod?: string;
    Status?: string;
    SubmittedDate?: string;
    TotalCost?: string;
    TotalPaid?: string;
    ItemList: ItemList[];
}

export interface ItemList {
    Cost?: string;
    Duration?: string;
    ItemType?: string;
    Name?: string;
    Status?: string;
}

