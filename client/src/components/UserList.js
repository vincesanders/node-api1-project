import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard'
import './UserList.css';

export default () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    })

    const getData = () => {
        axios.get("http://localhost:5000/api/users")
            .then(res => {
                setData(res.data);
            }).catch(err => console.log(err));
    }

    return (
        <div className='user-list'>
            {data?.map(user => <UserCard key={user.id} data={user} />)}
        </div>
    );
}