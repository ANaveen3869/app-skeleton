import { Result } from '@praha/byethrow';
import { HttpMethod } from './types';
function fetchData<T>(url: string, method: HttpMethod, data: unknown, queryParameters: Record<string, string>, customHeaders: Record<string, string>) {
    return Result.try({
        async try() {
            if (queryParameters && Object.keys(queryParameters).length > 0 ) {
                const params = new URLSearchParams(queryParameters);
                url += `?${params.toString()}`;
            }
            const response = await fetch(url, {
                method,
                body: method !== "GET" && data
                    ? JSON.stringify(data)
                    : undefined,
                headers: {
                    "Content-Type": "application/json",
                    ...customHeaders
                }
            });

            if (!response.ok) {
                console.error(`Response status: ${response.status}`)
                const text = await response.text();
                throw new Error(text || `HTTP ${response.status}`);
            }
            const text = await response.text();
            return text ? JSON.parse(text) as T : null;

        }, catch(error) {
            console.error("Failed to fetch data:", error);
            throw error;
        }
    })
}


class FetchClient {
    private async request<T>(url: string, method: HttpMethod, data: unknown, queryParameters: Record<string, string>, customHeaders: Record<string, string>) {
        const result = await fetchData<T>(url, method, data, queryParameters, customHeaders);
        if (Result.isFailure(result)) {
            throw result.error;
        }
        return result.value;
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
    async delete<T>(url: string, queryParameters: Record<string, string> = {}, customHeaders: Record<string, string> = {}) {
        return this.request<T>(url, "DELETE", undefined, queryParameters, customHeaders);
    }
}

export default FetchClient