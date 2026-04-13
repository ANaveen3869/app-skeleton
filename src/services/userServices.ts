import getHttpClient from "../packages/http/httpClient";

const $fetch = getHttpClient("fetch");

class UserServiceProvider {
    async getUsers<T>() {
        const users = await $fetch.get<T>("https://jsonplaceholder.typicode.com/users");
        return users;
    }
    async getUserTodos<T>(userId: number) {
        const userTodos = await $fetch.get<T>(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        return userTodos;
    }
}

export default UserServiceProvider;