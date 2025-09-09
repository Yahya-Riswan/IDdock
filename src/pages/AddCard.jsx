import React, { useEffect, useState } from 'react'
import "../sass/AddCard.scss"
import dbs from '../components/firebase'
import { Link, useNavigate } from 'react-router-dom'
function AddCard() {
  let navigate = useNavigate()
  const [name, setName] = useState("")
  const [err, setErr] = useState("")
  const [img, setImg] = useState("")
  const [user, setUser] = useState("")
  const [users, setUsers] = useState([])

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"))
    const fetch = async () => {
      let usersDoc = await dbs.readDocument(user.email, "users")
      setUsers(usersDoc ? usersDoc.users : [])
    }
    fetch()
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddCard = ()=>{
    if(!name){setErr("Complete Name Field ...");return;}
    if(!user){setErr("Select A Family Member ...");return;}
    if(!img){setErr("Upload Id Card ...");return;}

    let data = {
      name,
      user,
      img
    }

    try{
      let user = JSON.parse(localStorage.getItem("user"))
      dbs.addDocumentAutoId(user.email,data)
      navigate("/Dashboard")
    }catch(e){
      setErr("Error Occured , Try Agian Later .")
    }
  }
  return (
    <div className="addcard">
      <div className="content">
        <Link to={"/Dashboard"} >Back</Link>
        <h2>Add New Card</h2><br />
        <input type="text" placeholder='Name ...' value={name} onChange={(e) => { setName(e.target.value) }} /><br />
        <select id="" value={user} onChange={(e) => { setUser(e.target.value) }}>
          <option value="" disabled>Select Member</option>
          <option value="Famliy">Family</option>
          {
            users &&
            users.map((user) => (
              <option value={user} key={user}>{user}</option>
            ))
          }
        </select><br />
        {img && <><img src={img} alt="" /><br /></>}

        <input type="file" name="" id="" accept="image/*" onChange={handleImageUpload}/><br />
        <button onClick={handleAddCard}>Add Card .</button>
        {err && <p>{err}</p>}
      </div>
    </div>
  )
}

export default AddCard