import getHttpClient from "../packages/http/httpClient";

const $fetch = getHttpClient("fetch");

class UserServiceProvider {
    async getUsers<T>() {
        const users = await $fetch.get<T>("https://jsonplaceholder.typicode.com/users");
        return users ?? [];
    }
    async getUserTodos<T>(userId: number ,  page : number = 1 , pageSize : number = 10) {
        const queryParameters = {
            _page : String(page) ,
            _limit : String(pageSize)
        }
        const userTodos = await $fetch.get<T>(`https://jsonplaceholder.typicode.com/users/${userId}/todos` , queryParameters);
        return userTodos ?? [];
    }
}

export default UserServiceProvider;