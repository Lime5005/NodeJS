const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Require and use the new routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).send('<h2>Page not found</h2>')
})

// const server = http.createServer(app)
// server.listen(3000)
// Above is replaced by below:
app.listen(3000)