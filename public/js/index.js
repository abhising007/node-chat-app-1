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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

// listen to newMessage event from server
socket.on('newLocationMessage', function(message){
    console.log('New message: ', message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    
    li.append(a);
    jQuery('#messages').append(li);
});


// with callback that fires when the acknowledgement is received
// socket.emit('createMessage',{
//     from: 'frank',
//     text: 'hi'
// }, function(data){
//     console.log('Got it: ', data);
// });

jQuery('#message-form').on('submit', function(e){
    e.preventDefault(); // prevent the default event handler
    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(data){
        console.log('Got it: ', data);
    });
        
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e){
    if (!navigator.geolocation) {
        return alert('Geolocation not support by your browers');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        console.log('Position: ', position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert('Unable to fetch location');
    });
});