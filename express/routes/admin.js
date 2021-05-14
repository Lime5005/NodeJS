const express = require('express')

const router = express.Router()

router.use('/add-product', (req, res, next) => {
    console.log('The add product middleware');
    res.send('<div><form action="/admin/product" method="POST"><input type="text" name="products"><button type="submit">Send</button></form></div>')
})
router.post('/product', (req, res, next) => {
    console.log('The product page');
    console.log(req.body);
    res.redirect('/')
})


module.exports = router