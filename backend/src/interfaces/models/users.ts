interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
}

type IUserOmitId = Omit<IUser, 'id'>

type IUserId = Pick<IUser, 'id'>

export { IUser, IUserOmitId, IUserId }