const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const {genMsg, genLocationMsg} = require('./utils/message')

const port = process.env.PORT || 3456
const publicPath = path.join(__dirname, '../public')
const app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log("new connection")
  // io.emit('newUser', 'Welcome to chat app')

  socket.emit('newMessage', genMsg('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', genMsg('Admin', 'New user joined'))

  socket.on('createMessage', (msg, callback) => {
    console.log('createMessage', msg)
    io.emit('newMessage', genMsg(msg.from, msg.text))
    callback("this is from server")
  })

  socket.on('createLocationMessage', (msg) => {
    console.log('createLocationMessage', `latitude: ${msg.lat} , longitude: ${msg.lng}`)
    io.emit('newLocationMessage', genLocationMsg('Admin', msg.lat, msg.lng))
  })

  socket.on('disconnect', () => {
    console.log("connection disconnect")
  })
})

server.listen(port, () => console.log(`Server in running on port ${port}`))
