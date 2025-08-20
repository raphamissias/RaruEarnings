interface IOrder {
    id: number,
    user: number,
    customer: number,
    teeths: string,
    color: string,
    date: Date,
}

type IOrderOmitId = Omit<IOrder, 'id'>

type IOrderId = Pick<IOrder, 'id'>

export { IOrder, IOrderOmitId, IOrderId }