// implement your API here
const express = require('express');
const cors = require('cors');

const database = require('./data/db.js');

const server = express();

server.use(express.json());
server.use(cors());

//get array of all user objects
server.get('/api/users', (req, res) => {
    database.find().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    });
});

//get user object by id
server.get('/api/users/:id', (req, res) => {
    database.findById(req.params.id).then(user => {
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else {
            res.status(200).json(user);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    });
});

//Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res) => {
    database.update(req.params.id, req.body).then(userID => {
        if (!userID) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else if (!req.body.name || !req.body.bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        } else {
            database.findById(userID).then(user => {
                res.status(200).json(user);
            }).catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: "The user information could not be retrieved." });
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be modified." });
    });
});

//Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        database.insert(req.body).then(userIDObj => {
            //returns an object containing the id of the user just created.
            res.status(201).json(userIDObj);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'oops' });
        });
    }
});

//Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
    let deletedUser = {};

    database.findById(req.params.id).then(user => {
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else {
            deletedUser = user;

            database.remove(req.params.id).then(numDeleted => {
                res.status(200).json(deletedUser);
            }).catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: "The user could not be removed" });
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.listen(5000, () => console.log('Server is listening on port 5000.'));