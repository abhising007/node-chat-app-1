const expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () =>{
    it('should generateMessage', () => {
        var from = 'fromAbs';
        var text = 'testMessage';
        var result = generateMessage(from, text);
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from, text});
    });
});