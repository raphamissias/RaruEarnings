export interface ITransaction {
    id: number;
    name: string;
    value: string;
    isDiscount: boolean;
    date: string;
}

export interface ITransactionFormValues {
    name: string;
    value: number | any;
    isDiscount: boolean;
    date: string;
}