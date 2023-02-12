import { makeAutoObservable } from 'mobx'

class AppStore {
    private _showDrawer = false

    public constructor() {
        makeAutoObservable(this)
    }

    public set showDrawer(status: boolean) {
        this._showDrawer = status
    }

    public get showDrawer() {
        return this._showDrawer
    }
}

const appStore = new AppStore()
export { appStore }
