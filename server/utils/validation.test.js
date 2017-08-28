const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () =>{
    it('should reject non string values', () => {
        var display = 98;
        var room = 'testRoom';
        var result = isRealString(display, room);
        expect(result).toBe(false);
    });

    it('should reject string with only spaces values', () => {
        var display = '    ';
        var room = 'testRoom';
        var result = isRealString(display, room);
        expect(result).toBe(false);
    });

    it('should accept string values', () => {
        var display = 'Abs Cool';
        var room = '  test Room  ';
        var result = isRealString(display, room);
        expect(result).toBe(true);
    });

});
