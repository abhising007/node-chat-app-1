const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app); // configure the server
var io = socketIO(server); // create webSockets server

app.use(express.static(publicPath));

var port = process.env.PORT || 3000;

// socket variable in index.html for websocket connection
io.on('connection', (socket)=>{
    console.log('New user connected');

    // create newMessage custom event to be emitted to clients
    socket.emit('newMessage', {
        to: 'abs1',
        text: 'message for abs1',
        createdAt: 123
    });
    
    // event coming from client
    socket.on('createMessage', (newMessage)=> {
        console.log('create message with: ', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });

});

server.listen(port, ()=>{
    console.log(`Server is up at ${port}`);
});

module.exports = {
    app
};