const expect = require('expect')
const {genMsg, genLocationMsg} = require('../utils/message')


describe('generate a new message', () => {
  it('should generate correct message object', () => {
    var from = "test"
    var text = "test content"

    var message = genMsg(from, text)


    expect(message).toInclude({from, text})
    expect(message.createdAt).toBeA('number')

  })
})

describe('generate a new location message', () => {
  it('should generate correct location object', () => {
    var from = "test"
    var lat = "lat"
    var lng = "lng"

    var message = genLocationMsg(from, lat, lng)


    expect(message).toInclude({from, url: `https://www.google.com/maps?q=${lat},${lng}`})
    expect(message.createdAt).toBeA('number')

  })
})
