export interface ICustomer {
    id: number;
    name: string;
    contact: string;
}

export type ICustomerOmitId = Omit<ICustomer, 'id'>