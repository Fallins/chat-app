const moment = require('moment')

const genMsg = (from, text) => {
  return{
    from,
    text,
    createdAt: moment().valueOf()
  }
}

const genLocationMsg = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: moment().valueOf()
  }
}

module.exports = {
  genMsg, genLocationMsg
}
