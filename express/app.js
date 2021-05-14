const http = require('http')

const express = require('express')

const app = express()

// Middlewares between request and response
app.use((req, res, next) => {
    console.log('1st middleware');
    next()
})
app.use((req, res, next) => {
    res.send('<h1>Middleware</h1>')
})

// const server = http.createServer(app)
// server.listen(3000)
// Above is replaced by below:
app.listen(3000)