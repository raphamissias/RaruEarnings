interface ITask {
    id: number,
    name: string,
    value: number,
}

type ITaskOmitId = Omit<ITask, 'id'>

type ITaskId = Pick<ITask, 'id'>

export { ITask, ITaskOmitId, ITaskId }