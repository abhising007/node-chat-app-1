const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () =>{
    it('should generateMessage', () => {
        var from = 'fromAbs';
        var text = 'testMessage';
        var result = generateMessage(from, text);
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from, text});
    });
});


describe('generateLocationMessage', () =>{
    it('should generateLocationMessage', () => {
        var from = 'fromAbs';
        var latitude = '11';
        var longitude = '7';
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var result = generateLocationMessage(from, latitude, longitude);
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from, url});
    });
});