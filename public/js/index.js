var socket = io();
socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

// listen to newMessage event from server
socket.on('newMessage', function(message){
    console.log('New message: ', message);
    var formattedTime = moment(message.createdAt).format('h:mm:ss a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    jQuery('#messages').append(li);
});

// listen to newMessage event from server
socket.on('newLocationMessage', function(message){
    console.log('New message: ', message);
    var formattedTime = moment(message.createdAt).format('h:mm:ss a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    
    li.append(a);
    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e){
    e.preventDefault(); // prevent the default event handler

    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox.val()
    }, function(data){
        messageTextBox.val('') //clear the value in text box on successful acknowledgement
    });
        
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e){

    if (!navigator.geolocation) {
        return alert('Geolocation not support by your browers');
    }

    locationButton.attr('disabled', 'disabled'); // disable the button once its pressed
    locationButton.text('Sending location');

    navigator.geolocation.getCurrentPosition(function(position){
        console.log('Position: ', position);
        locationButton.removeAttr('disabled'); // enable the button once response is back
        locationButton.text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled'); // enable the button once response is back
        locationButton.text('Send location');
        alert('Unable to fetch location');
    });
});