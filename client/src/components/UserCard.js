import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, CardTitle, CardText, Input } from 'reactstrap';
import './UserCard.css'

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
                <CardTitle>
                    {props.data.name}
                    <Button onClick={() => setEdittingName(true)}>edit</Button>
                </CardTitle>
            );
        } else {
            return (
                <div>
                    <Input type='text' name='name' value={user.name || ''} onChange={handleChange} />
                    <Button onClick={changeName}>Change</Button>
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
                <CardText>
                    {props.data.bio}
                    <Button onClick={() => setEdittingBio(true)}>edit</Button>
                </CardText>
            );
        } else {
            return (
                <div>
                    <Input type='text' name='bio' value={user.bio || ''} onChange={handleChange} />
                    <Button onClick={changeBio}>Change</Button>
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
        <Card className='user-card-container' >
            {displayName()}
            {displayBio()}
            <Button onClick={deleteUser}>Delete</Button>
        </Card>
    );
}