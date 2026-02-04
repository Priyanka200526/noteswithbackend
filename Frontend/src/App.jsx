import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'

const App = () => {
  const [friendData, setfriendData] = useState([])

  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [editId, setEditId] = useState(null)

  function fetchdata() {
    axios.get('https://noteswithbackend.onrender.com/api/friend')
      .then(res => setfriendData(res.data.friend || res.data))
  }

  useEffect(() => {
    fetchdata()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    if (editId) {
      axios.patch('https://noteswithbackend.onrender.com/api/friend/' + editId, {
        name,
        city
      }).then(() => {
        fetchdata()
        clearForm()
      })
    } else {
      axios.post('https://noteswithbackend.onrender.com/api/friend', {
        name,
        city
      }).then(() => {
        fetchdata()
        clearForm()
      })
    }
  }

  function clearForm() {
    setName("")
    setCity("")
    setEditId(null)
  }

  function deletedata(id) {
    axios.delete('https://noteswithbackend.onrender.com/api/friend/' + id)
      .then(fetchdata)
  }

  function handleEdit(item) {
    setName(item.name) 
    setCity(item.city)
    setEditId(item._id)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button>
          <i className="ri-add-large-line"></i>
          {editId ? "Update Friend" : "Create Friend"}
        </button>
      </form>

      <hr />

      <div className="cards">
        {friendData.map(item => (
          <div className="card" key={item._id}>
            <h3>{item.name}</h3>
            <p>📍 {item.city}</p>

            <div className="btns">
              <button onClick={() => deletedata(item._id)}>
                <i className="ri-delete-bin-7-fill"></i>
                 Delete</button>
              <button onClick={() => handleEdit(item)}>
                <i className="ri-edit-line"></i>
                 Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
