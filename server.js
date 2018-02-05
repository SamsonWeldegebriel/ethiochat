const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// API file for interacting with MongoDB
const users = require('./server/routes/users');
const chats = require('./server/routes/chats');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/users', users);
app.use('/chats', chats);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://ethiochat:ethiochat@ds123728.mlab.com:23728/ethiochat', ['users'])
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

//creating socket
//var server = http.Server(app);
var io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('new user connection made');

    socket.on('send-message', function(data) {
        console.log(data.text);
        io.emit('message-received', data);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        io.emit('message', { type: 'new-message', text: message });
        // Function above that stores the message in the database
        //databaseStore(message)
    });

});

server.listen(port, () => console.log(`Running on localhost:${port}`));