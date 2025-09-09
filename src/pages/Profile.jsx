import React from 'react'
import "../sass/Profile.scss"
import { useNavigate } from 'react-router-dom'
function Profile() {
    let user = JSON.parse(localStorage.getItem("user"))
    let navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        
        navigate("/")
        window.location.reload()
    }
    return (
        <div className="profile">
            <div className="content">
                <h1>Profile</h1>
                <h2>{user.displayName}</h2>
                <pre>{user.email}</pre>
                <br />
                <br />
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Profile  