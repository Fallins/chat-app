const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {genMsg, genLocationMsg} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')

const port = process.env.PORT || 3456
const publicPath = path.join(__dirname, '../public')
const app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log("new connection")

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room))
      return callback("Name and room is required")

      socket.join(params.room)
      // socket.leave(params.room)
      users.removeUser(socket.id)
      users.addUser(socket.id, params.name, params.room)

      io.to(params.room).emit('updateUserList', users.getUserList(params.room))

      // io.emit -> io.to('room').emit
      // socket.broadcast.emit -> socket.broadcast.to('room').emit
      // socket.emit


      socket.emit('newMessage', genMsg('Admin', 'Welcome to the chat app'))
      socket.broadcast.to(params.room).emit('newMessage', genMsg('Admin', `${params.name} has joined`))
      callback()
  })

  socket.on('createMessage', (msg, callback) => {
    console.log('createMessage', msg)
    var user = users.getUser(socket.id)

    if(user && isRealString(msg.text)){
      io.to(user.room).emit('newMessage', genMsg(user.name, msg.text))
    }

    callback()
  })

  socket.on('createLocationMessage', (msg) => {
    console.log('createLocationMessage', `latitude: ${msg.lat} , longitude: ${msg.lng}`)
    var user = users.getUser(socket.id)

    if(user){
      io.to(user.room).emit('newLocationMessage', genLocationMsg(user.name, msg.lat, msg.lng))
    }
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id)

    io.to(user.room).emit('updateUserList', users.getUserList(user.room))
    io.to(user.room).emit('newMessage', genMsg('Admin', `${user.name} has left`))
    console.log("connection disconnect")
  })
})

server.listen(port, () => console.log(`Server in running on port ${port}`))
