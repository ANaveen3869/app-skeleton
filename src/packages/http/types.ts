import AxiosClient from "./axiosClient";
import FetchClient from "./fetchClient";

export type HttpMethod = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
export type HttpClient = "axios" | "fetch";
export type HttpHandler = FetchClient | AxiosClient;
