interface IOrderItem {
    id: number,
    order: number,
    task: number,
}

type IOrderItemOmitId = Omit<IOrderItem, 'id'>

type IOrderItemId = Pick<IOrderItem, 'id'>

export { IOrderItem, IOrderItemOmitId, IOrderItemId }