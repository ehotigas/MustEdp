import axios, { AxiosRequestConfig } from "axios";

export interface IMustApiAdapter {
    fetch: <T>(uri: string, init?: AxiosRequestConfig) => Promise<T>
}


export class MustApiAdapter implements IMustApiAdapter {
    _url: string;
    public constructor() {
        // this._url = "http://172.20.74.21:4042";
        this._url = "http://localhost:4042";
    }

    public async fetch<T>(uri: string, init?: AxiosRequestConfig): Promise<T> {
        const headers = init && init.headers ? init.headers : {};
        const request = await axios({ ...init, url: `${this._url}${uri}`, headers: { ...headers, 'Cache-Control': 'no-cache' }});
        return await request.data;
    }
}