import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default class ApiServiceWrapper {
    constructor() { }

    protected async GET<T = any, R = AxiosResponse<T>, D = any>(url: string, options: AxiosRequestConfig<D> = {}): Promise<R> {
        return await axios.get(url, { ...options });
    }

    protected async POST<T = any, R = AxiosResponse<T>, D = any>(url: string, body: D, options: AxiosRequestConfig<D> = {}): Promise<R> {
        return await axios.post(url, { ...body }, { ...options });
    }

    protected resolvePromise(res: AxiosResponse): Promise<any> {
        return new Promise((onResolve) => {
            onResolve(res.data);
        });
    }

    protected rejectPromise(err: any): Promise<any> {
        return new Promise((onReject) => {
            onReject(err);
        });
    }
}

