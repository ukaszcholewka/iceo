import { makeAutoObservable, runInAction } from 'mobx'
import { defaultStatus, load, ReqStatus } from '@/api/helpers'
import localApi, { BalancesRes, CurrenciesRes, UsersRes } from '@/api/localApi'

class LocalApiStore {
    private _balance: ReqStatus<BalancesRes> = { ...defaultStatus }
    private _users: ReqStatus<UsersRes> = { ...defaultStatus }
    private _currencies: ReqStatus<CurrenciesRes> = { ...defaultStatus }

    public constructor() {
        makeAutoObservable(this)
    }

    private setBalance = (balance: ReqStatus<BalancesRes>) => {
        this._balance = balance
    }

    public get balance() {
        load<BalancesRes>(localApi.getBalances, this.setBalance, this._balance)
        return this._balance
    }

    private setUsers = (users: ReqStatus<UsersRes>) => {
        runInAction(() => {
            this._users = users
        })
    }

    public get users() {
        load<UsersRes>(localApi.getUsers, this.setUsers, this._users)
        return this._users
    }

    private setCurrency = (currencies: ReqStatus<CurrenciesRes>) => {
        this._currencies = currencies
    }

    public get currences() {
        load<CurrenciesRes>(
            localApi.getCurrencies,
            this.setCurrency,
            this._currencies
        )
        return this._currencies
    }

    public getParsedBalance() {
        const balance = this.balance
        const users = this.users
        const currencies = this.currences

        if (!balance.isSuccess || !users.isSuccess || !currencies.isSuccess)
            return null

        const data = [
            ...balance.data.data.collection.map((item) => ({ ...item })),
        ]

        return data.map((item) => ({
            ...item,
            userName:
                users.data.data.collection.find(
                    (user) => user.userId === item.userId
                )?.userName || item.userId,
            currencyName:
                currencies.data.data.collection.find(
                    (currency) => item.currencyId === currency.currencyId
                )?.currencyName || item.currencyId,
            precision:
                currencies.data.data.collection.find(
                    (currency) => item.currencyId === currency.currencyId
                )?.precision || 0,
        }))
    }
}

const localApiStore = new LocalApiStore()
export default localApiStore
