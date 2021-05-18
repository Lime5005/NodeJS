const path = require('path')
const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

// Require and use the new routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

// To test how the data is presented:
// const db = require('./util/database');
// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[0], result[1]);
//     })
//     .catch(err => {
//         console.log(err);
//     });

const sequelize = require('./util/database');

const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
    // For main.css
app.use(express.static(path.join(__dirname, 'public')))

// Register a middleware for incoming request
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })


// To drop and re-create all tables: sequelize.sync({force:true})
sequelize
// .sync({ force: true })
    .sync()
    .then(result => { //console.log(res);
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Lily', email: 'lily@test.com' })
        }
        return user
    })
    .then(user => {
        return user.createCart()
    })
    .then(cart => {
        // console.log(user)
        app.listen(3000)
    })
    .catch(err => console.log(err))

// const server = http.createServer(app)
// server.listen(3000)
// Above is replaced by below: