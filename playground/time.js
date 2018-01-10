const moment = require('moment')

// Jan 1st 1970 00:00:00 am  - UNIX

// simply to gen a unix time for now
// new Date().getTime()

var date = moment()
date.add(1, 'y')
console.log(date.format("MMM Do YYYY"));
