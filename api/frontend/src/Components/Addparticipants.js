import React, { useState } from 'react';
import axios from '../utils/axios';

const Addparticipants = () => {
    const [participant, setparticipant] = useState({
        name: '',
        email: '',
        role: '',
        contact: '',
        address: ''
    })

    const ChangeHandler = (e) => {
        setparticipant(prevstate => ({...prevstate, [e.target.name]: e.target.value}))
    }

     const SubmitHandler = async (e) => {
         e.preventDefault();
         await axios.post("/addparticipant", participant)
         .then(data => alert("Participant Created"))
         .catch(err => console.log(err.response));
     }

    return (
        <form className="container mt-5 row g-3" onSubmit={SubmitHandler}>
        <h3>Add Participants</h3>

        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input 
            name="name"
            type="text" 
            value={participant.name}
            onChange={ChangeHandler}
            className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input 
            name="email"
            type="email" 
            value={participant.email}
            onChange={ChangeHandler}
            className="form-control" />
        </div>
        
        <div className="col-12">
          <label className="form-label">Address</label>
          <input 
            name="address"
            type="text" 
            value={participant.address}
            onChange={ChangeHandler}
            className="form-control" />
        </div>

        <div className="col-md-6">
        <label className="form-label">Contact</label>
          <input 
            name="contact"
            type="text" 
            value={participant.contact}
            onChange={ChangeHandler}
            className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Role</label>
          <select name="role"  onChange={ChangeHandler} value={participant.role} className="form-select">
            <option value="Participant">Participant</option>
            <option value="Interviewer">Interviewer</option>
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Add Participant</button>
        </div>
      </form>
    )
}

export default Addparticipants
