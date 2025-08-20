interface ICustomer {
    id: number,
    name: string,
}

type ICustomerOmitId = Omit<ICustomer, 'id'>

type ICustomerId = Pick<ICustomer, 'id'>

export { ICustomer, ICustomerOmitId, ICustomerId }