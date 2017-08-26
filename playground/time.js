const moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

var createdAt = 1234;
var date1 = moment(createdAt); // current time
// date1.add(1, 'year').subtract(2, 'days');
console.log(date1.format('MMM Do, YYYY h:mm a'));

