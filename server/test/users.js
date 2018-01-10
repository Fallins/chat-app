const expect = require('expect')

const {Users} = require('../utils/users')

describe('Users', () => {
  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'node'
    },{
      id: '2',
      name: 'Tommy',
      room: 'node'
    },{
      id: '3',
      name: 'Balis',
      room: 'react'
    },{
      id: '4',
      name: 'WTF',
      room: 'node'
    }]
  })

  it('should add new user', () => {
    var users = new Users()
    var user = {
      id: '123',
      name: 'Ben',
      room: 'room1'
    }
    var resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('should remove a user', () => {
    // var removedUser = users.removeUser('4')
    // expect(removedUser).toEqual({
    //   id: '4',
    //   name: 'WTF',
    //   room: 'node'
    // })
    // expect(users.users.length).toBe(3)

    var userId = '1'
    var user = users.removeUser(userId)

    expect(user.id).toBe(userId)
    expect(users.users.length).toBe(3)
  })

  it('should not remove user', () => {
    // var removedUser = users.removeUser('x')
    // expect(removedUser).toBe(null)

    var userId = 'x'
    var user = users.removeUser(userId)

    expect(user).toNotExist()
    expect(users.users.length).toBe(4)
  })

  it('should find user', () => {
    var userId = '4'
    var user =  users.getUser(userId)

    expect(user.id).toBe(userId)
  })

  it('should not find user', () => {
    var user = users.getUser('x')
    // expect(user).toEqual(undefined)
    expect(user).toNotExist()
  })

  it('should return names for node course', () => {
    var userList = users.getUserList('node')

    expect(userList).toEqual(['Mike','Tommy','WTF'])
  })
})
