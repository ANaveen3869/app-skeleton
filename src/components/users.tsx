import { useEffect, useState } from "react";
import UserServiceProvider from "../services/userServices";
import { Todo } from "../types/todos";
import { User } from "../types/users";

const userService = new UserServiceProvider();

function UsersList() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [userTodos, setUserTodos] = useState<Todo[] | null>(null);
    async function getUserTodosById(userId: number) {
        const userTodos = await userService.getUserTodos<Todo[]>(userId);
        setUserTodos(userTodos);
    }
    useEffect(() => {
        (async () => {
            const usersData = await userService.getUsers<User[]>();
            setUsers(usersData);
        })();
    }, [])
    if (!users) {
        return <div>No users</div>;
    }
    return (
        <div>
            {
                users && (
                    <>
                        <h1>Users</h1>  {
                            users.map((user) => {
                                return <div key={user.id} style={{
                                    border: "1px solid black",
                                    cursor: "pointer"
                                }} onClick={async () => {
                                    await getUserTodosById(user.id);
                                }}>
                                    <span><strong>{user.name}</strong></span>
                                    <span><strong>{user.email}</strong></span>
                                    <span><strong>{user.phone}</strong></span>
                                </div>
                            })
                        }
                    </>)
            }
            {
                userTodos && (
                    <>
                        <h1>User todos</h1> {
                            userTodos.map((todo) => {
                                return <div key={todo.id}>
                                    <span><strong>{todo.title}</strong></span>
                                </div>
                            })
                        }
                    </>
                )
            }
        </div>
    )
}

export default UsersList;