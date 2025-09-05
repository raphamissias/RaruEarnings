export interface ICustomer {
    id: number;
    name: string;
}

export type ICustomerOmitId = Omit<ICustomer, 'id'>