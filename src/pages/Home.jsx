import React from 'react'
import '../sass/Home.scss'
import { Link } from 'react-router-dom'
function Home() {
    return (
        <div className="home">
            <div className="left">
                <h1>Your Digital ID Hub</h1>
                <h2>Say goodbye to lost cards. With IDDock, your credentials are always
                    safe and accessible on any device.</h2>
                <li>✔ Easy to use</li>
                <li>✔ Secure & reliable</li>
                <li>✔ Cloud synced</li>
            </div>
            <div className="right">
                <h1>Welcome to IDDock</h1><br/><br/>
                <h3>Securely create, manage, and save your ID cards in one place.</h3><br/><br/>
                <Link to={'/auth'} className='auth'> Login Now! </Link>
            </div>
        </div>
    )
}

export default Home