import AxiosClient from "./axiosClient";
import FetchClient from "./fetchClient";
import { HttpClient, HttpHandler } from "./types";

const clients: Record<HttpClient, HttpHandler> = {
    axios: new AxiosClient(),
    fetch: new FetchClient(),
};

function getHttpClient(type: HttpClient) {
    const client = clients[type];
    if (!client) {
        throw new Error(`Unsupported HTTP client: ${type}`);
    }
    return client;
}

export default getHttpClient;