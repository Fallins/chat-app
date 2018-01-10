var socket = io()

function scrollToBottom() {
  // selectors
  var messages = $('#messages')
  var newMessage = messages.children('li:last-child')

  // heights
  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    // console.log("should scroll");
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', () => {
  // console.log("Connected to server.")
  var params = $.deparam(window.location.search)

  socket.emit('join', params, function(err){
    if(err){
      alert(err)
      window.location.href = '/'
    }else{
      console.log('....')
    }
  })
})

socket.on('disconnect', () => {
  console.log('disconnected from server.')
})

socket.on('updateUserList', function (users) {
  console.log(users);
  var ul = $('<ul></ul>')

  users.forEach(function(user){
    ul.append($('<li></li>').text(user))
  })

  $('#users').html(ul)
})

socket.on('newMessage', (msg) => {
  var formattedTime = moment(msg.createdAt).format('h:mm a')
  var template = $('#message-template').html()
  var html = Mustache.render(template, {
    from: msg.from,
    text: msg.text,
    createdAt: formattedTime
  })

  $('#messages').append(html)
  scrollToBottom()

  //by using jquery
  // console.log('You got a new message: ', msg)
  // var li = $('<li></li>')
  // li.text(`${msg.from} ${formattedTime} : ${msg.text}`)
  // $('#messages').append(li)
})

socket.on('newLocationMessage', (msg) => {
  var formattedTime = moment(msg.createdAt).format('h:mm a')
  var template = $('#location-message-template').html()
  var html = Mustache.render(template, {
    from: msg.from,
    url: msg.url,
    createdAt: formattedTime
  })

  $('#messages').append(html)
  scrollToBottom()


  //by using jquery
  // console.log('You got a new message: ', msg)
  // var formattedTime = moment(msg.createdAt).format('h:mm a')
  // var li = $('<li></li>')
  // var a = $('<a target="_blank">My current location</a>')
  //
  // li.text(`${msg.from} ${formattedTime}: `)
  // a.attr('href', msg.url)
  // li.append(a)
  //
  // $('#messages').append(li)
})

$('#message-form').on('submit', function(e) {
  e.preventDefault()

  var messageTextbox = $('input')

  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function(data) {
    // console.log(data)
    messageTextbox.val('')
  })
})

var locationBtn = $('#send-location')
locationBtn.on('click', function(e){
  if ("geolocation" in navigator)
    console.log("geolocation is available")
  else
    console.log("geolocation IS NOT available")

  locationBtn.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function(geoPosition) {
    console.log(geoPosition)
    locationBtn.removeAttr('disabled').text('Send location')
    const lat = geoPosition.coords.latitude
    const lng = geoPosition.coords.longitude
    socket.emit('createLocationMessage', {
      lat: lat,
      lng: lng
    })
  }, function(){
    locationBtn.removeAttr('disabled').text('Send location')
    alert("unable to fetch geolocation")
  })
})
