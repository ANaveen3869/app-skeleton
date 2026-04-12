import { Result } from '@praha/byethrow';
import axios from "axios";
import { HttpMethod } from './types';
function fetchData<T>(url: string, method: HttpMethod, data: unknown, queryParameters: Record<string, string>, customHeaders: Record<string, string>) {
    return Result.try({
        async try() {
            if (queryParameters) {
                const params = new URLSearchParams(queryParameters);
                url += `?${params.toString()}`;
            }
            const response = await axios({
                method,
                url,
                data: method !== "GET" && data
                    ? JSON.stringify(data)
                    : undefined, 
                headers: {
                    "Content-Type": "application/json",
                    ...customHeaders
                }
            })
            return response.data as T;
        }, catch(error) {
            console.error("Fetch failed:", error);
            if (axios.isAxiosError(error)) {
                return new Error(
                    error.response?.data?.message ||
                    error.message ||
                    "Request failed"
                );
            }
            return error instanceof Error
                ? error
                : new Error("Unknown error");
        }
    })
}

class AxiosClient {
    private async request<T>(url: string, method: HttpMethod, data: unknown, queryParameters: Record<string, string>, customHeaders: Record<string, string>) : Promise<T>{
        const result = await fetchData<T>(url, method, data, queryParameters, customHeaders);
        if (Result.isFailure(result)) {
            throw result.error;
        }
        return result.value as T;
    }
    async get<T>(url: string, queryParameters: Record<string, string> = {}, customHeaders: Record<string, string> = {}) {
        return this.request<T>(url, "GET", undefined, queryParameters, customHeaders)
    }
    async post<T>(url: string, data: unknown, queryParameters: Record<string, string> = {}, customHeaders: Record<string, string> = {}) {
        return this.request<T>(url, "POST", data, queryParameters, customHeaders);
    }
    async patch<T>(url: string, data: unknown, queryParameters: Record<string, string> = {}, customHeaders: Record<string, string> = {}) {
        return this.request<T>(url, "PATCH", data, queryParameters, customHeaders);
    }
    async delete<T>(url: string, data: unknown, queryParameters: Record<string, string> = {}, customHeaders: Record<string, string> = {}) {
        return this.request<T>(url, "DELETE", data, queryParameters, customHeaders);
    }
}
export default AxiosClient