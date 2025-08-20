interface ITransaction {
    id: number,
    userId: number,
    name: string,
    value: number,
    isDiscount: boolean,
    date: Date,
}

type ITransactionOmitId = Omit<ITransaction, 'id'>

type ITransactionId = Pick<ITransaction, 'id'>

export { ITransaction, ITransactionOmitId, ITransactionId }