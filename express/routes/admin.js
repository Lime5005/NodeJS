const path = require('path')

const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

router.get('/add-product', adminController.getAddProduct)
router.get('/products', adminController.getProducts)
router.post('/add-product', adminController.postAddProduct)
    // Try the route by entering url: `http://localhost:3000/admin/edit-product/12345?edit=true`, it'll render the edit page
router.get('/edit-product/:productId', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)
router.post('/delete-product', adminController.postDeleteProduct)

module.exports = router