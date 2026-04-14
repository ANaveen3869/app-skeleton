import { useEffect, useState } from "react";
import TableList from "./components/table";
import UserServiceProvider from "./services/userServices";
import { Todo } from "./types/todos";
import { User } from "./types/users";

const userService = new UserServiceProvider();

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [userTodos, setUserTodos] = useState<Todo[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const usersData = await userService.getUsers<User[]>();
            setUsers(usersData);
            setIsLoading(false)
        })()
    }, [])

    async function fetchUserTodosById(userId: number) {
        const userTodosData = await userService.getUserTodos<Todo[]>(userId);
        setUserTodos(userTodosData)
    }

    function renderItem(user: User) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid black"
            }}>
                <span><strong>{user.name}</strong></span>
                <span><strong>{user.email}</strong></span>
                <span><strong>{user.website}</strong></span>
            </div>
        )
    }
    return (
        <>
            {/* <CardList
                data={users}
                loading={isLoading}
                emptyState={<div>No users available</div>}
                getKey={(user) => user.id}
                renderItem={renderItem}
            /> */}

            <TableList

                data={users}
                getKey={(user) => user.id}
                onClickRow={async (user) => {
                    await fetchUserTodosById(user.id);
                }}
                columns={[
                    {
                        id: "s.no",
                        name: "S.No",
                        render: (_, index) => {
                            return <span>{index + 1}</span>
                        }
                    },
                    {
                        id: "name",
                        name: "Name",
                        accessor: "name"
                    },
                    // {
                    //     id: "email",
                    //     name: "Email",
                    //     accessor : "email"
                    // }, {
                    //     id: "website",
                    //     name: "Website",
                    //     accessor : "website"
                    // },
                    // {
                    //     id: "company",
                    //     name: "company",
                    //     render(item, _) {
                    //         return <span>{item.company.name}</span>
                    //     },
                    // }
                ]}

            />
            {
                userTodos && userTodos.length > 0 && (
                    // <CardList 
                    //     data={userTodos}
                    //     getKey={(todo) => todo.id}
                    //     renderItem={(todo)=>(
                    //         <div>{todo.title}</div>
                    //     )}
                    // />
                    <ol>
                        {userTodos.map((todo) => (
                            <li key={todo.id}>{todo.title}</li>
                        ))}
                    </ol>
                )
            }
        </>
    )


}

export default App;

