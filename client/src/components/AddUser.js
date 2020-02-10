import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Form, Label, FormGroup } from 'reactstrap';

export default () => {
    const [isAdding, setIsAdding] = useState(false);
    const [newUser, setNewUser] = useState({});

    const displayForm = () => {
        if (isAdding) {
            return (
                <Form onSubmit={handleSubmit} >
                    <FormGroup>
                        <Label>name: 
                            <Input type="text" name="name" value={newUser.name || ""} onChange={handleChange} />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>bio
                            <Input type="textarea" name="bio" value={newUser.bio || ""} onChange={handleChange} />
                        </Label>
                    </FormGroup>
                    <Button type='submit'>Add User</Button>
                </Form>
            );
        } else {
            return (<Button onClick={() => setIsAdding(true)}>Add User</Button>);
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