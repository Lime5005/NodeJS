const path = require('path')
const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

// Require and use the new routes
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
    // For main.css
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' })
})

// const server = http.createServer(app)
// server.listen(3000)
// Above is replaced by below:
app.listen(3000)