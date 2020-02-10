// implement your API here
const express = require('express');

const database = require('./data/db.js');

const server = express();

server.use(express.json());

//get array of all user objects
server.get('/api/users', (req, res) => {
    database.find().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops' });
    });
});

//get user object by id
server.get('/api/users/:id', (req, res) => {
    database.findById(req.params.id).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops' });
    });
});

//Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res) => {
    database.update(req.params.id, req.body).then(userID => {
        res.status(200).json(userID);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops' });
    });
});

//Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
    database.insert(req.body).then(userIDObj => {
        //returns an object containing the id of the user just created.
        res.status(201).json(userIDObj);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops' });
    });
});

//Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
    database.remove(req.params.id).then(deletedUser => {
        res.status(200).json(deletedUser);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops' });
    });
});

server.listen(5000, () => console.log('Server is listening on port 5000.'))