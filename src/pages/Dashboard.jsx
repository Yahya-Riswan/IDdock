import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../sass/Dashboard.scss"
import dbs from "../components/firebase"
function Dashboard() {
    const [cards, setCards] = useState([])
    const [active, setActive] = useState("All")
    const [filtered, setFiltered] = useState([])
    const [users, setUsers] = useState([])
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        const fetch = async () => {
            let data = await dbs.readCollection(user.email)
            let cards = data.filter((item) => item.id != "users")
            setCards(cards || [])
            setFiltered(cards || [])
            let usersDoc = data.find((item) => item.id === "users")
            setUsers(usersDoc ? usersDoc.users : [])
        }
        fetch()
    }, [])
    const filter = (key) => {
        setActive(key)
        if (key == 'All') {
            setFiltered(cards)
            return
        } else {
            let filteredcards = cards.filter((card)=> card.user == key)
            setFiltered(filteredcards)
        }
    }
    return (
        <div className="dashboard">
            <div className="left">
                <button onClick={()=>{filter("All")}} className={active === "All"?"active":''}>All</button>
                <button onClick={()=>{filter("Family")}} className={active === "Family"?"active":''}>Family</button>
                {
                    users &&
                    [...users].map((user) => (
                        <button onClick={()=>{filter(user)}} className={active === user?"active":''} key={user}>{user}</button>
                    ))
                }
                <Link to={"/AddUser"} className="adduser">
                    +
                </Link>
            </div>
            <div className="right">
                {
                    filtered &&
                    [...filtered].map((card) => (
                        <Link to={`/card/${card.id}`} className="card" key={card.id}>
                            <img src={card.img} alt="" />
                            <h3>{card.name}  |  {card.user}</h3>
                        </Link>
                    ))
                }
                {
                    !filtered || filtered.length < 1 &&
                    <div>
                        <h1 className='err'>No Cards Added , Add Some And Secure It.</h1>
                    </div>
                }
                <Link to={"/AddCard"} className="addcard">
                    +
                </Link>
            </div>

        </div>
    )
}

export default Dashboard