import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../sass/Header.scss";

function Header() {
    const [name, setName] = useState("Login Now!");
    const user = localStorage.getItem("user");
    useEffect(() => {

        if (user) {
            setName("Hi, " + JSON.parse(user).displayName);
        }
    }, []); // run only once on component mount

    return (
        <div className="header">
            <Link to={!user?"/":"/Dashboard"} className='logo'>
                <img src="/logo.png" alt="logo" />
                <span> <b>ID</b>Dock</span>
            </Link>
            <Link to="/auth" className='auth'>{name}</Link>
        </div>
    );
}

export default Header;
