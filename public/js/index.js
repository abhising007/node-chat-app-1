var socket = io();
socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

// listen to newMessage event from server
socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm:ss a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

// listen to newMessage event from server
socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm:ss a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
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