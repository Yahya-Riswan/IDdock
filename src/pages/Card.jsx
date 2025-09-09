import React, { useEffect, useState } from 'react'
import "../sass/Card.scss"
import dbs from '../components/firebase'
import { Link, useNavigate, useParams } from 'react-router-dom'
function Card() {
    let navigate = useNavigate()
    const { id } = useParams() 
    const [card, setCard] = useState({})
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user"))
        const fetch = async () => {
            let data = await dbs.readDocument(user.email,id)
            setCard(data)
        }
        fetch()
    })

    const handleDelete=()=>{
        let user = JSON.parse(localStorage.getItem("user"))
        dbs.deleteDocument(user.email,id)
        navigate("/Dashboard")
    }
    return (
        <div className="card">
            <Link to={"/Dashboard"} className='back'>Back</Link>
            {
                card &&
                <div className="content">
                    <h1>{card.name}  |  {card.user}</h1>
                    <img src={card.img} alt="" />
                </div>
            }
            <br/><br/>
            <button onClick={handleDelete}>Remove This Card</button>
        </div>
    )
}

export default Card