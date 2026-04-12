import { useEffect, useState } from "react";
import getHttpClient from "./packages/http/httpClient";
const fetchInstance = getHttpClient("fetch");
function App() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            setLoading(true)
            const usersData = await fetchInstance.get<User[]>("https://jsonplaceholder.typicode.com/users");
            setUsers(usersData);
            setLoading(false);
        })()
    }, [])
    if (isLoading) {
        return <div>Loading users...</div>
    }

    if (!users || users.length === 0) {
        return <div>No users found</div>
    }
    return (
        <>
            {
                users.map((user) => {
                    return <div key={user.id}>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span>{user.phone}</span>
                    </div>
                })
            }
        </>
    )
}

export default App;

