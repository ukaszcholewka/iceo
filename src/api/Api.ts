export default class Api {
    public constructor(private _baseUrl: string) {}

    private _headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    public async get<T>(url: string): Promise<T> {
        const result = await fetch(this._baseUrl + url, {
            method: 'get',
            headers: {
                ...this._headers,
            },
        })
        return await result.json()
    }
}
