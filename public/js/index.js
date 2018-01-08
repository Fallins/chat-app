var socket = io()

socket.on('connect', () => {
  console.log("Connected to server.")
})

socket.on('disconnect', () => {
  console.log('disconnected from server.')
})

socket.on('newMessage', (msg) => {
  console.log('You got a new message: ', msg)
  var li = $('<li></li>')
  li.text(`${msg.from} : ${msg.text}`)
  $('#messages').append(li)
})

socket.on('newLocationMessage', (msg) => {
  console.log('You got a new message: ', msg)
  var li = $('<li></li>')
  var a = $('<a target="_blank">My current location</a>')

  li.text(`${msg.from} : `)
  a.attr('href', msg.url)
  li.append(a)
  
  $('#messages').append(li)
})

var locationBtn = $('#locBtn')
locationBtn.on('click', function(e){
  if ("geolocation" in navigator)
    console.log("geolocation is available")
  else
    console.log("geolocation IS NOT available")


  navigator.geolocation.getCurrentPosition(function(geoPosition) {
    console.log(geoPosition)
    const lat = geoPosition.coords.latitude
    const lng = geoPosition.coords.longitude
    socket.emit('createLocationMessage', {
      lat: lat,
      lng: lng
    })
  }, function(){
    alert("unable to fetch geolocation")
  })
})
