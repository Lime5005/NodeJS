const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const router = express.Router()

const products = []

// router.use('/add-product', (req, res, next) => {
//     res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
// })

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        // formsCSS: true,
        // productCSS: true,
        // activeAddProduct: true
    });
});
router.post('/add-product', (req, res, next) => {
    console.log('The product page');
    products.push({ title: req.body.title })
    res.redirect('/')
})

exports.routes = router
exports.products = products