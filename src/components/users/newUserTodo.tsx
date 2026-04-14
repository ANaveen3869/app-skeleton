import { useState } from "react";

function AddUserTodoForm() {
    const [title, setTitle] = useState<string>("");
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
        }} style={{
            position : "fixed",
            top : 0,
            right: 0,
            width : "400px",
            height : "100%",
            zIndex : 100,
            backgroundColor : "lightgray"
        }}>
            <input type="text" value={title} placeholder="title" onChange={(e) => {
                setTitle(e.target.value);
            }} />
            <button>submit</button>
        </form>
    )
}

export default AddUserTodoForm;