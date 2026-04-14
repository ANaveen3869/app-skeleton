import { NewUser } from "@/types/users";
import { useState } from "react";

type AddUserFormProps = {
    onClose :() => void;
}

function AddUserForm( { onClose }: AddUserFormProps) {
    const [newUser, setNewUser] = useState<NewUser>({
        name: "",
        email: "",
        password: ""
    });
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            onClose();
        }} style={{
            position : "fixed",
            top : 0,
            right : 0,
            width : "400px",
            height : "100%",
            backgroundColor : "lightgray",

            display : "flex",
            flexDirection : "column",
            gap : "10px",

        }}>
            <input type="text" value={newUser.name} onChange={(e)=>{
                setNewUser((prev)=>{
                    return {
                        ...prev,
                        name : e.target.value
                    }
                })
            }} placeholder="Name" />
            <input type="email" value={newUser.email} onChange={(e)=>{
                setNewUser((prev)=>{
                    return {
                        ...prev,
                        email : e.target.value
                    }
                })
            }} placeholder="email" />
            <input type="password" value={newUser.password} onChange={(e)=>{
                setNewUser((prev)=>{
                    return {
                        ...prev,
                        password : e.target.value
                    }
                })
            }} placeholder="password" />
            <button style={{
                cursor : "pointer"
            }}>submit</button>
            <button onClick={onClose}>close</button>
        </form>
        
    )
}

export default AddUserForm;