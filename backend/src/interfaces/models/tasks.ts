interface ITask {
    id: number,
    name: string,
    value: number,
}

interface ITaskRead {
    id: number,
    name: string,
    value: string
}

type ITaskOmitId = Omit<ITask, 'id'>

type ITaskId = Pick<ITask, 'id'>

export { ITask, ITaskRead, ITaskOmitId, ITaskId }