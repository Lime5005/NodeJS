const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

// Middlewares between request and response
// app.use((req, res, next) => {
//     console.log('1st middleware');
//     next()
// })
// app.use((req, res, next) => {
//     res.send('<h1>Middleware</h1>')
// })

app.use('/users', (req, res, next) => {
    // console.log('The /users middleware');
    res.send('<p>The middleware send /users</p>')
})
app.use('/add-product', (req, res, next) => {
    console.log('The add product middleware');
    res.send('<div><form action="/product" method="POST"><input type="text" name="products"><button type="submit">Send</button></form></div>')
})
app.post('/product', (req, res, next) => {
    console.log('The product page');
    console.log(req.body);
    res.redirect('/')
})

app.use('/', (req, res, next) => {
    console.log('The / middleware');
    res.send('<h1>The middleware just send /</h1>')
})

// const server = http.createServer(app)
// server.listen(3000)
// Above is replaced by below:
app.listen(3000)