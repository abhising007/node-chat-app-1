var socket = io();
socket.on('connect', function() {
    console.log('connected to server');

    // emit createMessage event to the server
    // socket.emit('createMessage',{
    //     from: 'abs2',
    //     text: 'message for abs2'
    // });
    
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

// listen to newMessage event from server
socket.on('newMessage', function(message){
    console.log('New message: ', message);
});