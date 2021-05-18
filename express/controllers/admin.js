const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    req.user.createProduct({
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description
        }).then(result => {
            //console.log(res)
            console.log('Product created');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.productId
    req.user.getProducts({
            where: {
                id: prodId
            }
        })
        // Product.findByPk(prodId)
        .then(products => {
            const product = products[0]
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
};

exports.postEditProduct = (req, res, next) => {
    // override a data
    // 1.fetch 2. create and save 3. redirect
    const prodId = req.body.productId
    const newTitle = req.body.title
    const newImageUrl = req.body.imageUrl
    const newPrice = req.body.price
    const newDescription = req.body.description
    Product.findByPk(prodId)
        .then(product => {
            product.title = newTitle
            product.imageUrl = newImageUrl
            product.price = newPrice
            product.description = newDescription
            return product.save()
        })
        .then(result => {
            console.log('Product updated!')
            res.redirect('/admin/products') // Move up to here for err flow if any
        })
        .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
        // Above replaced Product.findAll()
        .then(products => {
            res.render('admin/products-list', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.destroy({
            where: {
                id: prodId
            }
        })
        .then(result => {
            console.log('Product deleted!');
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}