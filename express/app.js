const path = require('path')
const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

// Require and use the new routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
    // For main.css
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

// const server = http.createServer(app)
// server.listen(3000)
// Above is replaced by below:
app.listen(3000)