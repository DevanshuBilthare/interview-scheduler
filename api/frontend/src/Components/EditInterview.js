import React, { useEffect, useState } from 'react';
import axios from '../utils/axios'

const CreateInterview = () => {
    const [participants, setparticipants] = useState([]);
    const [interview, setinterview] = useState({
        title: '',
        date: '',
        startTime: '12:00:00',
        endTime: '12:00:00',
        participants: []
    })

    useEffect( () => {
         axios.get('/participant')
        .then(data => setparticipants(data.data))
        .catch(err => console.log(err))
    }, [])

    const ChangeHandler = (e) => {
        setinterview(prevstate => ({...prevstate, [e.target.name]: e.target.value}))
    }

     const SubmitHandler = async (e) => {
         e.preventDefault();
         await axios.post("/create", interview )
         .then(data => console.log(data))
         .catch(err => console.log(err.response));
     }

     let part = 'Loading...';
     if(participants.length !== 0) {
        part = participants.map(p => {
            return <option key={p._id} value={p.name}>{p.name}</option>
        })
     }

    return (
        <form className="container mt-5 row g-3" onSubmit={SubmitHandler}>
        <h3>Add Participants</h3>

        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input 
            name="title"
            type="text" 
            value={interview.title}
            onChange={ChangeHandler}
            className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Date</label>
          <input 
            name="date"
            type="date" 
            value={interview.date}
            onChange={ChangeHandler}
            className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Start At</label>
          <input 
            name="startTime"
            type="time" 
            value={interview.startTime}
            onChange={ChangeHandler}
            className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">End At</label>
          <input 
            name="endTime"
            type="time" 
            value={interview.endTime}
            onChange={ChangeHandler}
            className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Participants</label>
          <select name="role"  onChange={ChangeHandler} value={interview.role} className="form-select">
            {part}
          </select>
        </div>
        
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Create Interview</button>
        </div>
      </form>
    )
}

export default CreateInterview
