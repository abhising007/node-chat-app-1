const expect = require('expect');
const {Users} = require('./Users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'abc',
            room: 'Office'
        },{
            id: '2',
            name: 'mom',
            room: 'Home'
        },{
            id: '3',
            name: 'nam',
            room: 'Office'
        }];
    });

    it('should add new users', ()=>{
        var users = new Users();
        var user = {
            id: '123',
            name: 'abc',
            room: 'Office fans'
        };

        var responseUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);

    });

    it('should remove a user', () => {
        var userId = '2';
        var responseUser = users.removeUser(userId);
        expect(responseUser.id).toEqual(userId);
        expect(users.users.length).toBe(2);
        
    });

    it('should not remove a user', () => {
        var userId = '99';
        var responseUser = users.removeUser(userId);
        expect(responseUser).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        var userId = '2';
        var responseUser = users.getUser(userId);

        expect(responseUser.id).toEqual(userId);
    });

    it('should not find a user', () => {
        var userId = '4';
        var responseUser = users.getUser(userId);

        expect(responseUser).toNotExist();
    });

    it('should return Office users list', () => {
        var userList = users.getUserList('Office');
        expect(userList).toEqual(['abc', 'nam']);
    });

    it('should return Home users list', () => {
        var userList = users.getUserList('Home');
        expect(userList).toEqual(['mom']);
    });

});