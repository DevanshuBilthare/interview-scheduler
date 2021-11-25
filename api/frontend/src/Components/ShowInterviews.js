import React, { useEffect } from 'react'
import axios from '../utils/axios'
import { useState } from 'react/cjs/react.development'

const ShowInterviews = () => {
    const [interview, setinterview] = useState(null);

    useEffect(() => {
        axios.get('/')
            .then(data => setinterview(data.data))
            .catch(err => console.log(err))
    }, [])

    let cardlist = 'Loading...'
    if (interview) {
        cardlist = interview.map((i,ind) => {
            return <div key={ind} className="card ">
                <div className="card-header">
                    {i.title}
                </div>
                <div className="card-body">
                <h3 className="card-title">{i.title}</h3>
                <b className="card-text">{i.participants}</b> <br />
               interview has been scheduled from {i.startTime} to 
                {i.endTime} on {
                        new Date(i.date).getDate() + " / " +
                        new Date(i.date).getMonth() + " / " +
                        new Date(i.date).getFullYear()
                        } . <br /> Thankyou!
                        <br />
                    <a className="btn btn-primary">Edit</a>
                </div>
            </div>
        })
    }

    return (
        <div className="container">
{cardlist}
        </div>
    )
}

export default ShowInterviews
