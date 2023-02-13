import Api from './Api'

interface BaseRes<T> {
    timestamp: number
    data: {
        hasNextPage: boolean
        query: {
            limit: number
            offset: number
        }
        collection: T[]
    }
}

export type BalancesRes = BaseRes<{
    userId: string
    balanceId: string
    balanceType: 'ADMIN' | 'SYSTEM' | 'USER'
    balanceName: string
    fundsAvailable: string
    updatedAt: number
    createdAt: number
    currencyId: string
}>

export type CurrenciesRes = BaseRes<{
    currencyId: string
    currencyName: string
    precision: number
}>

export type UsersRes = BaseRes<{
    userId: string
    userName: string
}>

class LocalApi {
    private _api = new Api('//localhost:5173') // This should be in .env

    public getBalances = async () => {
        return await this._api.get<BalancesRes>('/mock-balances.json')
    }

    public getUsers = async () => {
        return await this._api.get<UsersRes>('/mock-users.json')
    }

    public getCurrencies = async () => {
        return await this._api.get<CurrenciesRes>('/mock-currencies.json')
    }
}

const localApi = new LocalApi()
export default localApi
