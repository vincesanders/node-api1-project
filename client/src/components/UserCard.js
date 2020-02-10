import React, { useState } from 'react';
import axios from 'axios';

export default props => {
    const [user, setUser] = useState({});
    const [edittingName, setEdittingName] = useState('');
    const [edittingBio, setEdittingBio] = useState('');

    const deleteUser = () => {
        axios.delete(`http://localhost:5000/api/users/${props.data.id}`)
            .then(res => {
                //Do nothing?
            }).catch(err => console.log(err));
    }

    const changeUser = () => {
        axios
            .put(`http://localhost:5000/api/users/${props.data.id}`, user)
            .then(res => {
                props.setData(res.data);
            }).catch(err => console.log(err));
    }

    const handleChange = e => {
        setUser({
            [e.target.name]: e.target.value
        })
    }

    const displayName = () => {
        if (!edittingName) {
            return (
                <h3>
                    {props.data.name}
                    <button onClick={() => setEdittingName(true)}>edit</button>
                </h3>
            );
        } else {
            return (
                <div>
                    <input type='text' name='name' value={user.name || ''} onChange={handleChange} />
                    <button onClick={changeName}>Change</button>
                </div>
            );
        }
    }

    const changeName = () => {
        setEdittingName(false);
        //if user = '' don't do anything
        if (user.name === '') {

        } else {
            changeUser();
            setUser({});
        }
    }

    const displayBio = () => {
        if (!edittingBio) {
            return (
                <p>
                    {props.data.bio}
                    <button onClick={() => setEdittingBio(true)}>edit</button>
                </p>
            );
        } else {
            return (
                <div>
                    <input type='text' name='bio' value={user.bio || ''} onChange={handleChange} />
                    <button onClick={changeBio}>Change</button>
                </div>
            );
        }
    }

    const changeBio = () => {
        setEdittingBio(false);
        //if user = '' don't do anything
        if (user.bio === '') {

        } else {
            changeUser();
            setUser({});
        }
    }

    return (
        <div>
            {displayName()}
            {displayBio()}
            <button onClick={deleteUser}>Delete</button>
        </div>
    );
}