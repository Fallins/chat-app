const path = require('path')

const app = require('express')()

const port = process.env.PORT || 3456
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.send("Hello")
})

app.listen(port, () => console.log(`Server in running on port ${port}`))
