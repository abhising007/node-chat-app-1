const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app); // configure the server
var io = socketIO(server); // create webSockets server
var users = new Users();

app.use(express.static(publicPath));

var port = process.env.PORT || 3000;

// socket variable in index.html for websocket connection
io.on('connection', (socket)=>{
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name is reqired');
        }

        socket.join(params.room);
        users.removeUser(socket.id); // remove same users previous instances
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // send the message to new client that joined
        socket.emit('newMessage', generateMessage('admin', 'Welcome to Chat App'));
    
        // send the message to everyone else that new client joined
        socket.broadcast.to(params.room).emit('newMessage', 
            generateMessage('admin', `${params.name} has joined`));
    
        callback();
    });
    
    // event coming from client
    socket.on('createMessage', (newMessage, callback)=> {
        console.log('createMessage: ', newMessage);
        
        // emit the message to all connected clients
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        callback(); // send the acknowledgement to the client
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
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left`));
        }
    });

});

server.listen(port, ()=>{
    console.log(`Server is up at ${port}`);
});

module.exports = {
    app
};