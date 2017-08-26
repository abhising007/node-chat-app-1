const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app); // configure the server
var io = socketIO(server); // create webSockets server

app.use(express.static(publicPath));

var port = process.env.PORT || 3000;

// socket variable in index.html for websocket connection
io.on('connection', (socket)=>{
    console.log('New user connected');

    // send the message to new client that joined
    socket.emit('newMessage', generateMessage('admin', 'Welcome to Chat App'));

    // send the message to everyone else that new client joined
    socket.broadcast.emit('newMessage', generateMessage('admin', 'New User Joined'));

    // create newMessage custom event to be emitted to clients
    // socket.emit('newMessage', {
    //     to: 'abs1',
    //     text: 'message for abs1',
    //     createdAt: 123
    // });
    
    // event coming from client
    socket.on('createMessage', (newMessage, callback)=> {
        console.log('createMessage: ', newMessage);
        
        // emit the message to all connected clients
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        callback('This is from the server'); // send the acknowledgement to the client

        //send the events to everyone but the source client
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });

    // event coming from client
    socket.on('createLocationMessage', (coordinates)=> {
        console.log('createLocationMessage: ', coordinates);
        
        // emit the message to all connected clients
        io.emit('newLocationMessage', 
        generateLocationMessage('admin', coordinates.latitude, coordinates.longitude));

        // callback('This is from the server'); // send the acknowledgement to the client
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