[{
  id: '',
  name: '',
  room: ''
}]

//addUser(id, name, room)

//removeUser(id)

//getUser(id)

//getUserList(room)

class Users {
  constructor() {
    this.users = []
  }

  addUser(id, name, room) {
    var user = {id, name, room}
    this.users.push(user)
    return user
  }

  removeUser(id) {
    //my way
    // var removedUser = null
    // this.users = this.users.filter( user => {
    //   if(user.id === id){
    //     removedUser = user
    //     return false
    //   }
    //   return true
    // })
    //
    // return removedUser

    var user = this.getUser(id)
    if(user)
      this.users = this.users.filter( user => user.id !== id)

    return user
  }

  getUser(id) {
    return this.users.filter( user => user.id === id)[0]
  }

  getUserList(room) {
    var users = this.users.filter( user => user.room === room)
    var namesArr = users.map(user => user.name)

    return namesArr
  }
}


module.exports = {Users}
