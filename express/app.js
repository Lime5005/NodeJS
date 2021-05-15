const path = require('path')
const express = require('express')

const app = express()

// Require and use the new routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'))
})

// const server = http.createServer(app)
// server.listen(3000)
// Above is replaced by below:
app.listen(3000)