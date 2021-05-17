const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All products',
                path: '/products'
            });
        })
        .catch(err => console.log(err));

};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId
        // console.log(prodId);
    Product.getById(prodId)
        .then(([product]) => {
            console.log(product); // See product is an object wrapped in an array
            res.render('shop/product-details', {
                product: product[0], // Our view expect an object
                pageTitle: product.title,
                path: '/products'
            })
        })
        .catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    Cart.getFromCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products) {
                const cartProductsData = cart.products.find(prod => prod.id === product.id)
                if (cartProductsData) {
                    cartProducts.push({ products: product, quantity: cartProductsData.quantity })
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your cart',
                products: cartProducts
            })
        })
    })
}

exports.postCart = (req, res, next) => {
    // console.log(req.body.productId);
    const prodId = req.body.productId
    Product.getById(prodId, product => {
        Cart.addToCart(prodId, product.price)
    })
    res.redirect('/cart')
}

exports.postDeleteFromCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.getById(prodId, product => {
        Cart.deleteFromCart(prodId, product.price)
        res.redirect('/cart')
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your orders'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout page'
    })
}