// implement your API here
const express = require('express');

const database = require('./data/db.js');

const server = express();

server.use(express.json());

server.listen(5000, () => console.log('Server is listening on port 5000.'))