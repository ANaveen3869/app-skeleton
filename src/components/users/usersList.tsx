import UserServiceProvider from "@/services/userServices";
import { Todo } from "@/types/todos";
import { User } from "@/types/users";
import { useEffect, useState } from "react";
import AddUserForm from "./newUser";
import AddUserTodoForm from "./newUserTodo";


const userService = new UserServiceProvider();

function UsersList() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [userTodos, setUserTodos] = useState<Todo[] | null>(null);
    const [isAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);
    async function getUserTodosById(userId: number) {
        const userTodos = await userService.getUserTodos<Todo[]>(userId);
        setUserTodos(userTodos);
    }
    function toggleAddUserComponent() {
        setIsAddUserOpen((pre) => {
            return !pre;
        })
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
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <h1>Users</h1>
                            <button style={{
                                cursor: "pointer"
                            }} onClick={toggleAddUserComponent}>+addUser</button>
                        </div>
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            columnGap : "40px",
                            rowGap : "20px",
                        }}>{
                                users.map((user) => {
                                    return <div key={user.id} style={{
                                        display : "flex",
                                        flexDirection : "column",
                                        rowGap : "5px",
                                        border: "1px solid black",
                                        cursor: "pointer",
                                    }} onClick={async () => {
                                        await getUserTodosById(user.id);
                                    }}>
                                        <span><strong>{user.name}</strong></span>
                                        <span><strong>{user.email}</strong></span>
                                        <span><strong>{user.phone}</strong></span>
                                    </div>
                                })
                            }
                        </div>
                    </>)
            }
            {
                isAddUserOpen && <AddUserForm onClose={toggleAddUserComponent} />
            }
            {
                userTodos && userTodos.length > 0 ? (
                    <>
                        <div>
                            <h1>Todos</h1>
                            <AddUserTodoForm />
                        </div>
                        {
                            userTodos.map((todo) => {
                                return <div key={todo.id}>
                                    <span><strong>{todo.title}</strong></span>
                                </div>
                            })
                        }
                    </>
                ) : (
                    <div> select user to see todos</div>
                )
            }

        </div>
    )
}

export default UsersList;