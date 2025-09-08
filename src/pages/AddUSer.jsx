import React, { useState } from 'react'
import '../sass/AddUser.scss'
import dbs from '../components/firebase'
import { useNavigate } from 'react-router-dom'
function AddUSer() {
    let user = JSON.parse(localStorage.getItem("user"))
    let navigate = useNavigate()
    const [name, setName] = useState("")
    const [err, setErr] = useState("")

    const AddMember = async () => {
        try {
            let usersDoc = await dbs.readDocument(user.email, "users"); // await the data
            let currentUsers = usersDoc?.users || [];

            if (currentUsers.includes(name)) {
                setErr("Already Member Added");
            } else {
                let data = {
                    users: [...currentUsers, name],
                };
                await dbs.updateDocument(user.email, "users", data);
                navigate("/Dashboard");
            }
        } catch (error) {
            console.error("Error adding member:", error);
            setErr("Failed to add member. Please try again.");
        }
    };

    return (
        <div className="adduser">
            <div className="content">
                <h2>Add New Family Member ...</h2><br />
                <input type="text" placeholder='Name ...' value={name} onChange={(e) => { setName(e.target.value) }} /><br /><br />
                <button onClick={AddMember}>Add Member .</button>
                {err && <p>{err}</p>}
            </div>
        </div>
    )
}

export default AddUSer