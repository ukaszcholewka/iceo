import { makeAutoObservable } from 'mobx'

export type UserTypes = 'Admin' | 'User'

class UserStore {
    private _name = 'Jan Kowalski'
    private _email = 'j.kowalski@gmail.com'
    private _type: UserTypes = 'Admin'

    public constructor() {
        makeAutoObservable(this)
    }

    public get name() {
        return this._name
    }

    public get email() {
        return this._email
    }

    public get type() {
        return this._type
    }
}

const userStore = new UserStore()
export { userStore }
