const express = require('express');

const server = express();
server.use(express.json());
const usersRouter = require('./users/users-router');
server.use('', usersRouter);

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
