import axios, { AxiosRequestConfig } from "axios";

export interface IMustApiAdapter {
    fetch: <T>(uri: string, init?: AxiosRequestConfig) => Promise<T>
}


export class MustApiAdapter implements IMustApiAdapter {
    _url: string;
    public constructor() {
        this._url = "http://10.161.248.71:4042";
        // this._url = "http://localhost:4042";
    }

    public async fetch<T>(uri: string, init?: AxiosRequestConfig): Promise<T> {
        const request = await axios(`${this._url}${uri}`, { ...init });
        return await request.data;
    }
}