const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Ngoc!')
})
app.get('/shop', (req, res) => {
    res.send('Hello Gio Hang!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})