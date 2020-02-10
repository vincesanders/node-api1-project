import React, { useState } from 'react';
import axios from 'axios';

export default () => {
    const [isAdding, setIsAdding] = useState(false);
    const [newUser, setNewUser] = useState({});

    const displayForm = () => {
        if (isAdding) {
            return (
                <form onSubmit={handleSubmit} >
                    <label>name: 
                        <input type="text" name="name" value={newUser.name || ""} onChange={handleChange} />
                    </label>
                    <label>bio
                        <textarea type="text" name="bio" value={newUser.bio || ""} onChange={handleChange} />
                    </label>
                    <button type='submit'>Add User</button>
                </form>
            );
        } else {
            return (<button onClick={() => setIsAdding(true)}>Add User</button>);
        }
    }

    const handleSubmit = e => {
        console.log(newUser);
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/users', newUser)
            .then(res => {

            }).catch(err => console.log(err));
        setIsAdding(false);
    }

    const handleChange = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            {displayForm()}
        </div>
    );
}